let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const timelineItems = document.querySelectorAll('.timeline-item');
const totalSlides = slides.length;
let isScrolling = false;

function changeSlide(index) {
    if (index < 0 || index >= totalSlides || isScrolling) return;

    isScrolling = true;
    currentIndex = index;

    const slider = document.querySelector('.slider');
    const offset = -currentIndex * 100;
    slider.style.transform = `translateY(${offset}vh)`;

    updateTimeline();

    setTimeout(() => {
        isScrolling = false;
    }, 800); // Match this timeout with CSS transition duration
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
    if (event.deltaY > 0) {
        changeSlide(currentIndex + 1); // Scroll down
    } else {
        changeSlide(currentIndex - 1); // Scroll up
    }
}

document.addEventListener('wheel', handleScroll);

// Add click events to timeline items
timelineItems.forEach((item, index) => {
    item.addEventListener('click', () => changeSlide(index));
});



function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSliderPosition();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
}

function updateSliderPosition() {
    const slider = document.querySelector('.slider');
    const offset = -currentIndex * 100;
    slider.style.transform = `translateY(${offset}%)`;
}

// Optional: Add navigation (optional)
document.addEventListener('keydown', function(e) {
    if (e.key === "ArrowDown") {
        nextSlide();
    } else if (e.key === "ArrowUp") {
        prevSlide();
    }
});
