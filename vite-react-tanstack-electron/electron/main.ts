import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { app, BrowserWindow } from 'electron';

import { registerIpcHandlers } from './ipc';

let mainWindow: BrowserWindow | null = null;
const rendererPath = path.join(
  __dirname,
  `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`,
);
const rendererURL =
  MAIN_WINDOW_VITE_DEV_SERVER_URL || pathToFileURL(rendererPath).href;

const isAppURL = (value: string) => {
  const url = new URL(value);
  url.hash = '';
  const expected = new URL(rendererURL);
  expected.hash = '';
  return url.href === expected.href;
};

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1000,
    height: 700,
    titleBarStyle: 'hidden',
    titleBarOverlay:
      process.platform === 'win32' ? { color: '#00000000' } : true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });
  mainWindow = window;
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', (event, url) => {
    if (!isAppURL(url)) event.preventDefault();
  });
  window.on('closed', () => {
    mainWindow = null;
  });
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    void window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    window.webContents.openDevTools();
  } else {
    void window.loadFile(rendererPath);
  }
};

app.whenReady().then(() => {
  registerIpcHandlers({ getMainWindow: () => mainWindow, isAppURL });
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
