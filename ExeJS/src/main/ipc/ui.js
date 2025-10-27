const { ipcMain, dialog } = require('electron');

function registerUiIpc() {
  ipcMain.handle('ui:message', async (_ev, { type = 'info', message }) => {
    const buttons = ['OK'];
    await dialog.showMessageBox({ type, message, buttons });
    return { ok: true };
  });
}

module.exports = { registerUiIpc };
