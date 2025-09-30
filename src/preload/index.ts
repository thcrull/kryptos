import { CheckPassword, GetData } from "@shared/types";
import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    checkPassword: (...args: Parameters<CheckPassword>) =>
      ipcRenderer.invoke("checkPassword", ...args),
    getData: (...args: Parameters<GetData>) =>
      ipcRenderer.invoke("getData", ...args),
  });

  contextBridge.exposeInMainWorld("windowControls", {
    minimize: () => ipcRenderer.send("window:minimize"),
    maximize: () => ipcRenderer.send("window:maximize"),
    close: () => ipcRenderer.send("window:close"),
  });
} catch (error) {
  console.log(error);
}
