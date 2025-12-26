const pickDate = (id) => {
  const input = document.getElementById(id);
  if (input.showPicker) input.showPicker();
  else input.focus();
}

const openNewTask = (id) => {
  const dialog = document.getElementById(id);
  dialog.showModal()
}


document.addEventListener("click", (e) => {
  if (!(e.target instanceof Element)) return;
  const btn = e.target.closest("button");
  if (!(btn instanceof HTMLElement)) return;
  const action = btn.dataset.action
  console.log(action);

  switch (action) {
    case "datePicker":
      pickDate("datePickerInput");
      break;
    case "openNewTask":
      openNewTask("newTaskDialog");
      break;
    default:
      console.log("No handler for this action");
  }
});
