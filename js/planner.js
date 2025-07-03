// planner.js

const weekData = [
  { phase: "🧠 Phase 1: Syllabus Completion", weeks: [
    { week: 1, topics: "Basic Math, Mole Concept", hours: 30 },
    { week: 2, topics: "Redox, Atomic Structure", hours: 24 },
    { week: 3, topics: "Electrochemistry", hours: 20 },
    { week: 4, topics: "Thermodynamics, Thermochemistry", hours: 36 },
    { week: 5, topics: "Ionic Equilibrium, Chemical Equilibrium", hours: 38 },
    { week: 6, topics: "Phase Eq., Chem Kinetics, Solutions & Colligative Props", hours: 38 },
    { week: 7, topics: "Solid State, Surface Chemistry", hours: 38 },
    { week: 8, topics: "Quantum Chemistry", hours: 40 },
    { week: 9, topics: "Gaseous State, Conductance", hours: 30 },
    { week: 10, topics: "Nuclear Chemistry, Physical Spectroscopy", hours: 32 },
    { week: 11, topics: "Basic Inorganic Chem, Chem Bonding", hours: 40 },
    { week: 12, topics: "Periodic Properties, Basic Bonding, D & F Blocks", hours: 26 },
    { week: 13, topics: "Main Group", hours: 20 },
    { week: 14, topics: "OMC (Organometallic Chemistry)", hours: 30 },
    { week: 15, topics: "Coordination Chemistry", hours: 40 },
    { week: 16, topics: "Analytical, Metallurgy, Bio Inorg, Acid-Base", hours: 28 },
    { week: 17, topics: "GOC", hours: 30 },
    { week: 18, topics: "IUPAC, Stereochem, Mech, Reagents", hours: 60 }
  ]},
  { phase: "🔁 Phase 2: First Revision", weeks: [
    { week: 19, topics: "Physical Chemistry Review + MCQs" },
    { week: 20, topics: "Inorganic Chemistry Review + Short Notes" },
    { week: 21, topics: "Organic Chemistry Review + Mechanism Drills" },
    { week: 22, topics: "Mixed MCQs, Summary Sheets, Formula Recap, Error Log Analysis" },
  ]},
  { phase: "🔁 Phase 3: Second Revision", weeks: [
    { week: 23, topics: "Physical + Organic Combined Paper Solving" },
    { week: 24, topics: "Inorganic + Coord. Chem + Mixed Tests" },
    { week: 25, topics: "2 Mock Tests + Deep Analysis + Weak Topics" },
  ]},
  { phase: "🔁 Phase 4: Third Revision", weeks: [
    { week: 26, topics: "Timed Mock Tests 1–3 + Review Solutions" },
    { week: 27, topics: "Timed Mock Tests 4–6 + PYQs + Fix Mistakes" },
    { week: 28, topics: "Final Error Logs + Formula Recap + Concept Summary" },
  ]},
  { phase: "🌟 Phase 5: Final Sprint", weeks: [
    { week: 29, topics: "Top 50 Qs: Phys, Coord. Chem, Mech." },
    { week: 30, topics: "Recap, Mind Maps, Confidence Boost, Sleep" },
  ]},
];

const plannerEl = document.getElementById("weekly-planner");
const progressBar = document.getElementById("planner-progress-bar");

function renderPlanner() {
  plannerEl.innerHTML = '';
  let total = 0;
  let completed = 0;

  weekData.forEach(group => {
    group.weeks.forEach(item => {
      total++;
      const key = `planner-week-${item.week}`;
      const done = localStorage.getItem(key) === 'true';
      if (done) completed++;

      const card = document.createElement("div");
      card.className = "week-card";
      card.innerHTML = `
        <h3>Week ${item.week}</h3>
        <p><strong>Phase:</strong> ${group.phase}</p>
        <p><strong>Topics:</strong> ${item.topics}</p>
        ${item.hours ? `<p><strong>Est. Hours:</strong> ${item.hours}</p>` : ''}
        <label>
          <input type="checkbox" ${done ? "checked" : ""} data-id="${key}" />
          Mark as done
        </label>
      `;

      const checkbox = card.querySelector("input");
      checkbox.addEventListener("change", () => {
        localStorage.setItem(key, checkbox.checked);
        updateProgress();
      });

      plannerEl.appendChild(card);
    });
  });

  function updateProgress() {
    const inputs = document.querySelectorAll(".week-card input[type='checkbox']");
    const checked = [...inputs].filter(i => i.checked).length;
    const percent = Math.floor((checked / inputs.length) * 100);
    progressBar.style.width = percent + "%";
    progressBar.textContent = percent + "%";
  }

  updateProgress();
}

renderPlanner();
