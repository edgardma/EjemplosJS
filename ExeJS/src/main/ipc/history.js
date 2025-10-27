const { ipcMain } = require('electron');
const fs = require('fs/promises');
const path = require('path');
const { getPaths, ensureDir } = require('../paths');

function registerHistoryIpc() {
  ipcMain.handle('history:load', async () => {
    const { historyPath } = getPaths();
    try {
      const raw = await fs.readFile(historyPath, 'utf8');
      const data = JSON.parse(raw);
      return { ok: true, data, historyPath };
    } catch {
      return { ok: true, data: { runs: [], version: 1 }, historyPath };
    }
  });

  ipcMain.handle('history:save', async (_ev, { data }) => {
    const { historyPath } = getPaths();
    await ensureDir(path.dirname(historyPath));
    await fs.writeFile(historyPath, JSON.stringify(data, null, 2), 'utf8');
    return { ok: true, historyPath };
  });

  ipcMain.handle('history:clear', async () => {
    const { historyPath } = getPaths();
    try { await fs.unlink(historyPath); } catch {}
    return { ok: true };
  });
}

module.exports = { registerHistoryIpc };
