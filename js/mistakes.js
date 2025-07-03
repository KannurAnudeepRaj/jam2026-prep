document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const form = document.getElementById('mistake-form');
  const dateInput = document.getElementById('mistake-date');
  const selectedDateLabel = document.getElementById('selected-date-label');
  const topicInput = document.getElementById('mistake-topic');
  const textInput = document.getElementById('mistake-text');
  const mistakeList = document.getElementById('mistake-list');

  let mistakeData = JSON.parse(localStorage.getItem('mistakes')) || [];

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    height: 'auto',
    dateClick: function(info) {
      const selectedDate = info.dateStr;
      dateInput.value = selectedDate;
      selectedDateLabel.textContent = selectedDate;
      form.style.display = 'block';
    }
  });

  calendar.render();

  function renderMistakes() {
    mistakeList.innerHTML = '';
    mistakeData.forEach((entry, index) => {
      const li = document.createElement('li');
      li.className = 'mistake-item';
      li.innerHTML = `
        <strong>${entry.date} - ${entry.topic}</strong>
        <p>${entry.mistake}</p>
        <button class="delete-mistake" data-index="${index}">🗑️</button>
      `;
      mistakeList.appendChild(li);
    });
  }

  // Submit new mistake
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const date = dateInput.value;
    const topic = topicInput.value.trim();
    const mistake = textInput.value.trim();

    if (date && topic && mistake) {
      mistakeData.push({ date, topic, mistake });
      localStorage.setItem('mistakes', JSON.stringify(mistakeData));
      renderMistakes();
      form.reset();
      form.style.display = 'none';
    }
  });

  // Delete mistake
  mistakeList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-mistake')) {
      const index = e.target.dataset.index;
      mistakeData.splice(index, 1);
      localStorage.setItem('mistakes', JSON.stringify(mistakeData));
      renderMistakes();
    }
  });

  renderMistakes();
});
