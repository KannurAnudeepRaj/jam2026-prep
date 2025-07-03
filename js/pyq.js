// js/pyq.js

function loadPYQLogs() {
  const list = document.getElementById("pyq-log-list");
  list.innerHTML = "";

  const logs = JSON.parse(localStorage.getItem("pyqLogs") || "[]");

  logs.forEach((log, index) => {
    const li = document.createElement("li");
    li.className = "pyq-item";
    li.innerHTML = `
      <strong>Date:</strong> ${log.date} <br>
      <strong>Type:</strong> ${log.type} <br>
      <strong>Score:</strong> ${log.score} <br>
      <strong>Topics:</strong> ${log.topics} <br>
      ${log.mistake ? `<span style="color: red; font-weight: bold;">❗Mistake Made</span><br>` : ""}
      <button class="delete-pyq" data-index="${index}">❌</button>
    `;

    li.querySelector(".delete-pyq").addEventListener("click", () => {
      logs.splice(index, 1);
      localStorage.setItem("pyqLogs", JSON.stringify(logs));
      loadPYQLogs();
    });

    list.appendChild(li);
  });
}

document.getElementById("pyq-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const newLog = {
    date: form.date.value,
    type: form.type.value.trim(),
    score: form.score.value.trim(),
    topics: form.topics.value.trim(),
    mistake: form.mistake.checked
  };

  const logs = JSON.parse(localStorage.getItem("pyqLogs") || "[]");
  logs.unshift(newLog);
  localStorage.setItem("pyqLogs", JSON.stringify(logs));
  form.reset();
  loadPYQLogs();
});

loadPYQLogs();
