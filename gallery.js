document.addEventListener('DOMContentLoaded', () => {
    const mainVideo = document.getElementById('main-video');
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
    // Base URL for YouTube embeds (we'll add autoplay for click-swaps)
    const baseUrl = 'https://www.youtube.com/embed/'; 

    if (mainVideo && thumbnails.length > 0) {
        
        // Function to update the video and prevent a new history entry
        const loadVideo = (thumbnail) => {
            const videoId = thumbnail.getAttribute('data-video-id');
            // Autoplay=1 is typically used for swapping videos to start immediately
            const newUrl = `${baseUrl}${videoId}?autoplay=1&controls=1&showinfo=0&rel=0`;
            
            // 1. Update the main video player
            mainVideo.src = newUrl;
            
            // 2. Update the active style
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');

            // 3. CRITICAL FIX: Update the URL in the address bar without adding a history entry.
            // This is the most reliable way to prevent the iframe from polluting the history.
            try {
                // Get the base URL of the page without any hash or query parameters
                const cleanUrl = window.location.href.split('#')[0].split('?')[0];
                
                // Add a state to the URL that reflects the current video (optional but good practice)
                const videoTitle = thumbnail.getAttribute('alt').replace(/ /g, '-').toLowerCase();
                
                // Use replaceState to change the URL without adding a new entry
                history.replaceState(null, '', `${cleanUrl}#${videoTitle}`);
            } catch (e) {
                // Ignore errors if running in a restricted environment (e.g., local file://)
                console.warn("Could not update history state.", e);
            }
        };

        // --- Initialization ---

        // 1. Set the initial video and active state
        if (thumbnails[0]) {
            // Note: We set autoplay=0 for the initial load to prevent immediate start
            const initialVideoId = thumbnails[0].getAttribute('data-video-id');
            if (initialVideoId) {
                mainVideo.src = `${baseUrl}${initialVideoId}?autoplay=0&controls=1&showinfo=0&rel=0`;
                thumbnails[0].classList.add('active');
            }
        }
        
        // --- Click Handlers ---

        // 2. Set up click handlers for all thumbnails
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Call the new centralized, history-safe function
                loadVideo(thumbnail);
            });
        });
    }
});