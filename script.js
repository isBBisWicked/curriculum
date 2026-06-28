const desktop = document.getElementById('desktop');
const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');
const taskButtons = document.getElementById('taskButtons');
const clock = document.getElementById('clock');

const windows = [...document.querySelectorAll('.window')];
let zIndex = 20;
let selectedIcon = null;

const windowNames = {
  welcome: 'LEGGIMI.TXT',
  profile: 'CHI SONO',
  experience: 'ESPERIENZA',
  education: 'FORMAZIONE',
  skills: 'COMPETENZE',
  projects: 'PROGETTI',
  contact: 'CONTATTI',
  cv: 'CURRICULUM.DOC'
};

function getWindow(id) {
  return document.getElementById(id);
}

function windowIsOpen(win) {
  return win && !win.hidden;
}

function focusWindow(win) {
  if (!windowIsOpen(win)) return;
  zIndex += 1;
  win.style.zIndex = zIndex;
  windows.forEach((item) => item.classList.remove('active-window'));
  win.classList.add('active-window');
  updateTaskbar();
}

function openWindow(id) {
  const win = getWindow(id);
  if (!win) return;

  win.hidden = false;
  win.classList.remove('minimized');
  focusWindow(win);
  closeStartMenu();
}

function closeWindow(win) {
  win.hidden = true;
  win.classList.remove('minimized', 'maximized', 'active-window');
  updateTaskbar();
}

function minimizeWindow(win) {
  win.classList.add('minimized');
  win.classList.remove('active-window');
  updateTaskbar();
}

function toggleMaximize(win) {
  win.classList.toggle('maximized');
  focusWindow(win);
}

function restoreWindow(win) {
  win.classList.remove('minimized');
  focusWindow(win);
}

function updateTaskbar() {
  taskButtons.innerHTML = '';

  windows.filter(windowIsOpen).forEach((win) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'task-button';
    button.textContent = windowNames[win.dataset.window] || 'Finestra';

    if (win.classList.contains('active-window') && !win.classList.contains('minimized')) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      if (win.classList.contains('minimized')) {
        restoreWindow(win);
        return;
      }

      if (win.classList.contains('active-window')) {
        minimizeWindow(win);
      } else {
        focusWindow(win);
      }
    });

    taskButtons.appendChild(button);
  });
}

function closeStartMenu() {
  startMenu.hidden = true;
  startButton.classList.remove('active');
}

function toggleStartMenu() {
  startMenu.hidden = !startMenu.hidden;
  startButton.classList.toggle('active', !startMenu.hidden);
}

function selectDesktopIcon(icon) {
  if (selectedIcon) selectedIcon.classList.remove('selected');
  selectedIcon = icon;
  selectedIcon.classList.add('selected');
}

function updateClock() {
  clock.textContent = new Intl.DateTimeFormat('it-IT', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());
}

// Desktop icon behavior: double click on desktop, a single tap on touch screens.
document.querySelectorAll('.desktop-icon').forEach((icon) => {
  icon.addEventListener('click', () => selectDesktopIcon(icon));
  icon.addEventListener('dblclick', () => openWindow(icon.dataset.windowTarget));

  icon.addEventListener('touchend', (event) => {
    event.preventDefault();
    openWindow(icon.dataset.windowTarget);
  }, { passive: false });
});

// Generic open buttons throughout the interface.
document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-open-window]');
  if (opener) {
    openWindow(opener.dataset.openWindow);
  }
});

startButton.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleStartMenu();
});

startMenu.addEventListener('click', (event) => event.stopPropagation());

document.addEventListener('click', (event) => {
  if (!startMenu.hidden && !event.target.closest('#startMenu') && !event.target.closest('#startButton')) {
    closeStartMenu();
  }

  if (!event.target.closest('.desktop-icon')) {
    if (selectedIcon) selectedIcon.classList.remove('selected');
    selectedIcon = null;
  }
});

windows.forEach((win) => {
  const titlebar = win.querySelector('.window-titlebar');

  win.addEventListener('pointerdown', () => focusWindow(win));

  win.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const action = button.dataset.action;

      if (action === 'close') closeWindow(win);
      if (action === 'minimize') minimizeWindow(win);
      if (action === 'maximize') toggleMaximize(win);
    });
  });

  titlebar.addEventListener('dblclick', (event) => {
    if (event.target.closest('.window-controls')) return;
    toggleMaximize(win);
  });

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  titlebar.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.window-controls') || window.innerWidth <= 760 || win.classList.contains('maximized')) return;

    const rect = win.getBoundingClientRect();
    dragging = true;
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    titlebar.setPointerCapture(event.pointerId);
    focusWindow(win);
  });

  titlebar.addEventListener('pointermove', (event) => {
    if (!dragging) return;

    const maxX = Math.max(6, window.innerWidth - win.offsetWidth - 6);
    const maxY = Math.max(34, window.innerHeight - win.offsetHeight - 36);

    const left = Math.max(6, Math.min(maxX, event.clientX - offsetX));
    const top = Math.max(34, Math.min(maxY, event.clientY - offsetY));

    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
  });

  titlebar.addEventListener('pointerup', () => {
    dragging = false;
  });

  titlebar.addEventListener('pointercancel', () => {
    dragging = false;
  });
});

function buildCvText() {
  return `GIUSEPPE TIANO\n\nConsulenza per il Terzo Settore · Amministrazione digitale · Progettazione sociale\n\nPROFILO\nProfessionista orientato all’organizzazione e alla digitalizzazione di enti e progetti sociali. Esperienza nella gestione amministrativa di realtà associative, nella costruzione di strumenti operativi e nel supporto a processi documentali e progettuali.\n\nESPERIENZA\n2026 — oggi · TerzoFattore\nConsulenza amministrativa, organizzativa e digitale per ETS.\n\n2021 — oggi · Associazione Il Dono APS\nResponsabile amministrativo: organizzazione documentale, supporto amministrativo e contabile, digitalizzazione di flussi e strumenti, affiancamento alle attività progettuali.\n\n2025 — oggi · TerzoFattore Web\nIdeazione e sviluppo di siti e strumenti digitali per associazioni, professionisti e attività territoriali.\n\nFORMAZIONE\nGiurisprudenza · Università degli Studi di Messina · Corso di laurea magistrale a ciclo unico, in corso.\nManagement del Terzo Settore · Percorso professionalizzante completato nell’anno 2025/2026.\n\nCOMPETENZE\nOrganizzazione ETS, gestione documentale, supporto amministrativo, progettazione sociale, digitalizzazione di processi, siti web, strumenti gestionali, analisi dei bisogni, comunicazione digitale. Italiano madrelingua, inglese avanzato.\n\nCONTATTI\ngspptiano@gmail.com\nCalabria / Sicilia · collaborazioni anche da remoto\n`;
}

document.getElementById('downloadCvButton').addEventListener('click', () => {
  const blob = new Blob([buildCvText()], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Giuseppe-Tiano-Curriculum.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

document.getElementById('printCvButton').addEventListener('click', () => {
  openWindow('cv');
  window.print();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeStartMenu();
  }
});

updateClock();
setInterval(updateClock, 1000);
focusWindow(getWindow('welcome'));
updateTaskbar();
