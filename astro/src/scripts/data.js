export const cardsData = [
  {
    id: "01",
    startsAt: "2025-12-13T06:00:00",
    title: "This is a long title for testing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    meta: {
      icon: "🌞",
      color: "bg-amber-300/40",
      tag: "Morning Routine",
    },
    reminder: true,
    repeat: {
      days: [1, 3, 6], // Mon, Wed, Sat (0 = Sun)
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
    id: "02",
    startsAt: "2025-12-13T06:30:00",
    title: "This is a long title for testing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    meta: {
      icon: "☕",
      color: "bg-amber-300/40",
      tag: "Morning Routine",
    },
    reminder: true,
    repeat: {
      type: "weekly", // none | daily | weekly | monthly | yearly
      interval: 1, // every 1 week
      days: [1, 3, 6], // Mon, Wed, Sat (0 = Sun)
      endsAt: null, // or "2026-01-01"
    },
    todos: [
      { text: "This is todo 1", done: false },
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

// cardsData.sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));

// const date = new Date(cardsData.startsAt);
// const hour = date.getHours();
// const minute = date.getMinutes();

export default cardsData;

/*
I'm in the process of making a daily schedule planner web app.
For each day, there should be a list of cards, each of which represents a task for that day.
When creating a new card (task), a modal dialog will appear and show a form with these fields:

"icon" -> it's not an input but a button that opens another modal dialog for selecting an icon. (I'm not sure if it's a good idea or if I should just set up a datalist or something, but for semantic reasons, I decided to use this for now.)
"title" -> a text input (required).
"start time" -> a time input (required), this is very important because tasks in each day will be ordered by the starting time, and also there is gonna be a timer on each card that will show the remaining time till the next task arrival time.
"reminder" -> a checkbox input semantic as a toggle button, if it's on, then there will be a notification when a task start time arrives.
"tag" -> a text input.
"repeat" -> a collection of checkbox inputs for selecting in what days this task should repeat + a function that controls selections behaviour.
"color" -> some radio inputs for selecting a color + a color input for choosing a custom color.
"description" -> textarea input.
"Add to-do Item" -> a button that, each time pressed, will add a text input to the form for each to-do item.
"Pomodoro timer" -> a button that, when pressed, it will unhide a div that has 8 text inputs with the pattern of pattern="[0-9]{2}:[0-9]{2}".

I have created this array of objects for storeing these data:
const cardsData = [
  {
    id: "01",
    startsAt: "2025-12-13T06:00:00",
    title: "This is a long title for testing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    meta: {
      icon: "🌞",
      color: "bg-amber-300/40",
      tag: "Morning Routine",
    },
    reminder: true,
    repeat: {
      days: [1, 3, 6], // Mon, Wed, Sat (0 = Sun)
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
  }
]

I'm not sure how good this format is, so you can change it if it's needed.
That id parameter in the object is for displaying a number on the card based on the card index after sorting the array by the start time, for example: the card index 0 will have an id of "01" because it's the first card.

Basically, what I'm interested in right now is a function that can handle the submitted form data (I'm not knowledgeable about this part) and store it in the cardsData array as a new entry.

*/