// =======================
// JAM 2026 – Revision Tracker Script
// =======================

const revisionTopics = [
  // --- Physical Chemistry ---
  "Basic Math",
  "Mole Concept",
  "Redox",
  "Atomic Structure",
  "Electrochemistry",
  "Thermodynamics",
  "Thermochemistry",
  "Ionic Equilibrium",
  "Chemical Equilibrium",
  "Phase Equilibrium",
  "Chemical Kinetics",
  "Solutions and Colligative Properties",
  "Solid State",
  "Surface Chemistry",
  "Quantum Chemistry",
  "Gaseous State",
  "Conductance",
  "Nuclear Chemistry",
  "Physical Spectroscopy",

  // --- Inorganic Chemistry ---
  "Basic Inorganic Chemistry",
  "Chemical Bonding",
  "Periodic Properties",
  "Basic Chemical Bonding",
  "D-Block",
  "F-Block",
  "Main Group",
  "OMC",
  "Coordination Chemistry",
  "Analytical Chemistry",
  "Metallurgy",
  "Bio Inorganic",
  "Acid-Base & Solvent Theory",

  // --- Organic Chemistry ---
  "GOC",
  "IUPAC",
  "Stereochemistry",
  "Reaction Mechanism",
  "Reagents",
  "Name Reactions",
  "Pericyclic",
  "Heterocyclic"
];

const trackerContainer = document.getElementById("revision-tracker");
const progressBar = document.getElementById("revision-progress-bar");

function renderRevisionTracker() {
  trackerContainer.innerHTML = "";
  let total = 0;
  let completed = 0;

  revisionTopics.forEach(topic => {
    const topicKey = topic.replace(/\s+/g, "-").toLowerCase();

    const card = document.createElement("div");
    card.className = "revision-card";
    card.innerHTML = `<h3>${topic}</h3>`;

    for (let round = 1; round <= 3; round++) {
      const inputId = `rev-${topicKey}-r${round}`;
      const isChecked = localStorage.getItem(inputId) === "true";

      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isChecked;
      checkbox.dataset.key = inputId;

      checkbox.addEventListener("change", () => {
        localStorage.setItem(inputId, checkbox.checked);
        updateProgress();
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` Round ${round}`));
      card.appendChild(label);

      total++;
      if (isChecked) completed++;
    }

    trackerContainer.appendChild(card);
  });

  updateProgress();
}

function updateProgress() {
  const allCheckboxes = document.querySelectorAll("#revision-tracker input[type='checkbox']");
  const total = allCheckboxes.length;
  const checked = Array.from(allCheckboxes).filter(cb => cb.checked).length;
  const percent = total > 0 ? Math.floor((checked / total) * 100) : 0;

  progressBar.style.width = `${percent}%`;
  progressBar.textContent = `${percent}%`;
}

renderRevisionTracker();
