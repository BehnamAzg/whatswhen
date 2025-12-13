function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").textContent = `${h}:${m}`;
}

// Calculate the delay until the next minute starts
function startClock() {
  updateClock(); // run immediately
  const now = new Date();
  const msUntilNextMinute = (60 - now.getSeconds()) * 1000;
  // Start minute interval exactly at the next minute
  setTimeout(() => {
    updateClock();
    setInterval(updateClock, 60_000);
  }, msUntilNextMinute);
}
startClock();

///////////////////////////////////////////////////////////////

function updateDate() {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const date = String(now.getDate()).padStart(2, "0");
  const month = now.toLocaleDateString("en-US", { month: "short" });
  document.getElementById("day").textContent = day;
  document.getElementById("date").textContent = date;
  document.getElementById("month").textContent = month;
}
updateDate();

///////////////////////////////////////////////////////////////

const cards = document.querySelectorAll(".card-container .card");
let activeCard = 0;

function setupCards() {
  cards.forEach((card, index) => {
    card.style.top = "100%";
    card.style.scale = "92%";
  });

  if (activeCard !== 0) {
    const prev = cards[activeCard - 1];
    prev.style.top = "0%";
  }

  const active = cards[activeCard];
  active.style.top = "14.5%";
  active.style.scale = "100%";

  if (activeCard < cards.length - 1) {
    const next = cards[activeCard + 1];
    next.style.top = "86%";
  }
}

setupCards();

function nextCard() {
  if (activeCard < cards.length - 1) {
    activeCard++;
    setupCards();
  }
}

function prevCard() {
  if (activeCard > 0) {
    activeCard--;
    setupCards();
  }
}

window.addEventListener("wheel", (e) => {
  if (e.deltaY > 0) {
    console.log("User is scrolling down");
    nextCard();
  } else if (e.deltaY < 0) {
    console.log("User is scrolling up");
    prevCard();
  }
});



let startY = 0;
let threshold = 50; // only react if user moved at least 10px

window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  const currentY = e.touches[0].clientY;
  const diff = currentY - startY;

  if (Math.abs(diff) > threshold) {
    if (diff < 0) {
      console.log("User is scrolling down");
      nextCard();
    } else {
      console.log("User is scrolling up");
      prevCard();
    }
    startY = currentY; // update after reacting
  }
});

const cardsData = [
  {
    icon: "🌞",
    titel: "Test titel",
    index: "01",
    tag: "Morning Routine",
    description: "",
    
  }
]