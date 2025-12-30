import { updateDate, updateDateValue, setUpdateDateValue, pickDate } from "./dateHandler.js";
import { openDialog, closeDialog, dialogKeyboardShortcuts } from "./dialog.js";
import { addTodo, addPomodoroTimer, copyToClipboard } from "./buttonFunctions.js";
import { addCardFromForm } from "./formHandler.js"

const initButtonHandlers = function () {
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
      case "goToNextDay":
        setUpdateDateValue(1);
        updateDate(updateDateValue);
        break;
      case "goToPrevDay":
        setUpdateDateValue(-1);
        updateDate(updateDateValue);
        break;
      default:
        console.log("No handler for this action");
    }
  });

  dialogKeyboardShortcuts();

  const form = document.getElementById("taskForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addCardFromForm(form);
  });
};

export default initButtonHandlers;
