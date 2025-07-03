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
