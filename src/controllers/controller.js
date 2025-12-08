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

