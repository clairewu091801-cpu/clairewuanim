// Get all necessary elements for Video Modal
const videoThumbnails = document.querySelectorAll('.video-thumbnail');
const videoModal = document.getElementById('videoModal');
const modalVideoPlayer = document.getElementById('modalVideoPlayer');
const closeVideoBtn = videoModal.querySelector('.close-button');

// Get all necessary elements for Credits Modal
const creditsButton = document.getElementById('creditsButton');
const creditsModal = document.getElementById('creditsModal');
const closeCreditsBtn = creditsModal.querySelector('.close-button');

// --- VIDEO MODAL FUNCTIONS ---

// Function to open the video modal
function openVideoModal(videoUrl) {
    modalVideoPlayer.src = videoUrl;
    videoModal.style.display = "block";
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Function to close the video modal
function closeVideoModal() {
    modalVideoPlayer.src = ""; // Stop the video
    videoModal.style.display = "none";
    document.body.style.overflow = ''; // Restore scrolling
}

// Attach event listeners to video thumbnails
videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const videoUrl = thumbnail.getAttribute('data-video-url');
        openVideoModal(videoUrl);
    });
});

// --- CREDITS MODAL FUNCTIONS ---

// Function to open the credits modal
function openCreditsModal() {
    creditsModal.style.display = "block";
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Function to close the credits modal
function closeCreditsModal() {
    creditsModal.style.display = "none";
    document.body.style.overflow = ''; // Restore scrolling
}

// Attach event listener to credits button in the footer
creditsButton.addEventListener('click', openCreditsModal);


// --- CLOSE MODALS WHEN CLICKING OUTSIDE ---

window.addEventListener('click', (event) => {
    if (event.target == videoModal) {
        closeVideoModal();
    }
    if (event.target == creditsModal) {
        closeCreditsModal();
    }
});