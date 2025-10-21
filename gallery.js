document.addEventListener('DOMContentLoaded', () => {
    // Select the main elements once
    const mainVideoContainer = document.querySelector('.main-video-container');
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
    const iframeId = 'main-video'; // ID of the iframe
    const baseUrl = 'https://www.youtube.com/embed/'; 

    if (mainVideoContainer && thumbnails.length > 0) {
        
        // --- Centralized function to load video by replacing the IFRAME ---
        const loadVideo = (thumbnail, autoplay = 1) => {
            const videoId = thumbnail.getAttribute('data-video-id');
            const newSrc = `${baseUrl}${videoId}?autoplay=${autoplay}&controls=1&showinfo=0&rel=0`;
            
            // 1. Create a brand new IFRAME element
            const newIframe = document.createElement('iframe');
            newIframe.id = iframeId;
            newIframe.width = "100%";
            newIframe.height = "100%";
            newIframe.title = "Project Video Player";
            newIframe.frameBorder = "0";
            newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            newIframe.allowFullscreen = true;
            newIframe.src = newSrc; // Set the source

            // 2. Replace the old IFRAME with the new one
            const oldIframe = document.getElementById(iframeId);
            if (oldIframe) {
                mainVideoContainer.replaceChild(newIframe, oldIframe);
            } else {
                mainVideoContainer.appendChild(newIframe);
            }
            
            // 3. Update the active style
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');

            // 4. History Fix: Replace the URL hash without adding a history entry.
            try {
                const cleanUrl = window.location.href.split('#')[0].split('?')[0];
                const videoTitle = thumbnail.getAttribute('alt').replace(/ /g, '-').toLowerCase();
                history.replaceState(null, '', `${cleanUrl}#${videoTitle}`);
            } catch (e) {
                console.warn("History API failure.", e);
            }
        };

        // --- Initialization (Initial Load) ---

        // 1. Set the initial video and active state
        if (thumbnails[0]) {
            // Load the first video, setting autoplay=0 for silent start
            loadVideo(thumbnails[0], 0); 
        }
        
        // --- Click Handlers ---

        // 2. Set up click handlers for all thumbnails
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Load subsequent videos, setting autoplay=1 for immediate start
                loadVideo(thumbnail, 1); 
            });
        });
    }
});