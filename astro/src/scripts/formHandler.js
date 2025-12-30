import cardsData from "./data.js"

export function addCardFromForm(form) {
  // Extract values from form elements
  const icon = form.querySelector('[name="icon"]').value || "📝";
  const title = form.querySelector('[name="title"]').value.trim();
  const startsAt = form.querySelector('[name="startTime"]').value;
  const reminder = form.querySelector('[name="reminder"]').checked;
  const tag = form.querySelector('[name="tag"]').value.trim();
  const colorInput = form.querySelector('[name="color"]:checked');
  const customColorInput = form.querySelector('[name="customColor"]');
  const description = form.querySelector('[name="description"]').value.trim();

  // Repeat checkboxes
  const repeatDays = Array.from(form.querySelectorAll('[name="repeat"]:checked'))
    .map(input => Number(input.value));

  // To-do items
  const todos = Array.from(form.querySelectorAll('[name="todo"]')).map(input => ({
    text: input.value.trim(),
    done: false,
  }));

  // Pomodoro times
  const pomodoroInputs = form.querySelectorAll('[name="pomodoro"]');
  const pomodoro = pomodoroInputs.length
    ? Array.from(pomodoroInputs).map(input => input.value)
    : null;

  // Determine color
  const color = customColorInput?.value ? customColorInput.value : colorInput?.value || "#fff";

  // Create new card object
  const newCard = {
    id: Date.now().toString(), // simple unique id
    startsAt: new Date(startsAt).toISOString(),
    title,
    description,
    meta: {
      icon,
      color,
      tag,
    },
    reminder,
    repeat: {
      days: repeatDays,
    },
    todos,
    exceptions: {},
    pomodoro,
    createdAt: Date.now(),
  };

  // Add to cardsData
  cardsData.push(newCard);

  // Sort cards by start time
  cardsData.sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));

  console.log("New card added:", newCard);
}


/*
Optional: Helper function for daily cards
If you render per-day:
function getCardsForDay(date) {
  return cardsData
    .filter(card => isSameDay(card.startsAt, date))
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
}
Then numbering automatically resets per day, which matches a daily planner
*/