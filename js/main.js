// --- JAM 2026 Countdown ---
function startCountdown() {
  const examDate = new Date("2026-02-09T09:00:00").getTime();
  const countdownEl = document.getElementById("countdown");

  function update() {
    const now = new Date().getTime();
    const diff = examDate - now;

    if (diff <= 0) {
      countdownEl.textContent = "It's exam day!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    countdownEl.textContent = `${days} days ${hours} hrs ${minutes} mins`;
  }

  update();
  setInterval(update, 60000);
}
startCountdown();
