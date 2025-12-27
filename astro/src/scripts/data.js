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
    id: "02",
    startsAt: "2025-12-13T06:30:00",
    title: "This is a long title for testing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    meta: {
      icon: "☕",
      color: "",
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

cardsData.sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));

const date = new Date(cardsData.startsAt);
const hour = date.getHours();
const minute = date.getMinutes();

export default cardsData;