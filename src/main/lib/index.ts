import * as path from "path";
import { homedir } from "os";
import { readFile, pathExists, writeFile } from "fs-extra";
import argon2 from "argon2";
import crypto from "crypto";

export const getRootDir = () => {
  return path.join(homedir(), "Documents", "Kryptos");
};

const getConfigPath = () => {
  return path.join(getRootDir(), "config.kryptos");
};

export const checkPassword = async (
  password: string
): Promise<{ isValid: boolean; data: null | string }> => {
  const filePath = getConfigPath();

  if (!(await pathExists(filePath))) {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });

    const randomSalt = crypto.randomBytes(16);
    const encryptionSalt = randomSalt.toString("base64");

    await writeFile(
      filePath,
      JSON.stringify({ passwordHash: hash, encryptionSalt: encryptionSalt }),
      {
        encoding: "utf8",
      }
    );
    console.log("Vault initialized with new password.");
    return { isValid: true, data: null };
  }

  const fileContent = await readFile(filePath, "utf8");
  const config = JSON.parse(fileContent);
  const isValid = await argon2.verify(config.passwordHash, password);

  const response = {
    isValid: isValid,
    data: isValid ? await getData(password) : null,
  };

  return response;
};

export const addData = async (password: string, data: string) => {
  const filePath = getConfigPath();

  const fileContent = await readFile(filePath, "utf8");
  const config = JSON.parse(fileContent);

  const salt = Buffer.from(config.encryptionSalt, "base64");
  const key = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
    hashLength: 32,
    salt,
    raw: true,
  });

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(data, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  config.vault = {
    ciphertext: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
  };

  await writeFile(filePath, JSON.stringify(config, null, 2), {
    encoding: "utf8",
  });
  console.log("Data encrypted and saved!" + encrypted.toString("base64"));
};

export const getData = async (password: string): Promise<string | null> => {
  const filePath = getConfigPath();
  const fileContent = await readFile(filePath, "utf8");
  const config = JSON.parse(fileContent);

  if (!config.vault) {
    console.log("Vault is empty.");
    return null;
  }

  const salt = Buffer.from(config.encryptionSalt, "base64");

  const key = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
    hashLength: 32,
    salt,
    raw: true,
  });

  const { iv: ivBase64, ciphertext: ctBase64, tag: tagBase64 } = config.vault;
  const iv = Buffer.from(ivBase64, "base64");
  const encrypted = Buffer.from(ctBase64, "base64");
  const tag = Buffer.from(tagBase64, "base64");

  try {
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);
    console.log("get data " + decrypted.toString("utf8"));
    return decrypted.toString("utf8");
  } catch (err) {
    console.error(
      "Failed to decrypt vault. Wrong password or corrupted data.",
      err
    );
    return null;
  }
};
