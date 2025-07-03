
// Countdown to JAM 2026 (Feb 9, 2026)
const countdown = document.getElementById('countdown');
const examDate = new Date("2026-02-09T09:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = examDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s left until JAM 2026`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
