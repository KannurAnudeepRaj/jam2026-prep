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
