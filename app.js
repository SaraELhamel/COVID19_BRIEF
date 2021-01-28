const { app, BrowserWindow, screen } = require("electron");
//const electron =
const { protocol } = require("electron/main");
const { BrowserView } = require("electron");
const path = require("path");

//Display Window
app.whenReady().then(() => {
  const url = "file://" + path.join(__dirname, "/public/index.html");
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const window = new BrowserWindow({ width, height });
  webPreferences: {
    nodeIntegration: true, window.loadURL(url);
  }
});
