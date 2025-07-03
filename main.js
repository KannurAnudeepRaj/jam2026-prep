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
  setInterval(update, 60000); // Update every minute
}
startCountdown();

function savePYQs() {
  localStorage.setItem("pyq-log", pyqList.innerHTML);
}
function loadPYQs() {
  const saved = localStorage.getItem("pyq-log");
  if (saved) pyqList.innerHTML = saved;
}
loadPYQs();

pyqForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { date, type, score, topics, mistake } = pyqForm.elements;
  const li = document.createElement("li");
  li.innerHTML = `<strong>${type.value}</strong> on ${date.value}: Score ${score.value}. Topics: ${topics.value} ${mistake.checked ? '✔️ Mistake noted' : ''}`;
  pyqList.appendChild(li);
  pyqForm.reset();
  savePYQs();
});

function saveMistakes() {
  localStorage.setItem("mistakes", mistakeList.innerHTML);
}
function loadMistakes() {
  const saved = localStorage.getItem("mistakes");
  if (saved) mistakeList.innerHTML = saved;
}
loadMistakes();

mistakeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { date, topic, mistake } = mistakeForm.elements;
  const li = document.createElement("li");
  li.innerHTML = `<strong>${date.value}</strong> – <em>${topic.value}</em>: ${mistake.value}`;
  mistakeList.appendChild(li);
  mistakeForm.reset();
  saveMistakes();
});

// --- Syllabus Tracker ---
const syllabusData = {
  Physical: [
    "Basic Maths", "Mole Concept", "Thermochemistry", "Thermodynamics (Ved Sir)",
    "Thermodynamics (Pradeep Sir)", "Liquid State", "Solid State (Pradeep Sir)",
    "Gaseous State", "Phase Equilibrium", "Solutions and Colligative Properties",
    "Chemical Kinetics", "Surface Chemistry", "Ionic Equilibrium", "Chemical Equilibrium",
    "Acid-Base", "Redox", "Potentiometric Titration", "Conductance", "Nuclear Chemistry (Pradeep Sir)",
    "Quantum Chemistry", "Atomic Structure", "Statistical Thermodynamics", "Physical Spectroscopy"
  ],
  Inorganic: [
    "Basic Inorganic Chemistry", "Periodic Properties", "Basic Chemical Bonding",
    "Chemical Bonding (Ved Sir)", "MOT", "MOT (Ved Sir)", "Acid-Base & Solvent Theory",
    "Main Group (Ved Sir)", "D Block", "F Block", "Metallurgy", "Coordination Chemistry (Ved Sir)",
    "Basic Coordination", "OMC", "Bio Inorganic", "Weak Forces", "Dipole Moment",
    "Ionic Bonding", "Analytical Chemistry", "Qualitative Inorganic"
  ],
  Organic: [
    "Pre-GOC", "GOC", "GOC (Ved Sir)", "IUPAC", "Name Reactions (Ved Sir)", "Retro Synthesis",
    "Aromaticity (Ved Sir)", "Qualitative Organic", "Protection & Deprotection",
    "Acid-Base (Organic)", "Reaction Mechanism Lecture", "Reagents", "Carbene", "Nitrene",
    "Free Radical", "Heterocyclic", "Biomolecules", "Organic Photochemistry",
    "IR Spectroscopy (Pradeep Sir)", "UV Spectroscopy (Pradeep Sir)", "SpectroChemistry",
    "NMR", "NMR Spectra", "Pericyclic"
  ]
};

const syllabusContainer = document.getElementById("syllabus-list");

function loadSyllabusTracker() {
  syllabusContainer.innerHTML = `
    <input type="text" id="syllabus-search" placeholder="Search topics..." />
    <div id="progress-bar-container">
      <div id="progress-bar"></div>
    </div>
  `;

  let totalCount = 0;
  let checkedCount = 0;

  Object.entries(syllabusData).forEach(([category, topics]) => {
    const section = document.createElement("div");
    section.className = "syllabus-category";

    const title = document.createElement("h3");
    title.className = "syllabus-title";
    title.textContent = category + " Chemistry \u25BE";

    const topicList = document.createElement("div");
    topicList.className = "syllabus-topic-list";

    title.addEventListener("click", () => {
      topicList.classList.toggle("hidden");
    });

    topics.forEach((topic, index) => {
      const id = `${category}-${index}`;
      const checked = localStorage.getItem(id) === "true";
      if (checked) checkedCount++;
      totalCount++;

      const label = document.createElement("label");
      label.className = "syllabus-item";
      label.innerHTML = `
        <input type="checkbox" id="${id}" ${checked ? "checked" : ""} />
        <span>${topic}</span>
      `;
      label.querySelector("input").addEventListener("change", (e) => {
        localStorage.setItem(id, e.target.checked);
        updateProgress();
      });
      topicList.appendChild(label);
    });

    section.appendChild(title);
    section.appendChild(topicList);
    syllabusContainer.appendChild(section);
  });

  function updateProgress() {
    const inputs = document.querySelectorAll("#syllabus-list input[type='checkbox']");
    const checked = [...inputs].filter(i => i.checked).length;
    const percent = Math.floor((checked / inputs.length) * 100);
    const bar = document.getElementById("progress-bar");
    bar.style.width = percent + "%";
    bar.textContent = percent + "%";
  }

  updateProgress();

  // Search Functionality
  const searchInput = document.getElementById("syllabus-search");
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const items = document.querySelectorAll(".syllabus-item");
    items.forEach(item => {
      const match = item.textContent.toLowerCase().includes(term);
      item.style.display = match ? "flex" : "none";
    });
  });
}
loadSyllabusTracker();


// --- Weekly Planner ---
const weeklyPlannerEl = document.getElementById("weekly-planner");

// Generate weeks between July 1, 2025 and Jan 31, 2026
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
  entries.forEach((entry, index) => {
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


// --- Revision Tracker ---
const revisionEl = document.getElementById("revision-tracker");

function loadRevisionTracker() {
  revisionEl.innerHTML = `
    <div id="revision-progress-container">
      <div id="revision-progress-bar"></div>
    </div>
  `;

  let totalBoxes = 0;
  let checkedBoxes = 0;

  Object.entries(syllabusData).forEach(([category, topics]) => {
    const section = document.createElement("div");
    section.className = "rev-category";

    const title = document.createElement("h3");
    title.className = "rev-title";
    title.textContent = category + " Chemistry ▾";
    title.addEventListener("click", () => {
      body.classList.toggle("hidden");
    });

    const body = document.createElement("div");
    body.className = "rev-topic-list";

    topics.forEach((topic, i) => {
      const row = document.createElement("div");
      row.className = "rev-item";

      const label = document.createElement("span");
      label.textContent = topic;
      row.appendChild(label);

      for (let r = 1; r <= 4; r++) {
        const id = `rev-${category}-${i}-r${r}`;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = localStorage.getItem(id) === "true";
        checkbox.addEventListener("change", () => {
          localStorage.setItem(id, checkbox.checked);
          updateRevProgress();
        });
        if (checkbox.checked) checkedBoxes++;
        totalBoxes++;
        row.appendChild(checkbox);
      }

      body.appendChild(row);
    });

    section.appendChild(title);
    section.appendChild(body);
    revisionEl.appendChild(section);
  });

  function updateRevProgress() {
    const inputs = document.querySelectorAll("#revision-tracker input[type='checkbox']");
    const checked = [...inputs].filter(i => i.checked).length;
    const percent = Math.floor((checked / inputs.length) * 100);
    document.getElementById("revision-progress-bar").style.width = percent + "%";
    document.getElementById("revision-progress-bar").textContent = percent + "%";
  }

  updateRevProgress();
}
loadRevisionTracker();

// --- PYQ Log: Save and Render ---
const pyqForm = document.getElementById("pyq-form");
const pyqList = document.getElementById("pyq-log-list");

function getPyqLogs() {
  return JSON.parse(localStorage.getItem("pyq-logs")) || [];
}

function savePyqLogs(logs) {
  localStorage.setItem("pyq-logs", JSON.stringify(logs));
}

function renderPyqLogs() {
  const logs = getPyqLogs();
  pyqList.innerHTML = "";
  logs.forEach((log, index) => {
    const li = document.createElement("li");
    li.className = "pyq-item";
    li.innerHTML = `
      <div><strong>${log.date}</strong> | ${log.type} | <b>Score:</b> ${log.score}</div>
      <div><b>Topics:</b> ${log.topics}</div>
      <div><b>Mistakes Noted:</b> ${log.mistake ? "✅" : "❌"}</div>
      <button data-index="${index}" class="delete-pyq">🗑️</button>
    `;
    pyqList.appendChild(li);
  });

  // Delete button functionality
  document.querySelectorAll(".delete-pyq").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      const updatedLogs = getPyqLogs();
      updatedLogs.splice(i, 1);
      savePyqLogs(updatedLogs);
      renderPyqLogs();
    });
  });
}

pyqForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(pyqForm);
  const newLog = {
    date: formData.get("date"),
    type: formData.get("type"),
    score: formData.get("score"),
    topics: formData.get("topics"),
    mistake: formData.get("mistake") === "on",
  };
  const logs = getPyqLogs();
  logs.push(newLog);
  savePyqLogs(logs);
  renderPyqLogs();
  pyqForm.reset();
});

renderPyqLogs();

// --- Mistake Journal Logic ---
const mistakeForm = document.getElementById("mistake-form");
const mistakeList = document.getElementById("mistake-list");

function getMistakeLogs() {
  return JSON.parse(localStorage.getItem("mistake-journal")) || [];
}

function saveMistakeLogs(logs) {
  localStorage.setItem("mistake-journal", JSON.stringify(logs));
}

function renderMistakes() {
  const logs = getMistakeLogs();
  mistakeList.innerHTML = "";
  logs.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = "mistake-item";
    li.innerHTML = `
      <div><strong>${entry.date}</strong> | <b>Topic:</b> ${entry.topic}</div>
      <div><b>Mistake:</b> ${entry.mistake}</div>
      <button data-index="${index}" class="delete-mistake">🗑️</button>
    `;
    mistakeList.appendChild(li);
  });

  // Delete logic
  document.querySelectorAll(".delete-mistake").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      const updated = getMistakeLogs();
      updated.splice(i, 1);
      saveMistakeLogs(updated);
      renderMistakes();
    });
  });
}

mistakeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(mistakeForm);
  const newEntry = {
    date: formData.get("date"),
    topic: formData.get("topic"),
    mistake: formData.get("mistake")
  };
  const logs = getMistakeLogs();
  logs.push(newEntry);
  saveMistakeLogs(logs);
  renderMistakes();
  mistakeForm.reset();
});

renderMistakes();

// --- Virtual Practicals ---
const practicalForm = document.getElementById("practical-form");
const practicalList = document.getElementById("practical-list");

const defaultPracticals = [
  {
    title: "Amrita OLabs",
    url: "https://amrita.olabs.edu.in/",
    note: "School-level virtual practicals"
  },
  {
    title: "PhET Chemistry Sims",
    url: "https://phet.colorado.edu/en/simulations/category/chemistry",
    note: "Interactive chemistry simulations"
  }
];

function getPracticals() {
  return JSON.parse(localStorage.getItem("practicals")) || defaultPracticals;
}

function savePracticals(data) {
  localStorage.setItem("practicals", JSON.stringify(data));
}

function renderPracticals() {
  const practicals = getPracticals();
  practicalList.innerHTML = "";
  practicals.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = "practical-item";
    li.innerHTML = `
      <a href="${entry.url}" target="_blank">${entry.title}</a>
      <div class="practical-note">${entry.note || "—"}</div>
      <button data-index="${index}" class="delete-practical">🗑️</button>
    `;
    practicalList.appendChild(li);
  });

  document.querySelectorAll(".delete-practical").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      const updated = getPracticals();
      updated.splice(i, 1);
      savePracticals(updated);
      renderPracticals();
    });
  });
}

practicalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(practicalForm);
  const newEntry = {
    title: formData.get("title"),
    url: formData.get("url"),
    note: formData.get("note")
  };
  const logs = getPracticals();
  logs.push(newEntry);
  savePracticals(logs);
  renderPracticals();
  practicalForm.reset();
});

renderPracticals();

