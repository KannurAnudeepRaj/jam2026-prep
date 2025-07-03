// js/dashboard.js

// Countdown
function updateCountdown() {
  const examDate = new Date("2026-02-09T09:00:00"); // Replace with actual exam date/time
  const now = new Date();
  const diff = examDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerText = "🎉 JAM 2026 is here!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").innerText =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Syllabus Progress from localStorage
function updateSyllabusProgress() {
  const allCheckboxes = Object.keys(localStorage).filter(key => key.includes("-") && localStorage.getItem(key) === "true");
  const totalCheckboxes = Object.keys(localStorage).filter(key => key.includes("-"));
  const done = allCheckboxes.length;
  const total = totalCheckboxes.length || 1; // prevent division by zero

  const percent = Math.floor((done / total) * 100);
  const bar = document.getElementById("syllabus-progress-bar");
  if (bar) {
    bar.style.width = percent + "%";
    bar.textContent = percent + "%";
  }
}

// Revision Progress from localStorage
function updateRevisionProgress() {
  let completedRounds = 0;
  let totalRounds = 0;

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("rev-")) {
      totalRounds++;
      if (localStorage.getItem(key) === "true") completedRounds++;
    }
  });

  const percent = totalRounds === 0 ? 0 : Math.floor((completedRounds / totalRounds) * 100);
  const bar = document.getElementById("revision-progress-bar");
  if (bar) {
    bar.style.width = percent + "%";
    bar.textContent = percent + "%";
  }
}

updateSyllabusProgress();
updateRevisionProgress();
