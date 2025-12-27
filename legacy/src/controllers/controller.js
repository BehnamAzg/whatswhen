function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").textContent = `${h}:${m}`;
}

// ── Calculate the delay until the next minute starts ───────────────────────
function startClock() {
  updateClock();
  const now = new Date();
  const msUntilNextMinute = (60 - now.getSeconds()) * 1000;
  // ── Start minute interval exactly at the next minute ─────────────────────
  setTimeout(() => {
    updateClock();
    setInterval(updateClock, 60_000);
  }, msUntilNextMinute);
}
startClock();

// ───────────────────────────────────────────────────────────────────────────

function updateDate() {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const date = String(now.getDate()).padStart(2, "0");
  const month = now.toLocaleDateString("en-US", { month: "short" });
  document.getElementById("day").textContent = day;
  document.getElementById("date").textContent = date;
  document.getElementById("month").textContent = month;
}
updateDate();

// ───────────────────────────────────────────────────────────────────────────

const cards = document.querySelectorAll(".card-container .card");
let activeCard = 0;

function setupCards() {
  cards.forEach((card, index) => {
    card.style.top = "100%";
    card.style.scale = "92%";
  });

  if (activeCard !== 0) {
    const prev = cards[activeCard - 1];
    prev.style.top = "0%";
  }

  const active = cards[activeCard];
  active.style.top = "14.5%";
  active.style.scale = "100%";

  if (activeCard < cards.length - 1) {
    const next = cards[activeCard + 1];
    next.style.top = "86%";
  }
}
setupCards();

// ───────────────────────────────────────────────────────────────────────────

function nextCard() {
  if (activeCard < cards.length - 1) {
    activeCard++;
    setupCards();
  }
}

function prevCard() {
  if (activeCard > 0) {
    activeCard--;
    setupCards();
  }
}

function isModalOpen() {
  return document.querySelector("dialog[open]") !== null;
}

// ───────────────────────────────────────────────────────────────────────────

window.addEventListener("wheel", (e) => {
  if (isModalOpen()) return;
  if (e.deltaY > 0) {
    nextCard();
  } else if (e.deltaY < 0) {
    prevCard();
  }
});

document.addEventListener("keydown", (event) => {
  if (isModalOpen()) return;
  switch (event.key) {
    case "ArrowUp":
    case "w":
      prevCard();
      break;
    case "ArrowDown":
    case "s":
      nextCard();
      break;
  }
});

// ───────────────────────────────────────────────────────────────────────────

let startY = 0;
let threshold = 50;

window.addEventListener("touchstart", (e) => {
  if (isModalOpen()) return;
  startY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  if (isModalOpen()) return;
  const currentY = e.touches[0].clientY;
  const diff = currentY - startY;

  if (Math.abs(diff) > threshold) {
    if (diff < 0) {
      nextCard();
    } else {
      prevCard();
    }
    startY = currentY; // update after reacting
  }
});

// ───────────────────────────────────────────────────────────────────────────

const datePickerBtn = document.getElementById("datePickerBtn");
datePickerBtn.addEventListener("click", () => {
  const input = document.getElementById("datePickerInput");
  if (input.showPicker) input.showPicker();
  else input.focus();
});

// ───────────────────────────────────────────────────────────────────────────

// Open Dialog
document.querySelectorAll(".open-dialog").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dialogs = document.querySelectorAll("dialog");
    const index = parseInt(btn.dataset.target);
    dialogs[index].showModal();
  });
});

// Close Dialog
document.querySelectorAll(".close-dialog").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dialog = btn.closest("dialog"); // get the parent dialog
    if (dialog) dialog.close();
  });
});

// ───────────────────────────────────────────────────────────────────────────

// Open Task Dialog - Keyboard Shortcut
document.addEventListener("keydown", (event) => {
  if (event.key === "n" || event.key === "N") {
    // Plain N
    if (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      event.preventDefault();
      const dialog = document.getElementById("taskDialog");
      dialog.open ? dialog.close() : dialog.showModal();
    }
  }
});

// Open Menu Dialog - Keyboard Shortcut
document.addEventListener("keydown", (event) => {
  if (event.key === "m" || event.key === "M") {
    if (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      event.preventDefault();
      const dialog = document.getElementById("menuDialog");
      dialog.open ? dialog.close() : dialog.showModal();
    }
  }
});

// ───────────────────────────────────────────────────────────────────────────

const cardsData = [
  {
    id: "01",
    startsAt: "2025-12-13T06:00:00",
    title: "Morning Routine",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    meta: {
      icon: "🌞",
      color: "#fdc742",
      tag: "Personal",
    },
    reminder: true,
    repeat: {
      type: "weekly", // none | daily | weekly | monthly | yearly
      interval: 1, // every 1 week
      days: [1, 3, 6], // Mon, Wed, Sat (0 = Sun)
      endsAt: null, // or "2026-01-01"
    },
    todos: [
      { text: "This is todo 1", done: true },
      { text: "This is todo 2", done: false },
      { text: "This is todo 3", done: false },
    ],
    exceptions: {
      "2025-12-17": {
        startsAt: "2025-12-17T20:00:00",
      },
      "2025-12-16": {
        cancelled: true,
      },
    },
    createdAt: Date.now(),
  },
  {
    id: "01",
    startsAt: "2025-12-13T06:00:00",
    title: "Morning Routine",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    meta: {
      icon: "🌞",
      color: "#fdc742",
      tag: "Personal",
    },
    reminder: true,
    repeat: {
      type: "weekly", // none | daily | weekly | monthly | yearly
      interval: 1, // every 1 week
      days: [1, 3, 6], // Mon, Wed, Sat (0 = Sun)
      endsAt: null, // or "2026-01-01"
    },
    todos: [
      { text: "This is todo 1", done: true },
      { text: "This is todo 2", done: false },
      { text: "This is todo 3", done: false },
    ],
    exceptions: {
      "2025-12-17": {
        startsAt: "2025-12-17T20:00:00",
      },
      "2025-12-16": {
        cancelled: true,
      },
    },
    createdAt: Date.now(),
  },
];

cardsData.sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));

const date = new Date(cardsData.startsAt);
const hour = date.getHours();
const minute = date.getMinutes();

// ── Days Select State Logic ────────────────────────────────────────────────
const once = document.querySelector('[data-role="once"]');
const everyDay = document.querySelector('[data-role="everyday"]');
const days = Array.from(document.querySelectorAll('[data-role="day"]'));

function checkedDays() {
  return days.filter((d) => d.checked);
}

function updateState(source) {
  const checked = checkedDays();

  // ── Once clicked ─────────────────────────────────────────────────────────
  if (source === once) {
    if (!once.checked && checked.length === 0) {
      // Once cannot be unchecked if nothing else is checked
      once.checked = true;
      return;
    }

    if (once.checked) {
      everyDay.checked = false;
      days.forEach((d) => (d.checked = false));
    }
  }

  // ── Every Day clicked ────────────────────────────────────────────────────
  if (source === everyDay) {
    if (everyDay.checked) {
      once.checked = false;
      days.forEach((d) => (d.checked = true));
    } else {
      days.forEach((d) => (d.checked = false));
      once.checked = true;
    }
  }

  // ── Any day clicked ──────────────────────────────────────────────────────
  if (source?.dataset.role === "day") {
    if (checked.length > 0) {
      once.checked = false;
    }

    if (checked.length === 0) {
      once.checked = true;
    }

    everyDay.checked = checked.length === days.length;
  }
}

// Attach listeners
[once, everyDay, ...days].forEach((input) => {
  input.addEventListener("change", () => updateState(input));
});

// ── Colors Select State Logic ──────────────────────────────────────────────

const container = document.getElementById("colorPicker");
const radios = container.querySelectorAll('input[type="radio"]');
const customInput = document.getElementById("customColor");
const customDot = document.getElementById("customDot");

container.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();

    const span = e.target;
    const input = span.previousElementSibling;

    if (!input) return;

    if (input.type === "color") {
      // activate custom color
      radios.forEach((r) => (r.checked = false)); // deselect all radios
      customDot.classList.add("ring-2", "ring-primary");
      customDot.style.backgroundColor = input.value;
      input.focus(); // optional: opens native color picker
    } else {
      // preset radio
      input.checked = true;

      // deselect custom color
      applyDefaultCustomColor();
      customDot.classList.remove("ring-2", "ring-primary");
    }

    // optionally trigger change/input events if you rely on listeners
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }
});

// When a radio is selected → clear custom color
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    applyDefaultCustomColor();
    customDot.classList.remove("ring-2", "ring-primary");
  });
});

function isLight(hex) {
  const [r, g, b] = hex
    .slice(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

function applyDefaultCustomColor() {
  const color = customInput.value;
  customDot.style.backgroundColor = color;
  customDot.classList.toggle("text-primary", isLight(color));
  customDot.classList.toggle("text-white", !isLight(color));
}

// When custom color changes
customInput.addEventListener("input", () => {
  // Uncheck all radios
  radios.forEach((r) => (r.checked = false));
  // Update dot color
  applyDefaultCustomColor();
  // Visual selected state
  customDot.classList.add("ring-2", "ring-primary");
});

function getSelectedColor() {
  const checked = [...radios].find((r) => r.checked);
  return checked ? checked.value : customInput.value;
}

/*
  saveButton.addEventListener("click", () => {
    const color = getSelectedColor();

    console.log(color);
    // example:
    // bg-amber-300/40
    // or #694cf1
  });
*/

// ───────────────────────────────────────────────────────────────────────────

const addTodoBtn = document.getElementById("addTodoBtn");
addTodoBtn.addEventListener("click", () => {
  const clone = document.getElementById("addTodoTemplate").content.cloneNode(true);
  const todoList = document.getElementById("todoList");
  if (todoList.classList.contains("hidden")) todoList.classList.remove("hidden");
  if (!todoList.classList.contains("todo-list")) todoList.classList.add("todo-list");
  todoList.appendChild(clone);
});

const addPomodoroTimerBtn = document.getElementById("addPomodoroTimerBtn");
addPomodoroTimerBtn.addEventListener("click", () => {
  const pomodoroTimer = document.getElementById("pomodoroTimer");
  pomodoroTimer.classList.toggle("hidden");
  pomodoroTimer.classList.toggle("flex");
  addPomodoroTimerBtn.classList.toggle("bg-white/50");
  addPomodoroTimerBtn.classList.toggle("bg-primary");
  addPomodoroTimerBtn.classList.toggle("text-neutral-800");
  addPomodoroTimerBtn.classList.toggle("text-white");
});

// ───────────────────────────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────────────────────────

// repeat: {
//   type: "daily",
//   interval: 1
// }

// repeat: {
//   type: "weekly",
//   interval: 1,
//   days: [1, 3, 6] // Mon, Wed, Sat
// }

// repeat: {
//   type: "monthly",
//   interval: 1,
//   dayOfMonth: 13
// }

// repeat: {
//   type: "yearly",
//   interval: 1,
//   month: 11, // December (0-based)
//   day: 13
// }

/* 
function getTasksForDay(date, tasks) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date(dayStart);
  dayEnd.setHours(23, 59, 59, 999);

  return tasks
    .filter(task => {
      const t = new Date(task.startsAt);
      return t >= dayStart && t <= dayEnd;
    })
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
}

const todayTasks = getTasksForDay("2025-12-13", cardsData);
*/

/*
tasks[]              ← all data
  |
  |— filter by date
  |— expand repeats
  |— sort by startsAt
  ↓
render cards
*/

/*
// Step 1: helper
function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Step 2: “Does this task occur today?”
function taskOccursOnDate(task, date) {
  const taskDate = new Date(task.startsAt);

  // non-repeating task
  if (!task.repeat) {
    return isSameDay(taskDate, date);
  }

  // repeating task
  if (task.repeat.type === "weekly") {
    const weekday = date.getDay(); // 0–6
    return (
      date >= taskDate &&
      task.repeat.days.includes(weekday)
    );
  }

  return false;
}

// Step 3: get all tasks for a day
function getTasksForDay(date, tasks) {
  return tasks
    .filter(task => taskOccursOnDate(task, date))
    .map(task => ({
      ...task,
      // override time for rendering if needed
      startsAt: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        new Date(task.startsAt).getHours(),
        new Date(task.startsAt).getMinutes()
      )
    }))
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
}

*/

// Key sentence to remember (this will click)
// Tasks don’t live on dates.
// Dates ask tasks if they belong there.

// Rules are immutable.
// Occurrences are flexible.

// Rule = permanent
// Exception = local override
// Occurrence = temporary

/*
4️⃣ Key concept: “virtual occurrences”
Repeating tasks do not physically exist per day.
Instead:
Each day asks the rule:
“Do you produce an occurrence for me?”
If yes → the app creates a temporary object
That temporary object is called an occurrence.

5️⃣ What is an exception?
An exception answers this question:
“When this rule produces an occurrence on a specific date, should it be altered or skipped?”
So instead of changing the rule, you say:
“On THIS date, do something different.”
*/

/*
function getOccurrence(task, date) {
  const key = date.toISOString().slice(0, 10);
  const exception = task.exceptions?.[key];

  if (exception?.cancelled) return null;

  const baseTime = new Date(task.startsAt);
  const time = exception?.startsAt
    ? new Date(exception.startsAt)
    : baseTime;

  return {
    ...task,
    startsAt: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    )
  };
}

*/

// Delete:
// ◉ This occurrence
// ◯ All occurrences

/*
function deleteSingleOccurrence(task, date) {
  const key = date.toISOString().slice(0, 10);

  task.exceptions ??= {};
  task.exceptions[key] = { cancelled: true };
}

*/

// 8️⃣ Undo support (free benefit)
// If user hits “Undo”:
// delete task.exceptions["2025-12-17"];

// IndexedDB
// 5️⃣ Minimal IndexedDB setup (simple)
// Use a helper library — don’t write raw IndexedDB unless you enjoy pain.
// Recommended library
// npm install idb

/*
npm install idb

import { openDB } from "idb";

export const db = await openDB("scheduleApp", 1, {
  upgrade(db) {
    const store = db.createObjectStore("tasks", { keyPath: "id" });
    store.createIndex("startsAt", "startsAt");
  }
});


// Add a task:
await db.put("tasks", task);

// Get all tasks:
const tasks = await db.getAll("tasks");
*/

// const settings = {
//   theme: "dark",
//   language: "en",
//   notifications: true
// };
