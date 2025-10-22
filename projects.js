document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    const projectItems = Array.from(grid.getElementsByClassName('grid-item'));
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // --- Core Filtering Logic ---
    const filterAndSortProjects = () => {
        let projects = [...projectItems];
        const sortType = sortFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        // 1. Filter (Search)
        projects.forEach(item => {
            // Use data-title for searching
            const title = item.getAttribute('data-title').toLowerCase();
            if (title.includes(searchTerm)) {
                item.style.display = 'flex'; // Show match
            } else {
                item.style.display = 'none'; // Hide non-match
            }
        });

        // Get only the currently visible/filtered projects for sorting
        let visibleProjects = projects.filter(item => item.style.display !== 'none');

        // 2. Sort
        visibleProjects.sort((a, b) => {
            const titleA = a.getAttribute('data-title').toUpperCase();
            const titleB = b.getAttribute('data-title').toUpperCase();
            // Use the date string directly for reliable comparison
            const dateA = a.getAttribute('data-date'); 
            const dateB = b.getAttribute('data-date'); 

            if (sortType === 'alphabetical') {
                return titleA.localeCompare(titleB);
            } 
            
            if (sortType === 'newest' || sortType === 'oldest') {
                // Primary sort: Date comparison
                const dateComparison = dateB.localeCompare(dateA); // Newest first

                if (dateComparison !== 0) {
                    // Dates are different, return the date comparison
                    return sortType === 'newest' ? dateComparison : -dateComparison; 
                } else {
                    // Secondary sort: Dates are the same, sort alphabetically
                    return titleA.localeCompare(titleB);
                }
            }
            
            return 0; // Default: no change
        });

        // 3. Re-append sorted elements to the grid
        visibleProjects.forEach(item => grid.appendChild(item));
    };

    // --- Event Listeners ---
    
    // Sort on dropdown change
    sortFilter.addEventListener('change', filterAndSortProjects);

    // Search on button click
    searchButton.addEventListener('click', filterAndSortProjects);

    // Search on Enter key press
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterAndSortProjects();
        }
    });
    
    // Search as user types
    searchInput.addEventListener('input', filterAndSortProjects);

    // Initial load: Set dropdown to 'newest' and execute sort
    sortFilter.value = 'newest';
    filterAndSortProjects();
});