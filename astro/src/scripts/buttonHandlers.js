const pickDate = (id) => {
  const input = document.getElementById(id);
  if (input.showPicker) input.showPicker();
  else input.focus();
}

const openDialog = (id) => {
  const dialog = document.getElementById(id);
  dialog.showModal()
}

const closeDialog = (btn) => {
  const dialog = btn.closest("dialog");
  if (dialog) dialog.close();
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
      openDialog("newTaskDialog");
      break;
    case "openMenu":
      openDialog("menuDialog");
      break;
    case "closeDialog":
      closeDialog(btn);
      break;
    default:
      console.log("No handler for this action");
  }
});
