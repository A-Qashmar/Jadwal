/**
 * Jadwal — Personal Time Manager Engine
 */

const KEY = "jadwal-matrix-v1";
const LANG_KEY = "jadwal-lang-preference";
const THEME_KEY = "jadwal-theme-preference";

const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, "0");
const dateKey = d => {
  const x = new Date(d);
  return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`;
};

const todayKey = dateKey(new Date());

const CATEGORIES = {
  ar: {
    focus: "تركيز عميق",
    work: "عمل",
    study: "دراسة",
    personal: "شخصي",
    health: "صحة ورياضة",
    break: "استراحة"
  },
  en: {
    focus: "Deep Focus",
    work: "Work",
    study: "Study",
    personal: "Personal",
    health: "Health",
    break: "Break"
  }
};

const I18N = {
  ar: {
    navToday: "اليوم",
    navWeek: "الأسبوع",
    navTasks: "المهام",
    theme: "المظهر",
    storage: "التخزين المحلي",
    todayBtn: "اليوم",
    addBlock: "إضافة قالب",
    heroEyebrow: "يومك، بتصميمك",
    dayProgress: "إنجاز اليوم",
    doneSuffix: "مكتمل",
    timelineTitle: "مخطط اليوم (24H)",
    dragHint: "انقر يمين الفأرة للخيارات السريعة، أو اسحب الأطراف للتحكم السريع بالوقت",
    glanceKicker: "نظرة سريعة على اليوم",
    nextUp: "النشاط القادم",
    statPlanned: "المخطط",
    statFocus: "التركيز العميق",
    statDone: "المكتمل",
    statFree: "المتبقي",
    planBlock: "جدولة قالب زمني",
    weekEyebrow: "خطط مسبقاً",
    weekTitle: "الجدول الأسبوعي",
    tasksEyebrow: "صندوق الوارد",
    tasksTitle: "المهام اليومية",
    newTask: "مهمة جديدة",
    addBtn: "إضافة",
    modalEyebrow: "قالب زمني",
    modalAddTitle: "إضافة قالب",
    modalEditTitle: "تعديل القالب",
    formTitle: "اسم النشاط",
    formDate: "التاريخ",
    formCategory: "التصنيف",
    formStart: "البداية",
    formEnd: "النهاية",
    formDone: "تحديد كمكتمل",
    btnDelete: "حذف",
    btnDuplicate: "📋 نسخ القالب",
    btnCancel: "إلغاء",
    btnSave: "حفظ القالب",
    focusMode: "جلسة تركيز",
    start: "بدء",
    pause: "إيقاف مؤقت",
    reset: "إعادة ضبط",
    taskPlaceholder: "اكتب مهمة جديدة واضغط Enter…",
    greetingMorning: "صباح الخير.",
    greetingAfternoon: "مساء الخير.",
    greetingEvening: "مساء النور.",
    allClear: "كل شيء منجز",
    noUpcoming: "لا توجد أنشطة قادمة اليوم",
    nothingScheduled: "لا يوجد نشاط مجدول",
    addBlockToStart: "أضف قالباً لتبدأ يومك",
    completedStatus: "مكتمل",
    emptyDaySummary: "لم يتم جدولة أي قالب بعد. ابدأ بصناعة يومك.",
    alertValid: "يرجى كتابة عنوان صحيح وأن يكون وقت النهاية بعد البداية.",
    alertFocusDone: "اكتملت جلسة التركيز! خذ استراحة مستحقة.",
    toastCloned: "تم نسخ القالب بنجاح ✨",
    toastResized: "تم تحديث وقت القالب بنجاح ⏱️",
    toastDeleted: "تم حذف القالب 🗑️",
    ctxEdit: "تعديل",
    ctxDone: "تحديد كمكتمل",
    ctxUndone: "إلغاء الإكمال",
    ctxFocus: "بدء التركيز",
    ctxDuplicate: "نسخ القالب",
    ctxDelete: "حذف القالب"
  },
  en: {
    navToday: "Today",
    navWeek: "Week",
    navTasks: "Tasks",
    theme: "Theme",
    storage: "Local storage",
    todayBtn: "Today",
    addBlock: "Add block",
    heroEyebrow: "YOUR DAY, DESIGNED",
    dayProgress: "DAY PROGRESS",
    doneSuffix: "done",
    timelineTitle: "YOUR DAY (24H)",
    dragHint: "Right-click for quick actions, drag edges to stretch time",
    glanceKicker: "TODAY AT A GLANCE",
    nextUp: "NEXT UP",
    statPlanned: "PLANNED",
    statFocus: "DEEP FOCUS",
    statDone: "DONE",
    statFree: "FREE",
    planBlock: "Plan a time block",
    weekEyebrow: "PLAN AHEAD",
    weekTitle: "Weekly Planner",
    tasksEyebrow: "INBOX",
    tasksTitle: "Tasks",
    newTask: "New task",
    addBtn: "Add",
    modalEyebrow: "TIME BLOCK",
    modalAddTitle: "Add block",
    modalEditTitle: "Edit block",
    formTitle: "Activity Title",
    formDate: "Date",
    formCategory: "Category",
    formStart: "Start Time",
    formEnd: "End Time",
    formDone: "Mark as completed",
    btnDelete: "Delete",
    btnDuplicate: "📋 Duplicate Block",
    btnCancel: "Cancel",
    btnSave: "Save block",
    focusMode: "FOCUS MODE",
    start: "Start",
    pause: "Pause",
    reset: "Reset",
    taskPlaceholder: "Quickly add a task and press Enter…",
    greetingMorning: "Good morning.",
    greetingAfternoon: "Good afternoon.",
    greetingEvening: "Good evening.",
    allClear: "All clear",
    noUpcoming: "No upcoming blocks today",
    nothingScheduled: "Nothing scheduled",
    addBlockToStart: "Add a block to get started",
    completedStatus: "Completed",
    emptyDaySummary: "Nothing scheduled yet. Make the day yours.",
    alertValid: "Please enter a valid title and end time after start time.",
    alertFocusDone: "Focus session complete! Take a well deserved break.",
    toastCloned: "Block duplicated successfully ✨",
    toastResized: "Block time updated successfully ⏱️",
    toastDeleted: "Block deleted 🗑️",
    ctxEdit: "Edit",
    ctxDone: "Mark as Completed",
    ctxUndone: "Mark as Incomplete",
    ctxFocus: "Start Focus",
    ctxDuplicate: "Duplicate Block",
    ctxDelete: "Delete Block"
  }
};

let currentLang = localStorage.getItem(LANG_KEY) || "ar";
let currentTheme = localStorage.getItem(THEME_KEY) || "light";

function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
  const icon = $("themeIcon");
  const text = $("themeText");
  if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
  if (text) text.textContent = currentLang === "ar" ? (theme === "dark" ? "فاتح" : "داكن") : (theme === "dark" ? "Light" : "Dark");
}

$("themeBtn").onclick = () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
};

function updateCategoryDropdown() {
  const catSelect = $("blockCategory");
  if (!catSelect) return;
  const currentVal = catSelect.value || "focus";
  catSelect.innerHTML = "";
  const cats = CATEGORIES[currentLang];
  Object.keys(cats).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = cats[key];
    if (key === currentVal) opt.selected = true;
    catSelect.appendChild(opt);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  
  if ($("langBtn")) $("langBtn").textContent = lang === "ar" ? "English" : "عربي";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (I18N[lang][k]) el.textContent = I18N[lang][k];
  });

  if ($("quickTask")) $("quickTask").placeholder = I18N[lang].taskPlaceholder;
  updateCategoryDropdown();
  applyTheme(currentTheme);
  render();
}

if ($("langBtn")) {
  $("langBtn").onclick = () => setLanguage(currentLang === "ar" ? "en" : "ar");
}

let state = JSON.parse(localStorage.getItem(KEY) || "null") || {
  blocks: [
    { id: crypto.randomUUID(), date: todayKey, title: "الروتين الصباحي والتأمل", start: "07:00", end: "08:00", category: "health", done: false },
    { id: crypto.randomUUID(), date: todayKey, title: "جلسة برمجة وتطوير الواجهة", start: "08:45", end: "11:15", category: "focus", done: false },
    { id: crypto.randomUUID(), date: todayKey, title: "غداء واستراحة حركية", start: "13:00", end: "14:00", category: "break", done: false }
  ],
  tasks: [
    { id: crypto.randomUUID(), name: "تجهيز معمارية المشروع الجديد", done: false },
    { id: crypto.randomUUID(), name: "مراجعة جدول الأسبوع القادم", done: false }
  ]
};

let selectedDate = new Date();
let focusInterval = null;
let focusSeconds = 1500;

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function minutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minToTime(m) {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${pad(h)}:${pad(min)}`;
}

function dur(b) {
  return Math.max(0, minutes(b.end) - minutes(b.start));
}

function hmin(m) {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return `${h}h ${pad(r)}m`;
}

function blocksFor(key) {
  return state.blocks.filter(b => b.date === key);
}

function greeting() {
  const h = new Date().getHours();
  const t = I18N[currentLang];
  return h < 12 ? t.greetingMorning : h < 18 ? t.greetingAfternoon : t.greetingEvening;
}

function fmtDate(d) {
  return new Intl.DateTimeFormat(currentLang === "ar" ? "ar-SA" : "en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(d);
}

function showToast(msg) {
  const t = $("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("hidden"), 2200);
}

function layoutClusterBlocks(blocks) {
  if (!blocks.length) return [];
  const sorted = [...blocks].sort((a, b) => {
    const diff = minutes(a.start) - minutes(b.start);
    return diff !== 0 ? diff : dur(b) - dur(a);
  });

  const clusters = [];
  let currentCluster = [];
  let clusterEnd = -1;

  sorted.forEach(b => {
    const bStart = minutes(b.start);
    const bEnd = minutes(b.end);
    if (!currentCluster.length) {
      currentCluster.push(b);
      clusterEnd = bEnd;
    } else if (bStart < clusterEnd) {
      currentCluster.push(b);
      clusterEnd = Math.max(clusterEnd, bEnd);
    } else {
      clusters.push(currentCluster);
      currentCluster = [b];
      clusterEnd = bEnd;
    }
  });
  if (currentCluster.length) clusters.push(currentCluster);

  const result = [];
  clusters.forEach(cluster => {
    const columns = [];
    cluster.forEach(b => {
      let placed = false;
      const bStart = minutes(b.start);
      for (let i = 0; i < columns.length; i++) {
        const lastInCol = columns[i][columns[i].length - 1];
        if (minutes(lastInCol.end) <= bStart) {
          columns[i].push(b);
          b._col = i;
          placed = true;
          break;
        }
      }
      if (!placed) {
        b._col = columns.length;
        columns.push([b]);
      }
    });
    const totalCols = columns.length;
    cluster.forEach(b => {
      result.push({ block: b, col: b._col, totalCols });
    });
  });
  return result;
}

let draggedBlockId = null;
let isAltCloning = false;
let isRightDragging = false;
let rightDragBlock = null;
let rightDragGhost = null;
let didRightDragMove = false;
let startX = 0, startY = 0;
let isResizingActive = false;

// القائمة المنبثقة
const ctxMenu = $("contextMenu");
let activeContextBlock = null;

function showContextMenu(e, block) {
  e.preventDefault();
  e.stopPropagation();
  activeContextBlock = block;
  const t = I18N[currentLang];

  const doneText = $("ctxDoneText");
  const doneIcon = $("ctxDoneIcon");
  if (block.done) {
    if (doneText) doneText.textContent = t.ctxUndone;
    if (doneIcon) doneIcon.textContent = "↩️";
  } else {
    if (doneText) doneText.textContent = t.ctxDone;
    if (doneIcon) doneIcon.textContent = "✓";
  }

  if (!ctxMenu) return;
  ctxMenu.classList.remove("hidden");

  const menuWidth = 190;
  const menuHeight = 210;
  let posX = e.clientX;
  let posY = e.clientY;

  if (posX + menuWidth > window.innerWidth) posX = window.innerWidth - menuWidth - 10;
  if (posY + menuHeight > window.innerHeight) posY = window.innerHeight - menuHeight - 10;

  ctxMenu.style.left = `${posX}px`;
  ctxMenu.style.top = `${posY}px`;
}

function hideContextMenu() {
  if (ctxMenu) ctxMenu.classList.add("hidden");
  activeContextBlock = null;
}

window.addEventListener("click", (e) => {
  if (ctxMenu && !ctxMenu.contains(e.target)) hideContextMenu();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideContextMenu();
});
window.addEventListener("scroll", hideContextMenu, true);

if ($("ctxEdit")) $("ctxEdit").onclick = () => { if (activeContextBlock) openModal(activeContextBlock); hideContextMenu(); };
if ($("ctxToggleDone")) $("ctxToggleDone").onclick = () => {
  if (activeContextBlock) { activeContextBlock.done = !activeContextBlock.done; save(); render(); }
  hideContextMenu();
};
if ($("ctxFocus")) $("ctxFocus").onclick = () => { if (activeContextBlock) openFocus(activeContextBlock); hideContextMenu(); };
if ($("ctxDuplicate")) $("ctxDuplicate").onclick = () => { if (activeContextBlock) duplicateBlockById(null, activeContextBlock.id); hideContextMenu(); };
if ($("ctxDelete")) $("ctxDelete").onclick = () => {
  if (activeContextBlock) {
    const id = activeContextBlock.id;
    state.blocks = state.blocks.filter(b => b.id !== id);
    save();
    render();
    showToast(I18N[currentLang].toastDeleted);
  }
  hideContextMenu();
};

function renderTimeline() {
  const key = dateKey(selectedDate);
  const list = blocksFor(key);
  const el = $("timeline");
  if (!el) return;
  el.innerHTML = "";

  for (let h = 0; h < 24; h++) {
    const row = document.createElement("div");
    row.className = "hour";
    row.innerHTML = `<div class="hour-label">${pad(h)}:00</div><div class="hour-slot"></div>`;
    el.appendChild(row);
  }

  const layouted = layoutClusterBlocks(list);
  const isRTL = document.documentElement.dir === "rtl";
  const baseOffset = window.innerWidth <= 600 ? 66 : 84;

  layouted.forEach(({ block: b, col, totalCols }) => {
    const top = minutes(b.start);
    const height = Math.max(25, dur(b));
    const x = document.createElement("div");
    x.className = `block ${b.category} ${b.done ? "done" : ""}`;
    x.style.top = `${top}px`;
    x.style.height = `${height}px`;
    x.draggable = true;

    const widthPct = 100 / totalCols;
    const colOffsetPct = col * widthPct;

    if (isRTL) {
      x.style.right = `calc(${baseOffset}px + ${colOffsetPct}%)`;
      x.style.width = `calc(${widthPct}% - ${baseOffset / totalCols + 10}px)`;
      x.style.left = "auto";
    } else {
      x.style.left = `calc(${baseOffset}px + ${colOffsetPct}%)`;
      x.style.width = `calc(${widthPct}% - ${baseOffset / totalCols + 10}px)`;
      x.style.right = "auto";
    }

    const categoryLocalized = CATEGORIES[currentLang][b.category] || b.category;

    x.innerHTML = `
      <div class="resize-handle resize-top"></div>
      <div class="block-head-row">
        <span class="block-title">${escapeHtml(b.title)}</span>
        <button class="mobile-copy-btn" title="نسخ القالب" onclick="duplicateBlockById(event, '${b.id}')">📋</button>
      </div>
      <div class="block-meta">${b.start} — ${b.end} · ${categoryLocalized}</div>
      <div class="resize-handle resize-bottom"></div>
    `;

    initResizeHandle(x.querySelector(".resize-top"), b, "top", x);
    initResizeHandle(x.querySelector(".resize-bottom"), b, "bottom", x);

    x.addEventListener("contextmenu", (e) => {
      if (!didRightDragMove) showContextMenu(e, b);
    });

    x.onclick = () => {
      if (!didRightDragMove && !isResizingActive) openModal(b);
    };
    x.ondblclick = () => openFocus(b);

    x.addEventListener("dragstart", (e) => {
      if (isResizingActive) { e.preventDefault(); return; }
      draggedBlockId = b.id;
      isAltCloning = e.altKey;
      x.classList.add("dragging");
      e.dataTransfer.setData("text/plain", b.id);
    });

    x.addEventListener("dragend", () => {
      draggedBlockId = null;
      isAltCloning = false;
      x.classList.remove("dragging");
      el.classList.remove("drag-active");
    });

    x.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
        isRightDragging = true;
        didRightDragMove = false;
        rightDragBlock = b;
        startX = e.clientX;
        startY = e.clientY;
      }
    });

    el.appendChild(x);
  });

  el.ondragover = (e) => { e.preventDefault(); el.classList.add("drag-active"); };
  el.ondragleave = () => el.classList.remove("drag-active");

  el.ondrop = (e) => {
    e.preventDefault();
    el.classList.remove("drag-active");
    if (!draggedBlockId) return;

    const b = state.blocks.find(x => x.id === draggedBlockId);
    if (!b) return;

    const timelineRect = el.getBoundingClientRect();
    const dropY = e.clientY - timelineRect.top;
    let newStartMin = Math.round(dropY / 15) * 15;
    const duration = dur(b);
    newStartMin = Math.max(0, Math.min(1440 - duration, newStartMin));
    const newEndMin = newStartMin + duration;

    if (isAltCloning) {
      const cloned = { ...b, id: crypto.randomUUID(), start: minToTime(newStartMin), end: minToTime(newEndMin), date: dateKey(selectedDate) };
      state.blocks.push(cloned);
      showToast(I18N[currentLang].toastCloned);
    } else {
      b.start = minToTime(newStartMin);
      b.end = minToTime(newEndMin);
      b.date = dateKey(selectedDate);
    }

    save();
    render();
  };

  addNowLine(el, key);
}

function initResizeHandle(handle, block, position, blockElement) {
  if (!handle) return;
  handle.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    e.preventDefault();
    isResizingActive = true;
    handle.classList.add("active");
    blockElement.classList.add("resizing");
    blockElement.draggable = false;

    const initialY = e.clientY;
    const initialStart = minutes(block.start);
    const initialEnd = minutes(block.end);
    let currentStart = initialStart;
    let currentEnd = initialEnd;

    const metaLabel = blockElement.querySelector(".block-meta");
    const categoryLocalized = CATEGORIES[currentLang][block.category] || block.category;

    function onPointerMove(moveEvent) {
      const deltaY = moveEvent.clientY - initialY;
      const deltaMinutes = Math.round(deltaY / 15) * 15;

      if (position === "top") {
        currentStart = Math.max(0, Math.min(initialEnd - 15, initialStart + deltaMinutes));
        blockElement.style.top = `${currentStart}px`;
        blockElement.style.height = `${initialEnd - currentStart}px`;
        if (metaLabel) metaLabel.textContent = `${minToTime(currentStart)} — ${minToTime(initialEnd)} · ${categoryLocalized}`;
      } else {
        currentEnd = Math.max(initialStart + 15, Math.min(1440, initialEnd + deltaMinutes));
        blockElement.style.height = `${currentEnd - initialStart}px`;
        if (metaLabel) metaLabel.textContent = `${minToTime(initialStart)} — ${minToTime(currentEnd)} · ${categoryLocalized}`;
      }
    }

    function onPointerUp() {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      handle.classList.remove("active");
      blockElement.classList.remove("resizing");
      blockElement.draggable = true;

      block.start = minToTime(currentStart);
      block.end = minToTime(currentEnd);
      save();
      render();
      showToast(I18N[currentLang].toastResized);

      setTimeout(() => { isResizingActive = false; }, 120);
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  });
}

window.addEventListener("mousemove", (e) => {
  if (!isRightDragging || !rightDragBlock) return;
  const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
  if (dist > 6) {
    didRightDragMove = true;
    hideContextMenu();
    if (!rightDragGhost) {
      rightDragGhost = document.createElement("div");
      rightDragGhost.className = "right-drag-ghost";
      rightDragGhost.textContent = `📋 ${rightDragBlock.title} (${currentLang === "ar" ? "نسخة" : "copy"})`;
      document.body.appendChild(rightDragGhost);
    }
    rightDragGhost.style.left = `${e.clientX}px`;
    rightDragGhost.style.top = `${e.clientY}px`;
  }
});

window.addEventListener("mouseup", (e) => {
  if (e.button === 2 && isRightDragging) {
    if (didRightDragMove && rightDragBlock) {
      const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
      const timelineEl = dropTarget?.closest("#timeline");
      const weekDayCol = dropTarget?.closest(".week-day");

      if (timelineEl) {
        const rect = timelineEl.getBoundingClientRect();
        const dropY = e.clientY - rect.top;
        const duration = dur(rightDragBlock);
        let newStartMin = Math.max(0, Math.min(1440 - duration, Math.round(dropY / 15) * 15));
        const newEndMin = newStartMin + duration;

        const clone = {
          ...rightDragBlock,
          id: crypto.randomUUID(),
          start: minToTime(newStartMin),
          end: minToTime(newEndMin),
          date: dateKey(selectedDate)
        };
        state.blocks.push(clone);
        save();
        render();
        showToast(I18N[currentLang].toastCloned);
      } else if (weekDayCol) {
        const targetDate = weekDayCol.getAttribute("data-date");
        if (targetDate) {
          const clone = { ...rightDragBlock, id: crypto.randomUUID(), date: targetDate };
          state.blocks.push(clone);
          save();
          render();
          showToast(I18N[currentLang].toastCloned);
        }
      }
    }

    if (rightDragGhost) { rightDragGhost.remove(); rightDragGhost = null; }
    isRightDragging = false;
  }
});

window.addEventListener("contextmenu", (e) => {
  if (didRightDragMove) {
    e.preventDefault();
    didRightDragMove = false;
  }
});

function duplicateBlockById(e, id) {
  if (e) e.stopPropagation();
  const b = state.blocks.find(x => x.id === id);
  if (!b) return;

  const duration = dur(b);
  let newStart = minutes(b.end);
  if (newStart + duration > 1440) newStart = 0;
  const newEnd = newStart + duration;

  const clone = { ...b, id: crypto.randomUUID(), start: minToTime(newStart), end: minToTime(newEnd), date: dateKey(selectedDate) };
  state.blocks.push(clone);
  save();
  render();
  showToast(I18N[currentLang].toastCloned);
}

if ($("duplicateBlockBtn")) {
  $("duplicateBlockBtn").onclick = () => {
    const currentId = $("blockId").value;
    if (currentId) { duplicateBlockById(null, currentId); closeModal(); }
  };
}

function addNowLine(el, key) {
  if (key !== todayKey) return;
  const now = new Date();
  const y = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  const line = document.createElement("div");
  line.className = "now-line";
  line.style.top = `${y}px`;
  line.innerHTML = '<span class="now-dot"></span>';
  el.appendChild(line);
}

function renderStats() {
  const list = blocksFor(dateKey(selectedDate));
  const planned = list.reduce((s, b) => s + dur(b), 0);
  const done = list.filter(b => b.done).reduce((s, b) => s + dur(b), 0);
  const focus = list.filter(b => b.category === "focus").reduce((s, b) => s + dur(b), 0);
  const t = I18N[currentLang];

  if ($("plannedTime")) $("plannedTime").textContent = hmin(planned);
  if ($("focusTime")) $("focusTime").textContent = hmin(focus);
  if ($("doneTime")) $("doneTime").textContent = hmin(done);
  if ($("freeTime")) $("freeTime").textContent = hmin(1440 - planned);

  const rate = list.length ? Math.round((list.filter(b => b.done).length / list.length) * 100) : 0;
  if ($("progressValue")) $("progressValue").textContent = `${rate}%`;
  if ($("progressText")) $("progressText").textContent = `${list.filter(b => b.done).length} / ${list.length} ${t.doneSuffix}`;
  if ($("progressRing")) $("progressRing").style.background = `conic-gradient(var(--accent) ${rate * 3.6}deg, var(--line) 0deg)`;
  if ($("greeting")) $("greeting").textContent = greeting();

  if ($("daySummary")) {
    $("daySummary").textContent = list.length
      ? `${list.length} ${currentLang === "ar" ? (list.length === 1 ? "قالب مجدول" : "قوالب مجدولة") : "blocks scheduled"} · ${hmin(planned)} ${t.statPlanned}.`
      : t.emptyDaySummary;
  }
}

function renderSidePanel() {
  const key = dateKey(selectedDate);
  const list = blocksFor(key).sort((a, b) => minutes(a.start) - minutes(b.start));
  const d = new Date(selectedDate);
  const t = I18N[currentLang];

  if ($("panelDate")) {
    $("panelDate").textContent = d.toLocaleDateString(currentLang === "ar" ? "ar-SA" : "en-US", { weekday: "long", month: "short", day: "numeric" });
  }

  const next = list.find(b => !b.done && minutes(b.end) > minutes(new Date().toTimeString().slice(0, 5)));
  if (next) {
    const catName = CATEGORIES[currentLang][next.category] || next.category;
    if ($("nextTitle")) $("nextTitle").textContent = next.title;
    if ($("nextMeta")) $("nextMeta").textContent = `${next.start} — ${next.end} · ${catName}`;
  } else if (list.length) {
    if ($("nextTitle")) $("nextTitle").textContent = t.allClear;
    if ($("nextMeta")) $("nextMeta").textContent = t.noUpcoming;
  } else {
    if ($("nextTitle")) $("nextTitle").textContent = t.nothingScheduled;
    if ($("nextMeta")) $("nextMeta").textContent = t.addBlockToStart;
  }
}

function renderWeek() {
  const grid = $("weekGrid");
  if (!grid) return;
  grid.innerHTML = "";
  const base = new Date(selectedDate);
  base.setHours(0, 0, 0, 0);
  base.setDate(base.getDate() - (base.getDay() === 0 ? 6 : base.getDay() - 1));

  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const key = dateKey(d);
    const list = blocksFor(key);

    const col = document.createElement("div");
    col.className = "week-day";
    col.setAttribute("data-date", key);

    col.innerHTML = `
      <div class="week-day-head">
        <small>${d.toLocaleDateString(currentLang === "ar" ? "ar-SA" : "en-US", { weekday: "short" }).toUpperCase()}</small>
        <strong>${d.getDate()}</strong>
      </div>
    `;

    col.ondragover = (e) => { e.preventDefault(); col.classList.add("drag-over"); };
    col.ondragleave = () => col.classList.remove("drag-over");

    col.ondrop = (e) => {
      e.preventDefault();
      col.classList.remove("drag-over");
      if (!draggedBlockId) return;

      const b = state.blocks.find(x => x.id === draggedBlockId);
      if (b) {
        if (isAltCloning) {
          const clone = { ...b, id: crypto.randomUUID(), date: key };
          state.blocks.push(clone);
          showToast(I18N[currentLang].toastCloned);
        } else {
          b.date = key;
        }
        save();
        render();
      }
    };

    list.sort((a, b) => minutes(a.start) - minutes(b.start)).forEach(b => {
      const x = document.createElement("div");
      x.className = "week-block";
      x.draggable = true;
      x.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b>${escapeHtml(b.title)}</b>
          <button class="mobile-copy-btn" onclick="duplicateBlockById(event, '${b.id}')">📋</button>
        </div>
        <span>${b.start}–${b.end}</span>
      `;

      x.addEventListener("contextmenu", (e) => {
        if (!didRightDragMove) showContextMenu(e, b);
      });

      x.onclick = () => openModal(b);

      x.addEventListener("dragstart", (e) => {
        draggedBlockId = b.id;
        isAltCloning = e.altKey;
        x.classList.add("dragging");
        e.dataTransfer.setData("text/plain", b.id);
      });

      x.addEventListener("dragend", () => {
        draggedBlockId = null;
        isAltCloning = false;
        x.classList.remove("dragging");
      });

      x.addEventListener("mousedown", (e) => {
        if (e.button === 2) {
          isRightDragging = true;
          didRightDragMove = false;
          rightDragBlock = b;
          startX = e.clientX;
          startY = e.clientY;
        }
      });

      col.appendChild(x);
    });

    col.ondblclick = (e) => {
      if (e.target === col) openModal(null, key);
    };

    grid.appendChild(col);
  }
}

function renderTasks() {
  const el = $("taskList");
  if (!el) return;
  el.innerHTML = "";

  state.tasks.forEach(t => {
    const row = document.createElement("div");
    row.className = `task-row ${t.done ? "done" : ""}`;
    row.innerHTML = `
      <input type="checkbox" ${t.done ? "checked" : ""}>
      <span class="task-name">${escapeHtml(t.name)}</span>
      <button class="task-delete">×</button>
    `;

    row.querySelector("input").onchange = (e) => {
      t.done = e.target.checked;
      save();
      renderTasks();
    };

    row.querySelector(".task-delete").onclick = () => {
      state.tasks = state.tasks.filter(x => x.id !== t.id);
      save();
      renderTasks();
    };

    el.appendChild(row);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[c]));
}

function openModal(b = null, date = dateKey(selectedDate)) {
  const t = I18N[currentLang];
  if ($("modalBackdrop")) $("modalBackdrop").classList.remove("hidden");
  if ($("modalTitle")) $("modalTitle").textContent = b ? t.modalEditTitle : t.modalAddTitle;
  if ($("deleteBlock")) $("deleteBlock").classList.toggle("hidden", !b);
  if ($("duplicateBlockBtn")) $("duplicateBlockBtn").classList.toggle("hidden", !b);

  if ($("blockId")) $("blockId").value = b?.id || "";
  if ($("blockTitle")) $("blockTitle").value = b?.title || "";
  if ($("blockDate")) $("blockDate").value = b?.date || date;
  if ($("blockStart")) $("blockStart").value = b?.start || "09:00";
  if ($("blockEnd")) $("blockEnd").value = b?.end || "10:00";
  if ($("blockCategory")) $("blockCategory").value = b?.category || "focus";
  if ($("blockDone")) $("blockDone").checked = !!b?.done;
}

function closeModal() {
  if ($("modalBackdrop")) $("modalBackdrop").classList.add("hidden");
}

if ($("blockForm")) {
  $("blockForm").onsubmit = (e) => {
    e.preventDefault();
    const id = $("blockId").value || crypto.randomUUID();
    const item = {
      id,
      date: $("blockDate").value,
      title: $("blockTitle").value.trim(),
      start: $("blockStart").value,
      end: $("blockEnd").value,
      category: $("blockCategory").value,
      done: $("blockDone").checked
    };

    if (!item.title || minutes(item.end) <= minutes(item.start)) {
      alert(I18N[currentLang].alertValid);
      return;
    }

    const idx = state.blocks.findIndex(b => b.id === id);
    if (idx >= 0) state.blocks[idx] = item;
    else state.blocks.push(item);

    save();
    closeModal();
    render();
  };
}

if ($("deleteBlock")) {
  $("deleteBlock").onclick = () => {
    const id = $("blockId").value;
    state.blocks = state.blocks.filter(b => b.id !== id);
    save();
    closeModal();
    render();
    showToast(I18N[currentLang].toastDeleted);
  };
}

if ($("closeModal")) $("closeModal").onclick = closeModal;
if ($("cancelModal")) $("cancelModal").onclick = closeModal;
if ($("panelAdd")) $("panelAdd").onclick = () => openModal();
if ($("weekAddBtn")) $("weekAddBtn").onclick = () => openModal();
if ($("taskAddBtn")) $("taskAddBtn").onclick = () => $("quickTask").focus();

if ($("quickAdd")) $("quickAdd").onclick = addTask;
if ($("quickTask")) {
  $("quickTask").onkeydown = (e) => { if (e.key === "Enter") addTask(); };
}

function addTask() {
  const n = $("quickTask").value.trim();
  if (!n) return;
  state.tasks.push({ id: crypto.randomUUID(), name: n, done: false });
  $("quickTask").value = "";
  save();
  renderTasks();
}

// التحكم في التنقل وإغلاق القائمة الجانبية على الجوال
const backdrop = $("sidebarBackdrop");
document.querySelectorAll(".nav-item[data-view]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".nav-item[data-view]").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
    const target = $(`${btn.dataset.view}View`);
    if (target) target.classList.remove("hidden");
    if ($("sidebar")) $("sidebar").classList.remove("open");
    if (backdrop) backdrop.classList.add("hidden");
  };
});

if ($("prevDay")) $("prevDay").onclick = () => { selectedDate.setDate(selectedDate.getDate() - 1); render(); };
if ($("nextDay")) $("nextDay").onclick = () => { selectedDate.setDate(selectedDate.getDate() + 1); render(); };
if ($("todayBtn")) $("todayBtn").onclick = () => { selectedDate = new Date(); render(); };

// زر القائمة للجوال مع إغلاق الخلفية
if ($("menuBtn")) {
  $("menuBtn").onclick = () => {
    const sidebar = $("sidebar");
    if (!sidebar) return;
    sidebar.classList.toggle("open");
    if (backdrop) backdrop.classList.toggle("hidden", !sidebar.classList.contains("open"));
  };
}

if (backdrop) {
  backdrop.onclick = () => {
    if ($("sidebar")) $("sidebar").classList.remove("open");
    backdrop.classList.add("hidden");
  };
}

function updateClock() {
  const n = new Date();
  if ($("liveClock")) $("liveClock").textContent = `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
  if ($("panelTime")) $("panelTime").textContent = `${pad(n.getHours())}:${pad(n.getMinutes())}`;

  if (dateKey(n) === dateKey(selectedDate)) {
    const line = document.querySelector(".now-line");
    if (line) line.style.top = `${n.getHours() * 60 + n.getMinutes() + n.getSeconds() / 60}px`;
  }
}

function openFocus(b) {
  if ($("focusOverlay")) $("focusOverlay").classList.remove("hidden");
  if ($("focusTitle")) $("focusTitle").textContent = b.title;
  focusSeconds = 25 * 60;
  renderFocus();
  clearInterval(focusInterval);
}

function renderFocus() {
  if ($("focusTimer")) $("focusTimer").textContent = `${pad(Math.floor(focusSeconds / 60))}:${pad(focusSeconds % 60)}`;
}

if ($("focusStart")) {
  $("focusStart").onclick = () => {
    const t = I18N[currentLang];
    if (focusInterval) {
      clearInterval(focusInterval);
      focusInterval = null;
      $("focusStart").textContent = t.start;
    } else {
      focusInterval = setInterval(() => {
        focusSeconds--;
        renderFocus();
        if (focusSeconds <= 0) {
          clearInterval(focusInterval);
          focusInterval = null;
          alert(t.alertFocusDone);
        }
      }, 1000);
      $("focusStart").textContent = t.pause;
    }
  };
}

if ($("focusReset")) {
  $("focusReset").onclick = () => {
    clearInterval(focusInterval);
    focusInterval = null;
    focusSeconds = 25 * 60;
    renderFocus();
    if ($("focusStart")) $("focusStart").textContent = I18N[currentLang].start;
  };
}

if ($("closeFocus")) {
  $("closeFocus").onclick = () => {
    clearInterval(focusInterval);
    focusInterval = null;
    if ($("focusOverlay")) $("focusOverlay").classList.add("hidden");
  };
}

function render() {
  if ($("dateLabel")) $("dateLabel").textContent = fmtDate(selectedDate);
  if ($("timezoneLabel")) $("timezoneLabel").textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
  renderTimeline();
  renderStats();
  renderWeek();
  renderTasks();
  renderSidePanel();
  updateClock();
}

setInterval(updateClock, 1000);
applyTheme(currentTheme);
setLanguage(currentLang);