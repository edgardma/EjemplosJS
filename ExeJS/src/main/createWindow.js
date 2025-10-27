const { BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, '..', '..', 'preload.js')
    }
  });
  win.removeMenu();
  win.loadFile('index.html');
  return win;
}

module.exports = { createWindow };
