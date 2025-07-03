document.addEventListener("DOMContentLoaded", () => {
  // Countdown
  function startCountdown() {
    const examDate = new Date("2026-02-09T09:00:00").getTime();
    const countdownEl = document.getElementById("countdown");

    function update() {
      const now = new Date().getTime();
      const diff = examDate - now;

      if (!countdownEl) return;

      if (diff <= 0) {
        countdownEl.textContent = "🎉 It's exam day!";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      countdownEl.textContent = `${days} days ${hours} hrs ${minutes} mins`;
    }

    update();
    setInterval(update, 60000); // Update every minute
  }

  // Load syllabus and revision progress from localStorage
  function calculateProgress() {
    const allInputs = Object.keys(localStorage);
    const syllabusInputs = allInputs.filter(k => /^Physical|Inorganic|Organic/.test(k));
    const revisionInputs = allInputs.filter(k => /^rev-/.test(k));

    const syllabusChecked = syllabusInputs.filter(k => localStorage[k] === "true").length;
    const syllabusTotal = syllabusInputs.length;

    const revisionChecked = revisionInputs.filter(k => localStorage[k] === "true").length;
    const revisionTotal = revisionInputs.length;

    const syllabusPercent = syllabusTotal ? Math.floor((syllabusChecked / syllabusTotal) * 100) : 0;
    const revisionPercent = revisionTotal ? Math.floor((revisionChecked / revisionTotal) * 100) : 0;

    const syllabusBar = document.getElementById("syllabus-progress-bar");
    const revisionBar = document.getElementById("revision-progress-bar");

    if (syllabusBar) {
      syllabusBar.style.width = `${syllabusPercent}%`;
      syllabusBar.textContent = `${syllabusPercent}%`;
    }

    if (revisionBar) {
      revisionBar.style.width = `${revisionPercent}%`;
      revisionBar.textContent = `${revisionPercent}%`;
    }
  }

  // Run both functions
  startCountdown();
  calculateProgress();
});
