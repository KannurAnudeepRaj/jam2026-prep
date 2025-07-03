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
    const seconds = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update();
  setInterval(update, 1000);
}

document.addEventListener("DOMContentLoaded", startCountdown);
