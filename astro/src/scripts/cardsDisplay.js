import cardsData from "./data.js";

export const updateCsrdsUI = () => {
  const container = document.getElementById("cardsContainer");
  const template = document.getElementById("cardTemplate");
  const clone = template.content.cloneNode(true);
  container.innerHTML = "";

  cardsData.forEach((card, index) => {
    const iso = card.startsAt;
    const time = new Date(iso).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    clone.querySelector("[data-card-color]").classList.add(card.color)
    clone.querySelector("[data-card-icon]").textContent = card.meta.icon;
    clone.querySelector("[data-card-title]").textContent = card.title;
    clone.querySelector("[data-card-time]").textContent = time;
    clone.querySelector("[data-card-id]").textContent = String(index + 1).padStart(2, "0");
    card.todos.forEach((todo) => {
      clone.querySelector("[data-card-tag]").insertAdjacentHTML(
        "beforeend",
        `
          <li class="mb-2">
            <label class="cursor-pointer inline-flex gap-2 items-start">
              <input type="checkbox" class="hidden peer" ${todo.done ? { checked: true } : {}} />
              <span class="todo-checkbox-large">
                <IconDisplay svgIcon="check-todo" svgSize="12" />
              </span>
              <span class="todo-text" data-card-todo-text>${todo.text}</span>
            </label>
          </li>
        `
      );
    });
    clone.querySelector("[data-card-tag]").textContent = card.tag;
    clone.querySelector("[data-card-description]").textContent = card.description;
  });

  container.appendChild(clone);

  // style the cards
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

  // ───────────────────────────────────────────────────────────────────────────

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

  function isModalOpen() {
    return document.querySelector("dialog[open]") !== null;
  }

  window.addEventListener("wheel", (e) => {
    if (isModalOpen()) return;
    if (e.deltaY > 0) {
      nextCard();
    } else if (e.deltaY < 0) {
      prevCard();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (isModalOpen()) return;
    switch (event.key) {
      case "ArrowUp":
      case "w":
        prevCard();
        break;
      case "ArrowDown":
      case "s":
        nextCard();
        break;
    }
  });

  // ───────────────────────────────────────────────────────────────────────────

  let startY = 0;
  let threshold = 50;

  window.addEventListener("touchstart", (e) => {
    if (isModalOpen()) return;
    startY = e.touches[0].clientY;
  });

  window.addEventListener("touchmove", (e) => {
    if (isModalOpen()) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (Math.abs(diff) > threshold) {
      if (diff < 0) {
        nextCard();
      } else {
        prevCard();
      }
      startY = currentY; // update after reacting
    }
  });
};
