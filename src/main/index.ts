import { app, shell, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import {
  checkPassword,
  addData,
  getData,
  deleteData,
  vaultExists,
  createVault,
} from "./lib";
import {
  CheckPassword,
  AddData,
  GetData,
  DeleteData,
  VaultExists,
  CreateVault,
} from "@shared/types";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    backgroundMaterial: "acrylic",
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? {} : {}),
    center: true, // center window when opening app
    title: "Kryptos",
    frame: false,
    vibrancy: "under-window",
    visualEffectState: "active",
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  ipcMain.on("window:minimize", () => {
    if (mainWindow) mainWindow.minimize();
  });

  ipcMain.on("window:maximize", () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });

  ipcMain.on("window:close", () => {
    if (mainWindow) mainWindow.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", () => console.log("pong"));

  ipcMain.handle("checkPassword", (_, ...args: Parameters<CheckPassword>) =>
    checkPassword(...args)
  );
  ipcMain.handle("addData", (_, ...args: Parameters<AddData>) =>
    addData(...args)
  );
  ipcMain.handle("getData", (_, ...args: Parameters<GetData>) =>
    getData(...args)
  );
  ipcMain.handle("deleteData", (_, ...args: Parameters<DeleteData>) =>
    deleteData(...args)
  );
  ipcMain.handle("vaultExists", (_, ...args: Parameters<VaultExists>) =>
    vaultExists(...args)
  );
  ipcMain.handle("createVault", (_, ...args: Parameters<CreateVault>) =>
    createVault(...args)
  );

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
