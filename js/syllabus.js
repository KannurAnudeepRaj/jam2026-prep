const syllabusData = {
  Physical: [
    "Basic Maths", "Mole Concept", "Thermochemistry", "Thermodynamics (Ved)", "Thermodynamics (Pradeep)",
    "Liquid State", "Solid State", "Gaseous State", "Phase Equilibrium", "Colligative Properties (CP)",
    "Chemical Kinetics", "Surface Chemistry", "Ionic Equilibrium", "Chemical Equilibrium",
    "Acid-Base Theory", "Redox", "Potentiometric Titration", "Conductance",
    "Quantum Chemistry", "Atomic Structure", "Statistical Thermo", "Physical Spectra"
  ],
  Inorganic: [
    "Basic Inorganic", "Periodic Properties", "Chemical Bonding (Basic)", "Chemical Bonding (Ved)",
    "MOT", "MOT (Ved)", "Acid-Base & Solvent Theory", "D-Block", "F-Block", "Main Group (Ved)",
    "Metallurgy", "Coordination Chemistry (Ved)", "Basic Coordination", "Bio Inorganic", "Weak Forces",
    "Dipole Moment", "Ionic Bonding", "OMC", "Analytical Chemistry", "Qualitative Inorganic"
  ],
  Organic: [
    "Pre-GOC", "GOC (Ved)", "IUPAC", "Name Reactions (Ved)", "Retro Synthesis", "Aromaticity (Ved)",
    "Qualitative Organic", "Reaction Mechanism Lect", "Acid-Base (Organic)", "Reagents", "Carbene",
    "Free Radical", "Nitrene", "Heterocyclic", "Biomolecules", "Organic Photochemistry",
    "SpectroChemistry", "IR Spectra", "UV Spectra", "NMR", "NMR Spectra", "Pericyclic"
  ]
};

const syllabusContainer = document.getElementById("syllabus-list");
const progressBar = document.getElementById("syllabus-progress-bar");

function loadSyllabusTracker() {
  syllabusContainer.innerHTML = "";
  let total = 0;
  let completed = 0;

  Object.entries(syllabusData).forEach(([category, topics]) => {
    const section = document.createElement("div");
    section.className = "syllabus-category";

    const title = document.createElement("h3");
    title.className = "syllabus-title";
    title.textContent = category + " Chemistry ▾";
    title.addEventListener("click", () => {
      topicList.classList.toggle("hidden");
    });

    const topicList = document.createElement("div");
    topicList.className = "syllabus-topic-list";

    topics.forEach((topic, index) => {
      const id = `${category}-${index}`;
      const checked = localStorage.getItem(id) === "true";
      if (checked) completed++;
      total++;

      const label = document.createElement("label");
      label.className = "syllabus-item";
      label.innerHTML = `
        <input type="checkbox" id="${id}" ${checked ? "checked" : ""} />
        <span>${topic}</span>
      `;
      const checkbox = label.querySelector("input");
      checkbox.addEventListener("change", () => {
        localStorage.setItem(id, checkbox.checked);
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
    progressBar.style.width = percent + "%";
    progressBar.textContent = percent + "%";
  }

  updateProgress();
}

loadSyllabusTracker();
