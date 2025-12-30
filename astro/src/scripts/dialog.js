export const openDialog = (id) => {
  const dialog = document.getElementById(id);
  dialog.open ? dialog.close() : dialog.showModal();
};

export const closeDialog = (btn) => {
  const dialog = btn.closest("dialog");
  if (dialog) dialog.close();
};

export const dialogKeyboardShortcuts = () => {
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
}