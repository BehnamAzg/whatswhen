const initButtonHandlers = function () {
  const pickDate = (id) => {
    const input = document.getElementById(id);
    if (input.showPicker) input.showPicker();
    else input.focus();
  };

  const openDialog = (id) => {
    const dialog = document.getElementById(id);
    dialog.open ? dialog.close() : dialog.showModal();
  };

  const closeDialog = (btn) => {
    const dialog = btn.closest("dialog");
    if (dialog) dialog.close();
  };

  const addTodo = (templateID, targetId) => {
    const clone = document.getElementById(templateID).content.cloneNode(true);
    const todoList = document.getElementById(targetId);
    if (todoList.classList.contains("hidden")) todoList.classList.remove("hidden");
    if (!todoList.classList.contains("todo-list")) todoList.classList.add("todo-list");
    todoList.appendChild(clone);
  };

  const addPomodoroTimer = (targetId, btn) => {
    const addPomodoroTimerBtn = document.getElementById(btn);
    const pomodoroTimer = document.getElementById(targetId);
    pomodoroTimer.classList.toggle("hidden");
    pomodoroTimer.classList.toggle("flex");
    addPomodoroTimerBtn.classList.toggle("bg-primary");
    addPomodoroTimerBtn.classList.toggle("text-white");
  };

  const copyToClipboard = async (targetId) => {
    const copiedMsg = document.getElementById("copiedMessage");
    const textEl = document.getElementById(targetId);
    const text = textEl.innerText;
    await navigator.clipboard.writeText(text);
    copiedMsg.style.opacity = 1;
    setTimeout(() => {
      copiedMsg.style.opacity = 0;
    }, 1500);
  };

  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;
    const btn = e.target.closest("button");
    if (!(btn instanceof HTMLElement)) return;
    const action = btn.dataset.action;

    switch (action) {
      case "datePicker":
        pickDate("datePickerInput");
        break;
      case "openNewTask":
        openDialog("newTaskDialog");
        break;
      case "openMenu":
        openDialog("menuDialog");
        break;
      case "closeDialog":
        closeDialog(btn);
        break;
      case "addTodo":
        addTodo("addTodoTemplate", "todoList");
        break;
      case "addPomodoroTimer":
        addPomodoroTimer("pomodoroTimer", "addPomodoroTimerBtn");
        break;
      case "copyToClipboard":
        copyToClipboard("version");
        break;
      default:
        console.log("No handler for this action");
    }
  });

  // Open Task Dialog - Keyboard Shortcut
  document.addEventListener("keydown", (event) => {
    if (event.key === "n" || event.key === "N") {
      // Plain N
      if (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        event.preventDefault();
        openDialog("newTaskDialog");
      }
    }
  });

  // Open Menu Dialog - Keyboard Shortcut
  document.addEventListener("keydown", (event) => {
    if (event.key === "m" || event.key === "M") {
      if (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        event.preventDefault();
        openDialog("menuDialog");
      }
    }
  });
};

export default initButtonHandlers;
