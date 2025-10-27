const { ipcMain, dialog } = require('electron');
const fs = require('fs/promises');
const fssync = require('fs');
const path = require('path');
const { getPaths, ensureDir } = require('../paths');

function registerFilesIpc() {
  ipcMain.handle('file:open', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      title: 'Abrir archivo',
      properties: ['openFile'],
      filters: [{ name: 'JavaScript', extensions: ['js','mjs','cjs','txt'] }]
    });
    if (canceled || !filePaths?.[0]) return { canceled: true };
    const filePath = filePaths[0];
    const content = await fs.readFile(filePath, 'utf8');
    return { canceled: false, filePath, content };
  });

  ipcMain.handle('file:save', async (_ev, { filePath, content }) => {
    if (!filePath) return { ok: false, error: 'filePath requerido.' };
    try {
      await fs.writeFile(filePath, content, 'utf8');
      return { ok: true, filePath };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  });

  ipcMain.handle('file:saveAs', async (_ev, { suggestedName = 'script.js', content }) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Guardar como...',
      defaultPath: suggestedName,
      filters: [{ name: 'JavaScript', extensions: ['js','mjs','cjs','txt'] }]
    });
    if (canceled || !filePath) return { canceled: true };
    await fs.writeFile(filePath, content, 'utf8');
    return { canceled: false, ok: true, filePath };
  });

  ipcMain.handle('file:autoSave', async (_ev, { content, keep = 10 }) => {
    const { autosaveDir } = getPaths();
    await ensureDir(autosaveDir);
    const ts = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = `${ts.getFullYear()}${pad(ts.getMonth()+1)}${pad(ts.getDate())}_${pad(ts.getHours())}${pad(ts.getMinutes())}${pad(ts.getSeconds())}`;
    const filePath = path.join(autosaveDir, `mi-ejecutor-autosave-${stamp}.js`);
    await fs.writeFile(filePath, content, 'utf8');

    try {
      const files = (await fs.readdir(autosaveDir))
        .filter(f => f.startsWith('mi-ejecutor-autosave-') && f.endsWith('.js'))
        .map(f => path.join(autosaveDir, f));
      const withTimes = files.map(f => ({ f, mtime: fssync.statSync(f).mtimeMs }));
      withTimes.sort((a,b) => b.mtime - a.mtime);
      const toDelete = withTimes.slice(keep);
      await Promise.allSettled(toDelete.map(x => fs.unlink(x.f)));
    } catch {}

    return { ok: true, filePath, dir: autosaveDir };
  });
}

module.exports = { registerFilesIpc };
