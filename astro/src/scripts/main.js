import initButtonHandlers from "./buttonHandlers.js";
import { updateDate, setupDateInputListener } from "./dateHandler.js";
import { updateCsrdsUI } from "./cardsDisplay.js";

initButtonHandlers();
updateDate();
setupDateInputListener();
updateCsrdsUI();