export let updateDateValue = 0;

export const setUpdateDateValue = (value) => {
  updateDateValue += value;
};

const normalizeDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const updateDate = (value = 0) => {
  const dayEl = document.getElementById("day");
  const dateEl = document.getElementById("date");
  const monthEL = document.getElementById("month");
  const display = document.getElementById("dateNavigationDisplay");
  const dateInfo = document.getElementById("dateInfo");

  if (!dayEl || !dateEl || !monthEL || !display || !dateInfo) return;

  const now = normalizeDate(new Date());
  const targetDay = normalizeDate(new Date());
  targetDay.setDate(targetDay.getDate() + value);

  // UI date
  dayEl.textContent = targetDay.toLocaleDateString("en-US", { weekday: "short" });
  dateEl.textContent = String(targetDay.getDate()).padStart(2, "0");
  monthEL.textContent = targetDay.toLocaleDateString("en-US", { month: "short" });

  // Day difference
  const diff = Math.round((targetDay.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));

  // Label
  if (diff === 0) {
    display.classList.add("bg-primary", "text-white");
  } else {
    display.classList.remove("bg-primary", "text-white");
  }

  dateInfo.textContent = diff === 0 ? "Today" : diff === 1 ? "Tomorrow" : diff === -1 ? "Yesterday" : diff > 0 ? `In ${diff} days` : `${Math.abs(diff)} days ago`;
};

export const pickDate = (id) => {
    const input = document.getElementById(id);
    if (input.showPicker) input.showPicker();
    else input.focus();
  };

export const setupDateInputListener = () => {
  const datePickerInput = document.getElementById("datePickerInput");

  if (datePickerInput) {
    datePickerInput.addEventListener("change", (e) => {
      const selectedValue = e.target.value; // format: "YYYY-MM-DD"
      if (!selectedValue) return;

      const selectedDate = new Date(selectedValue);
      const today = new Date();

      const diff = Math.round((normalizeDate(selectedDate) - normalizeDate(today)) / (24 * 60 * 60 * 1000));

      updateDate(diff);
    });
  }
}