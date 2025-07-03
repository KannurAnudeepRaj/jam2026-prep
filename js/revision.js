const revisionEl = document.getElementById("revision-tracker");

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

function loadRevisionTracker() {
  revisionEl.innerHTML = "";

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
        row.appendChild(checkbox);
      }

      body.appendChild(row);
    });

    section.appendChild(title);
    section.appendChild(body);
    revisionEl.appendChild(section);
  });

  updateRevProgress();
}

function updateRevProgress() {
  const inputs = document.querySelectorAll("#revision-tracker input[type='checkbox']");
  const checked = [...inputs].filter(i => i.checked).length;
  const percent = Math.floor((checked / inputs.length) * 100);
  const bar = document.getElementById("revision-progress-bar");
  bar.style.width = percent + "%";
  bar.textContent = percent + "%";
}

loadRevisionTracker();
