export const addTodo = (templateID, targetId) => {
  const clone = document.getElementById(templateID).content.cloneNode(true);
  const todoList = document.getElementById(targetId);
  if (todoList.classList.contains("hidden")) todoList.classList.remove("hidden");
  if (!todoList.classList.contains("todo-list")) todoList.classList.add("todo-list");
  todoList.appendChild(clone);
};

export const addPomodoroTimer = (targetId, btn) => {
  const addPomodoroTimerBtn = document.getElementById(btn);
  const pomodoroTimer = document.getElementById(targetId);
  pomodoroTimer.classList.toggle("hidden");
  pomodoroTimer.classList.toggle("flex");
  addPomodoroTimerBtn.classList.toggle("bg-primary");
  addPomodoroTimerBtn.classList.toggle("text-white");
};

export const copyToClipboard = async (targetId) => {
  const copiedMsg = document.getElementById("copiedMessage");
  const textEl = document.getElementById(targetId);
  const text = textEl.innerText;
  await navigator.clipboard.writeText(text);
  copiedMsg.style.opacity = 1;
  setTimeout(() => {
    copiedMsg.style.opacity = 0;
  }, 1500);
};
