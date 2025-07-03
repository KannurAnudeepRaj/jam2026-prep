// js/practicals.js

function loadPracticals() {
  const list = document.getElementById("practical-list");
  list.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("practicals") || "[]");

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "practical-item";
    li.innerHTML = `
      <a href="${item.url}" target="_blank">${item.title}</a>
      ${item.note ? `<div class="practical-note">${item.note}</div>` : ""}
      <button class="delete-practical" data-index="${index}">❌</button>
    `;

    li.querySelector(".delete-practical").addEventListener("click", () => {
      data.splice(index, 1);
      localStorage.setItem("practicals", JSON.stringify(data));
      loadPracticals();
    });

    list.appendChild(li);
  });
}

document.getElementById("practical-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.title.value.trim();
  const url = e.target.url.value.trim();
  const note = e.target.note.value.trim();

  if (!title || !url) return;

  const data = JSON.parse(localStorage.getItem("practicals") || "[]");
  data.push({ title, url, note });
  localStorage.setItem("practicals", JSON.stringify(data));

  e.target.reset();
  loadPracticals();
});

loadPracticals();
