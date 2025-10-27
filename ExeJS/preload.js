const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('files', {
  open: () => ipcRenderer.invoke('file:open'),
  saveAs: (suggestedName, content) => ipcRenderer.invoke('file:saveAs', { suggestedName, content }),
  save: (filePath, content) => ipcRenderer.invoke('file:save', { filePath, content }),
  autoSave: (content, keep) => ipcRenderer.invoke('file:autoSave', { content, keep })
});

contextBridge.exposeInMainWorld('history', {
  load: () => ipcRenderer.invoke('history:load'),
  save: (data) => ipcRenderer.invoke('history:save', { data }),
  clear: () => ipcRenderer.invoke('history:clear')
});

contextBridge.exposeInMainWorld('ui', {
  message: (type, message) => ipcRenderer.invoke('ui:message', { type, message })
});

contextBridge.exposeInMainWorld('appInfo', {
  name: 'mi-ejecutor-js',
  version: '1.3.0'
});
