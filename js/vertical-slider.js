let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const timelineItems = document.querySelectorAll('.timeline-item');
const totalSlides = slides.length;
let isScrolling = false;

function changeSlide(index) {
    if (index < 0 || index >= totalSlides || isScrolling) return;

    isScrolling = true;
    currentIndex = index;

    // Scroll the targeted slide into view
    slides[currentIndex].scrollIntoView({
        behavior: 'smooth', // Smooth scroll
        block: 'start', // Align the top of the slide with the top of the viewport
    });

    updateTimeline();

    // Set timeout to match the scroll duration
    setTimeout(() => {
        isScrolling = false;
    }, 800); // Adjust based on your smooth scroll duration
}

function updateTimeline() {
    timelineItems.forEach((item, idx) => {
        if (idx === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function handleScroll(event) {
    if (isScrolling) return; // Prevent overlapping scroll events

    if (event.deltaY > 0) {
        changeSlide(currentIndex + 1); // Scroll down
    } else {
        changeSlide(currentIndex - 1); // Scroll up
    }
}

// Event listeners for mouse wheel, key navigation, and timeline clicks
document.addEventListener('wheel', handleScroll);

// Click events for timeline items
timelineItems.forEach((item, index) => {
    item.addEventListener('click', () => changeSlide(index));
});

// Key navigation (up and down)
document.addEventListener('keydown', function (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        changeSlide(currentIndex + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        changeSlide(currentIndex - 1);
    }
});
