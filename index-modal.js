document.addEventListener('DOMContentLoaded', () => {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const videoModal = document.getElementById('videoModal');
    const closeButton = document.querySelector('.close-button');
    const modalVideoPlayer = document.getElementById('modalVideoPlayer');

    // Function to open the modal
    function openModal(videoUrl) {
        modalVideoPlayer.src = videoUrl; // Load the video
        videoModal.style.display = 'flex'; // Show the modal (using flex for centering)
        document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
    }

    // Function to close the modal
    function closeModal() {
        modalVideoPlayer.src = ''; // Stop the video by clearing its source
        videoModal.style.display = 'none'; // Hide the modal
        document.body.style.overflow = 'auto'; // Re-enable scrolling on the body
    }

    // Event listeners for opening modal
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const videoUrl = thumbnail.getAttribute('data-video-url');
            if (videoUrl) {
                openModal(videoUrl);
            }
        });
    });

    // Event listener for closing modal via the close button
    closeButton.addEventListener('click', closeModal);

    // Event listener for closing modal by clicking outside the video content
    videoModal.addEventListener('click', (event) => {
        // Check if the click occurred directly on the modal background, not its content
        if (event.target === videoModal) {
            closeModal();
        }
    });

    // Event listener for closing modal with the Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && videoModal.style.display === 'flex') {
            closeModal();
        }
    });
});