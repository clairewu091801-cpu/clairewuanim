document.addEventListener('DOMContentLoaded', () => {
    const mainVideo = document.getElementById('main-video');
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
    // Base URL for YouTube embeds (change if using Vimeo, etc.)
    const baseUrl = 'https://www.youtube.com/embed/'; 

    if (mainVideo && thumbnails.length > 0) {
        
        // 1. Set the initial video and active state
        if (thumbnails[0]) {
            thumbnails[0].classList.add('active');
            const initialVideoId = thumbnails[0].getAttribute('data-video-id');
            // Check if the video ID exists before setting the source
            if (initialVideoId) {
                mainVideo.src = `${baseUrl}${initialVideoId}`;
            }
        }
        
        // 2. Set up click handlers for all thumbnails
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const videoId = thumbnail.getAttribute('data-video-id');
                const newUrl = `${baseUrl}${videoId}`;
                
                // Update the main video player
                mainVideo.src = newUrl;
                
                // Update the active style
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });
    }
});
