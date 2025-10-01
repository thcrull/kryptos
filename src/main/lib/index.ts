import * as path from "path";
import { homedir } from "os";
import { ensureDir, pathExists, readFile, writeFile } from "fs-extra";
import argon2 from "argon2";
import crypto from "crypto";
import {
  AddData,
  CheckPassword,
  CreateVault,
  DeleteData,
  GetData,
  VaultItem,
  VaultExists,
} from "@shared/types";

const getRootDir = () => {
  return path.join(homedir(), "Documents", "Kryptos");
};

const getVaultPath = () => {
  return path.join(getRootDir(), "vault.kryptos");
};

export const vaultExists: VaultExists = async () => {
  const filePath = getVaultPath();
  return await pathExists(filePath);
};

export const createVault: CreateVault = async (password) => {
  if (await vaultExists()) {
    console.error("Vault already exists.");
    return false;
  }

  if (!password) {
    console.error("Password is required.");
    return false;
  }

  await ensureDir(getRootDir());
  const filePath = getVaultPath();

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
    JSON.stringify({
      passwordHash: hash,
      encryptionSalt: encryptionSalt,
      data: [],
    }),
    {
      encoding: "utf8",
    }
  );

  console.log("Vault initialized.");
  return true;
};

export const checkPassword: CheckPassword = async (password) => {
  if (!password) {
    return { isValid: false, data: null };
  }

  await ensureDir(getRootDir());
  const filePath = getVaultPath();

  const fileContent = await readFile(filePath, "utf8");
  const vault = JSON.parse(fileContent);
  const isValid = await argon2.verify(vault.passwordHash, password);

  if (!isValid) return { isValid, data: null };

  return {
    isValid: isValid,
    data: await getData(password),
  };
};

export const addData: AddData = async (password, newData) => {
  if (!password) {
    return false;
  }

  const filePath = getVaultPath();

  const fileContent = await readFile(filePath, "utf8");
  const vault = JSON.parse(fileContent);

  const salt = Buffer.from(vault.encryptionSalt, "base64");
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
    cipher.update(newData, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  vault.data.push({
    ivBase64: iv.toString("base64"),
    ctBase64: encrypted.toString("base64"),
    tagBase64: tag.toString("base64"),
  });

  await writeFile(filePath, JSON.stringify(vault, null, 2), {
    encoding: "utf8",
  });
  return true;
};

export const getData: GetData = async (password) => {
  if (!password) {
    return null;
  }

  const filePath = getVaultPath();
  const fileContent = await readFile(filePath, "utf8");
  const vault = JSON.parse(fileContent);

  if (!vault.data || vault.data.length === 0) {
    console.log("Vault is empty.");
    return null;
  }

  const salt = Buffer.from(vault.encryptionSalt, "base64");

  const key = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
    hashLength: 32,
    salt,
    raw: true,
  });

  let decryptedVaultData: string[] = [];
  for (let i = 0; i < vault.data.length; i++) {
    const item: VaultItem = vault.data[i];
    const { ivBase64, ctBase64, tagBase64 } = item;

    const iv = Buffer.from(ivBase64, "base64");
    const encrypted = Buffer.from(ctBase64, "base64");
    const tag = Buffer.from(tagBase64, "base64");

    try {
      const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
      decipher.setAuthTag(tag);
      const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ]).toString("utf8");

      decryptedVaultData.push(decrypted);
    } catch (err) {
      console.error(
        "Failed to decrypt vault. Wrong password or corrupted data.",
        err
      );
    }
  }

  return decryptedVaultData;
};

export const deleteData: DeleteData = async (index: number) => {
  const filePath = getVaultPath();

  const fileContent = await readFile(filePath, "utf8");
  const vault = JSON.parse(fileContent);

  if (!vault.data || vault.data.length <= index || index < 0) {
    console.error("Index out of bounds.");
    return false;
  }

  vault.data = vault.data.filter((_, i) => i !== index);

  await writeFile(filePath, JSON.stringify(vault, null, 2), {
    encoding: "utf8",
  });

  return true;
};
