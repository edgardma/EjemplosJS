const { app, BrowserWindow } = require('electron');
const { createWindow } = require('./src/main/createWindow');
const { registerFilesIpc } = require('./src/main/ipc/files');
const { registerHistoryIpc } = require('./src/main/ipc/history');
const { registerUiIpc } = require('./src/main/ipc/ui');

function ready() {
  registerFilesIpc();
  registerHistoryIpc();
  registerUiIpc();
  createWindow();
}

app.whenReady().then(ready);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
