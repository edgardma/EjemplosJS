const codeEl = document.getElementById('code');
const outputEl = document.getElementById('output');
const runBtn = document.getElementById('btn-run');
const clearBtn = document.getElementById('btn-clear');
const copyBtn = document.getElementById('btn-copy');
const openBtn = document.getElementById('btn-open');
const saveBtn = document.getElementById('btn-save');
const saveAsBtn = document.getElementById('btn-saveas');
const modeSel = document.getElementById('mode');
const iframe = document.getElementById('runner');
const titleEl = document.getElementById('title');

const autosaveEnableEl = document.getElementById('autosave-enable');
const autosaveSecsEl = document.getElementById('autosave-secs');
const autosaveKeepEl = document.getElementById('autosave-keep');
const autosaveStatusEl = document.getElementById('autosave-status');

const historyEl = document.getElementById('history');
const clearHistoryBtn = document.getElementById('btn-clear-history');
const saveHistoryBtn = document.getElementById('btn-save-history');

let currentFilePath = null;
let dirty = false;
let autosaveTimer = null;

// Historial persistente
let runs = []; // [{id, ts, mode, code, logs, result, error, durationMs, ok, stack}]
let currentRun = null;

// ===== Utils
function fmtDate(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function setDirty(d) {
  dirty = d;
  const base = currentFilePath ? currentFilePath.split(/[\\/]/).pop() : 'Ejecutor de JavaScript';
  titleEl.textContent = (dirty ? '● ' : '') + base;
}

function printLine(text, cls = 'log') {
  const div = document.createElement('div');
  div.className = cls;
  div.textContent = text;
  outputEl.appendChild(div);
  outputEl.scrollTop = outputEl.scrollHeight;
  if (currentRun) currentRun.logs.push({ type: cls, text });
}

function nextRunId() {
  const n = (runs.length + 1).toString().padStart(3, '0');
  return n;
}

function renderHistory() {
  historyEl.innerHTML = '';
  for (const r of runs.slice().reverse()) {
    const el = document.createElement('div');
    el.className = 'history-item';
    el.dataset.id = r.id;

    const title = document.createElement('div');
    title.className = 'history-title';
    title.textContent = `${r.ok ? '✅' : '❌'} ${r.mode.toUpperCase()} • ${fmtDate(new Date(r.ts))}`;

    const meta = document.createElement('div');
    meta.className = 'history-meta';
    const summary = r.ok ? (r.resultPreview ?? 'sin retorno') : (r.error?.split('\n')[0] ?? 'error');
    meta.textContent = `Duración: ${r.durationMs}ms • ${summary}`;

    const actions = document.createElement('div');
    actions.className = 'history-actions';

    const btnShow = document.createElement('button');
    btnShow.textContent = 'Ver';
    btnShow.addEventListener('click', (e) => {
      e.stopPropagation();
      outputEl.innerHTML = '';
      for (const ln of r.logs) printLine(ln.text, ln.type);
      if (r.ok) printLine(`↩︎ Retorno: ${String(r.result)}`, 'ret');
      else {
        printLine(`✖ Error: ${r.error}`, 'err');
        if (r.stack) printLine(r.stack, 'err');
      }
    });

    const btnRerun = document.createElement('button');
    btnRerun.textContent = 'Re-ejecutar';
    btnRerun.addEventListener('click', (e) => {
      e.stopPropagation();
      codeEl.value = r.code;
      modeSel.value = r.mode;
      setDirty(true);
      runCode();
    });

    const btnExport = document.createElement('button');
    btnExport.textContent = 'Exportar salida';
    btnExport.addEventListener('click', async (e) => {
      e.stopPropagation();
      const text = buildRunText(r);
      try {
        await navigator.clipboard.writeText(text);
        window.ui?.message('info', 'Salida del historial copiada al portapapeles.');
      } catch {
        window.ui?.message('error', 'No se pudo copiar la salida.');
      }
    });

    actions.append(btnShow, btnRerun, btnExport);
    el.append(title, meta, actions);
    el.addEventListener('click', () => {
      codeEl.value = r.code;
      modeSel.value = r.mode;
      setDirty(true);
    });

    historyEl.appendChild(el);
  }
}

function buildRunText(r) {
  const lines = [
    `# Ejecución ${r.id} (${r.mode.toUpperCase()})`,
    `Fecha: ${fmtDate(new Date(r.ts))}`,
    `Duración: ${r.durationMs}ms`,
    `Código:\n${r.code}`,
    `---`,
    `Salida:`
  ];
  r.logs.forEach(ln => lines.push(`[${ln.type}] ${ln.text}`));
  if (r.ok) lines.push(`[ret] ${String(r.result)}`);
  else lines.push(`[err] ${r.error}\n${r.stack ?? ''}`);
  return lines.join('\n');
}

// ===== Persistencia de historial
const debounced = (fn, ms = 500) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

async function loadHistory() {
  const res = await window.history.load();
  if (res?.ok) {
    const data = res.data || { runs: [], version: 1 };
    runs = Array.isArray(data.runs) ? data.runs : [];
    renderHistory();
  }
}

const saveHistoryNow = async () => {
  const data = { version: 1, runs };
  await window.history.save(data);
};
const saveHistory = debounced(saveHistoryNow, 600);

clearHistoryBtn.addEventListener('click', async () => {
  runs = [];
  renderHistory();
  await window.history.clear();
});

saveHistoryBtn.addEventListener('click', saveHistoryNow);

// ===== Auto-guardado incremental
function startAutosave() {
  stopAutosave();
  const secs = Math.max(5, Number(autosaveSecsEl.value || 30));
  const keep = Math.max(1, Number(autosaveKeepEl.value || 10));
  autosaveTimer = setInterval(async () => {
    try {
      if (currentFilePath) {
        await window.files.save(currentFilePath, codeEl.value);
        autosaveStatusEl.textContent = `Auto-guardado en ${currentFilePath}`;
      } else {
        const res = await window.files.autoSave(codeEl.value, keep);
        if (res?.ok) {
          autosaveStatusEl.textContent = `Auto-guardado (${keep} versiones) en ${res.dir}`;
        }
      }
    } catch {
      autosaveStatusEl.textContent = `Auto-guardado falló`;
    }
  }, secs * 1000);
  autosaveStatusEl.textContent = `Auto-guardado activo (${secs}s, mantener ${keep})`;
}

function stopAutosave() {
  if (autosaveTimer) clearInterval(autosaveTimer);
  autosaveTimer = null;
  autosaveStatusEl.textContent = '';
}

// ===== Ejecución
function runCode() {
  outputEl.innerHTML = '';
  const code = codeEl.value;
  const mode = modeSel.value;

  currentRun = {
    id: nextRunId(),
    ts: Date.now(),
    mode,
    code,
    logs: [],
    ok: false,
    result: undefined,
    resultPreview: undefined,
    error: null,
    stack: null,
    durationMs: 0,
    _t0: performance.now()
  };

  const send = () => iframe.contentWindow.postMessage({ type: 'run', code, mode }, '*');

  if (iframe.dataset.ready === '1') send();
  else {
    const onLoad = () => {
      iframe.dataset.ready = '1';
      iframe.removeEventListener('load', onLoad);
      send();
    };
    iframe.addEventListener('load', onLoad);
    iframe.src = './executor.html';
  }
}

window.addEventListener('message', (ev) => {
  const { type } = ev.data || {};
  if (type === 'console') {
    printLine(String(ev.data.message), 'log');
  } else if (type === 'result') {
    const ret = ev.data.returnValue;
    printLine(`↩︎ Retorno: ${String(ret)}`, 'ret');

    if (currentRun) {
      currentRun.ok = true;
      currentRun.result = ret;
      currentRun.resultPreview = (ret === undefined) ? 'undefined' : String(ret).slice(0, 80);
      currentRun.durationMs = Math.round(performance.now() - currentRun._t0);
      runs.push({ ...currentRun, _t0: undefined });
      currentRun = null;
      renderHistory();
      saveHistory();
    }
  } else if (type === 'error') {
    printLine(`✖ Error: ${ev.data.error}`, 'err');
    if (ev.data.stack) printLine(ev.data.stack, 'err');

    if (currentRun) {
      currentRun.ok = false;
      currentRun.error = ev.data.error;
      currentRun.stack = ev.data.stack;
      currentRun.durationMs = Math.round(performance.now() - currentRun._t0);
      runs.push({ ...currentRun, _t0: undefined });
      currentRun = null;
      renderHistory();
      saveHistory();
    }
  }
});

runBtn.addEventListener('click', runCode);
clearBtn.addEventListener('click', () => (outputEl.innerHTML = ''));
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(outputEl.innerText || '');
    window.ui?.message('info', 'Salida copiada al portapapeles.');
  } catch {
    window.ui?.message('error', 'No se pudo copiar la salida.');
  }
});

// Teclas rápidas
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') runCode();
  if (e.ctrlKey && e.key.toLowerCase() === 's') {
    e.preventDefault(); doSave();
  }
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
    e.preventDefault(); doSaveAs();
  }
  if (e.ctrlKey && e.key.toLowerCase() === 'o') {
    e.preventDefault(); doOpen();
  }
});

codeEl.addEventListener('input', () => setDirty(true));

// ===== Archivo
async function doOpen() {
  if (dirty) {
    const ok = confirm('Hay cambios sin guardar. ¿Deseas continuar sin guardar?');
    if (!ok) return;
  }
  const res = await window.files.open();
  if (res?.canceled) return;
  codeEl.value = res.content ?? '';
  currentFilePath = res.filePath ?? null;
  setDirty(false);
  outputEl.innerHTML = '';
}

async function doSave() {
  if (!currentFilePath) return doSaveAs();
  await window.files.save(currentFilePath, codeEl.value);
  setDirty(false);
}

async function doSaveAs() {
  const suggested = currentFilePath ? currentFilePath.split(/[\\/]/).pop() : 'script.js';
  const res = await window.files.saveAs(suggested, codeEl.value);
  if (res?.canceled) return;
  currentFilePath = res.filePath;
  setDirty(false);
}

// ===== Auto-guardado UI
autosaveEnableEl.addEventListener('change', () => {
  if (autosaveEnableEl.checked) startAutosave();
  else stopAutosave();
});
autosaveSecsEl.addEventListener('change', () => {
  if (autosaveEnableEl.checked) startAutosave();
});
autosaveKeepEl.addEventListener('change', () => {
  if (autosaveEnableEl.checked) startAutosave();
});

// ===== Inicio
(async function init() {
  await loadHistory();
})();
