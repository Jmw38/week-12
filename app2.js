const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API URL

document.addEventListener('DOMContentLoaded', () => {
  const addSportForm = document.getElementById('addSportForm');
  const sportList = document.getElementById('sportList');

  // Fetch existing sports from the API and display them
  function fetchAndDisplaySports() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(sports => {
        sportList.innerHTML = ''; // Clear previous content
        sports.forEach(sport => {
          const sportItem = document.createElement('div');
          sportItem.classList.add('sport-item');
          sportItem.innerHTML = `
            <p>${sport.title}</p>
            <button class="delete-btn" data-id="${sport.id}">Delete</button>
          `;
          sportList.appendChild(sportItem);
        });
      });
  }

  // Initial fetch and display
  fetchAndDisplaySports();

  // Add sport form submission
  addSportForm.addEventListener('submit', event => {
    event.preventDefault();
    const sportName = document.getElementById('sportName').value;
    if (sportName) {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: sportName })
      })
        .then(response => response.json())
        .then(() => {
          document.getElementById('sportName').value = ''; // Clear input field
          fetchAndDisplaySports(); // Refresh sport list
        });
    }
  });

  // Delete sport
  sportList.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')) {
      const sportId = event.target.dataset.id;
      fetch(`${apiUrl}/${sportId}`, { method: 'DELETE' })
        .then(() => fetchAndDisplaySports()); // Refresh sport list after deletion
    }
  });
});

  