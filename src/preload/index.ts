import {
  CheckPassword,
  AddData,
  GetData,
  DeleteData,
  VaultExists,
  CreateVault, GetBreachStatus,
} from "@shared/types";
import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    checkPassword: (...args: Parameters<CheckPassword>) =>
      ipcRenderer.invoke("checkPassword", ...args),
    addData: (...args: Parameters<AddData>) =>
      ipcRenderer.invoke("addData", ...args),
    getData: (...args: Parameters<GetData>) =>
      ipcRenderer.invoke("getData", ...args),
    deleteData: (...args: Parameters<DeleteData>) =>
      ipcRenderer.invoke("deleteData", ...args),
    vaultExists: (...args: Parameters<VaultExists>) =>
      ipcRenderer.invoke("vaultExists", ...args),
    createVault: (...args: Parameters<CreateVault>) =>
      ipcRenderer.invoke("createVault", ...args),
    getBreachStatus: (...args: Parameters<GetBreachStatus>)=>
      ipcRenderer.invoke("getBreachStatus", ...args),
  });

  contextBridge.exposeInMainWorld("windowControls", {
    minimize: () => ipcRenderer.send("window:minimize"),
    maximize: () => ipcRenderer.send("window:maximize"),
    close: () => ipcRenderer.send("window:close"),
  });
} catch (error) {
  console.log(error);
}
