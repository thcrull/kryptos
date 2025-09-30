import * as path from "path";
import { homedir } from "os";
import {
  ensureDir,
  readdir,
  readFile,
  remove,
  stat,
  pathExists,
  writeFile,
} from "fs-extra";

export const getRootDir = () => {
  return path.join(homedir(), "Documents", "Kryptos");
};

const getConfigPath = () => {
  return path.join(getRootDir(), "config.kryptos");
};

export const initRootDir = async () => {
  await ensureDir(getRootDir());
};

export const checkConfig = async (filePath: string) => {
  await initRootDir();

  if (await pathExists(filePath)) {
    console.log("Config already exists, skipping init.");
    return;
  }

  await writeFile(filePath, "muie test", {
    encoding: "utf8",
  });

  console.log("Vault initialized successfully!");
};

export const checkPassword = (password: string): boolean => {
  checkConfig(getConfigPath());

  console.log("suntem in backend si verificam" + password);
  return true;
};
