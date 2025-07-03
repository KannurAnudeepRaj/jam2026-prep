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
