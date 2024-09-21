    document.addEventListener('DOMContentLoaded', function () {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        const body = document.body;

        // Check for dark mode preference in local storage
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
        }

        // Dark mode toggle functionality
        darkModeToggle.addEventListener('click', function () {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            } else {
                body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            }
        });

        // Responsive menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    });



    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('suggestions');
    const clearHistoryButton = document.getElementById('clearHistory');

    // Maximum number of stored searches
    const maxStoredSearches = 5;

    // Load previous searches from local storage
    let previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];

    // Function to save searches to local storage with a limit
    function saveSearches() {
        if (previousSearches.length > maxStoredSearches) {
            previousSearches.shift(); // Remove the oldest search
        }
        localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
    }

    // Function to update suggestions based on input
    function updateSuggestions() {
        const query = searchInput.value.toLowerCase();
        suggestionsContainer.innerHTML = '';

        if (query) {
            const filteredSearches = previousSearches.filter(search => search.toLowerCase().includes(query));

            filteredSearches.forEach(search => {
                const suggestionItem = document.createElement('div');
                suggestionItem.innerHTML = `<span>${search}</span><span class="delete-icon" data-search="${search}">&times;</span>`;

                suggestionItem.querySelector('.delete-icon').addEventListener('click', (event) => {
                    event.stopPropagation();
                    removeSearch(event.target.dataset.search);
                });

                suggestionItem.addEventListener('click', () => {
                    searchInput.value = search;
                    suggestionsContainer.innerHTML = '';
                });

                suggestionsContainer.appendChild(suggestionItem);
            });
        }
    }

    // Function to remove a specific search term
    function removeSearch(search) {
        previousSearches = previousSearches.filter(item => item !== search);
        saveSearches();
        updateSuggestions();
    }

    searchInput.addEventListener('input', updateSuggestions);

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm && !previousSearches.includes(searchTerm)) {
                previousSearches.push(searchTerm);
                saveSearches();
            }
            suggestionsContainer.innerHTML = '';
            searchInput.value = '';
            console.log('Searching for:', searchTerm);
        }
    });

    clearHistoryButton.addEventListener('click', function () {
        previousSearches = [];
        localStorage.removeItem('previousSearches');
        suggestionsContainer.innerHTML = '';
    });

     // JavaScript to toggle dark mode
     const darkModeToggle = document.getElementById('darkModeToggle');
     const body = document.body;

     darkModeToggle.addEventListener('click', () => {
         body.classList.toggle('dark-mode');
     });
