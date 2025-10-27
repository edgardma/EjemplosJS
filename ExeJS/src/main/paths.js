const { app } = require('electron');
const fs = require('fs/promises');
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

module.exports = { getPaths, ensureDir };
