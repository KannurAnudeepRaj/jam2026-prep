const syllabusData = {
  Physical: [
    { title: "Basic Math", lectures: 8 },
    { title: "Mole Concept", lectures: 7 },
    { title: "Redox", lectures: 7 },
    { title: "Atomic Structure", lectures: 5 },
    { title: "Electrochemistry", lectures: 10 },
    { title: "Thermodynamics", lectures: 15 },
    { title: "Thermochemistry", lectures: 3 },
    { title: "Ionic Equilibrium", lectures: 10 },
    { title: "Chemical Equilibrium", lectures: 9 },
    { title: "Phase Equilibrium", lectures: 5 },
    { title: "Chemical Kinetics", lectures: 10 },
    { title: "Solutions and Colligative Properties", lectures: 4 },
    { title: "Solid State", lectures: 14 },
    { title: "Surface Chemistry", lectures: 5 },
    { title: "Quantum Chemistry", lectures: 20 },
    { title: "Gaseous State", lectures: 8 },
    { title: "Conductance", lectures: 7 },
    { title: "Nuclear Chemistry", lectures: 7 },
    { title: "Physical Spectroscopy", lectures: 9 }
  ],
  Inorganic: [
    { title: "Basic Inorganic Chemistry", lectures: 5 },
    { title: "Chemical Bonding", lectures: 15 },
    { title: "Periodic Properties", lectures: 6 },
    { title: "Basic Chemical Bonding", lectures: 5 },
    { title: "D-Block", lectures: 1 },
    { title: "F-Block", lectures: 2 },
    { title: "Main Group", lectures: 10 },
    { title: "OMC", lectures: 15 },
    { title: "Coordination Chemistry", lectures: 20 },
    { title: "Analytical Chemistry", lectures: 5 },
    { title: "Metallurgy", lectures: 2 },
    { title: "Bio Inorganic", lectures: 4 },
    { title: "Acid-Base & Solvent Theory", lectures: 3 }
  ],
  Organic: [
    { title: "GOC", lectures: 15 },
    { title: "IUPAC", lectures: 7 },
    { title: "Stereo Chemistry", lectures: 17 },
    { title: "Reaction Mechanism", lectures: 16 },
    { title: "Reagents", lectures: 8 },
    { title: "Name Reactions", lectures: 20 },
    { title: "Pericyclic", lectures: 11 },
    { title: "Heterocyclic", lectures: 10 }
  ]
};

const syllabusContainer = document.getElementById("syllabus-list");
const progressBar = document.getElementById("syllabus-progress-bar");

function loadSyllabus() {
  syllabusContainer.innerHTML = `
    <input type="text" id="syllabus-search" placeholder="🔍 Search topics..." style="margin-bottom: 20px;" />
  `;

  Object.entries(syllabusData).forEach(([category, topics]) => {
    const section = document.createElement("div");
    section.className = "syllabus-section";

    const title = document.createElement("div");
    title.textContent = `${category} Chemistry ⌄`;
    title.style.cursor = "pointer";
    title.style.marginBottom = "10px";
    title.style.fontWeight = "600";

    const list = document.createElement("div");
    list.className = "syllabus-topic-list";

    title.addEventListener("click", () => list.classList.toggle("hidden"));

    topics.forEach((topic, index) => {
      const id = `${category}-${topic.title.replace(/\s+/g, "-")}`;
      const isChecked = localStorage.getItem(id) === "true";

      const wrapper = document.createElement("label");
      wrapper.className = "syllabus-topic";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = id;
      checkbox.checked = isChecked;

      const label = document.createElement("span");
      label.textContent = `${topic.title} (${topic.lectures} lec)`;

      checkbox.addEventListener("change", () => {
        localStorage.setItem(id, checkbox.checked);
        updateProgress();
      });

      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);
      list.appendChild(wrapper);
    });

    section.appendChild(title);
    section.appendChild(list);
    syllabusContainer.appendChild(section);
  });

  updateProgress();

  // Search filtering
  document.getElementById("syllabus-search").addEventListener("input", e => {
    const keyword = e.target.value.toLowerCase();
    const allLabels = syllabusContainer.querySelectorAll(".syllabus-topic");
    allLabels.forEach(label => {
      const visible = label.textContent.toLowerCase().includes(keyword);
      label.style.display = visible ? "flex" : "none";
    });
  });
}

function updateProgress() {
  const allCheckboxes = syllabusContainer.querySelectorAll("input[type='checkbox']");
  const completed = [...allCheckboxes].filter(cb => cb.checked).length;
  const percent = allCheckboxes.length > 0
    ? Math.floor((completed / allCheckboxes.length) * 100)
    : 0;

  progressBar.style.width = percent + "%";
  progressBar.textContent = percent + "%";
}

loadSyllabus();
