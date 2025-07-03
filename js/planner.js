const weeklyPlannerEl = document.getElementById("weekly-planner");

function generateWeeks() {
  const start = new Date("2025-07-01");
  const end = new Date("2026-01-31");

  let current = new Date(start);
  let week = 1;

  while (current <= end) {
    const weekStart = new Date(current);
    const weekEnd = new Date(current);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const id = `week-${week}`;
    const stored = JSON.parse(localStorage.getItem(id)) || { done: false, text: "" };

    const container = document.createElement("div");
    container.className = "week-entry";

    container.innerHTML = `
      <div class="week-header">
        <strong>Week ${week}</strong>
        <span>(${weekStart.toDateString()} – ${weekEnd.toDateString()})</span>
      </div>
      <textarea placeholder="Chapters assigned..." data-week="${id}">${stored.text}</textarea>
      <label class="week-checkbox">
        <input type="checkbox" data-week="${id}-done" ${stored.done ? "checked" : ""}/> Completed
      </label>
    `;

    weeklyPlannerEl.appendChild(container);

    current.setDate(current.getDate() + 7);
    week++;
  }
}

function saveWeeklyPlanner() {
  const entries = document.querySelectorAll(".week-entry");
  entries.forEach(entry => {
    const textarea = entry.querySelector("textarea");
    const checkbox = entry.querySelector("input[type='checkbox']");
    const id = textarea.dataset.week;
    localStorage.setItem(id, JSON.stringify({
      text: textarea.value,
      done: checkbox.checked
    }));
  });
}

weeklyPlannerEl.addEventListener("input", saveWeeklyPlanner);
weeklyPlannerEl.addEventListener("change", saveWeeklyPlanner);

generateWeeks();
