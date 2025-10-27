const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs/promises');
const fssync = require('fs');
const path = require('path');

function getPaths() {
  const userData = app.getPath('userData');
  const autosaveDir = path.join(userData, 'Autosaves');
  const historyPath = path.join(userData, 'history.json');
  return { userData, autosaveDir, historyPath };
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.removeMenu();
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

/* ========= IPC: archivos ========= */
ipcMain.handle('file:open', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'JavaScript', extensions: ['js', 'mjs', 'cjs', 'txt'] }]
  });
  if (canceled || !filePaths?.[0]) return { canceled: true };
  const filePath = filePaths[0];
  const content = await fs.readFile(filePath, 'utf8');
  return { canceled: false, filePath, content };
});

ipcMain.handle('file:saveAs', async (_ev, { suggestedName = 'script.js', content }) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: suggestedName,
    filters: [{ name: 'JavaScript', extensions: ['js', 'mjs', 'cjs', 'txt'] }]
  });
  if (canceled || !filePath) return { canceled: true };
  await fs.writeFile(filePath, content, 'utf8');
  return { canceled: false, filePath };
});

ipcMain.handle('file:save', async (_ev, { filePath, content }) => {
  if (!filePath) throw new Error('filePath requerido para guardar.');
  await fs.writeFile(filePath, content, 'utf8');
  return { ok: true };
});

/* ========= IPC: auto-guardado incremental ========= */
ipcMain.handle('file:autoSave', async (_ev, { content, keep = 10 }) => {
  const { autosaveDir } = getPaths();
  await ensureDir(autosaveDir);

  const ts = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = `${ts.getFullYear()}${pad(ts.getMonth()+1)}${pad(ts.getDate())}_${pad(ts.getHours())}${pad(ts.getMinutes())}${pad(ts.getSeconds())}`;
  const filePath = path.join(autosaveDir, `mi-ejecutor-autosave-${stamp}.js`);

  await fs.writeFile(filePath, content, 'utf8');

  // Limpiar versiones antiguas, conservar las últimas N por fecha de modificación
  try {
    const files = (await fs.readdir(autosaveDir))
      .filter(f => f.startsWith('mi-ejecutor-autosave-') && f.endsWith('.js'))
      .map(f => path.join(autosaveDir, f));

    const withTimes = files.map(f => ({ f, mtime: fssync.statSync(f).mtimeMs }));
    withTimes.sort((a, b) => b.mtime - a.mtime);
    const toDelete = withTimes.slice(keep);
    await Promise.allSettled(toDelete.map(x => fs.unlink(x.f)));
  } catch (_) {}

  return { ok: true, filePath, dir: autosaveDir };
});

/* ========= IPC: historial persistente ========= */
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
  const dir = path.dirname(historyPath);
  await ensureDir(dir);
  await fs.writeFile(historyPath, JSON.stringify(data, null, 2), 'utf8');
  return { ok: true, historyPath };
});

ipcMain.handle('history:clear', async () => {
  const { historyPath } = getPaths();
  try {
    await fs.unlink(historyPath);
  } catch {}
  return { ok: true };
});

ipcMain.handle('ui:message', async (_ev, { type = 'info', message }) => {
  const buttons = ['OK'];
  await dialog.showMessageBox({ message, buttons, type });
  return { ok: true };
});
