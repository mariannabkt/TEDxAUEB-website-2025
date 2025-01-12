var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    mousewheel: true,
    keyboard: true,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    },
    on: {
        reachEnd: function () {
            // Allow scrolling after the last slide by triggering page scroll
            document.body.style.overflow = 'auto'; // Enable scrolling after the last slide
        },
        reachBeginning: function () {
            // Allow scrolling before the first slide as well
            document.body.style.overflow = 'auto'; // Enable scrolling before the first slide
        },
    },
});

// Custom mousewheel event for desktop scroll
document.querySelector('.swiper').addEventListener('wheel', function (e) {
    if (swiper.isEnd && e.deltaY > 0) {
        // If at the end of the swiper and the user tries to scroll down, allow scrolling to the next section
        e.preventDefault();
        window.scrollBy(0, e.deltaY); // Scroll the page normally
    }
    else if (swiper.isBeginning && e.deltaY < 0) {
        // If at the beginning of the swiper and the user tries to scroll up, allow scrolling to the previous section
        e.preventDefault();
        window.scrollBy(0, e.deltaY); // Scroll the page normally
    }
});

// Get all the timeline items
const timelineItems = document.querySelectorAll('.timeline-item');

// Add click event listeners to each timeline item
timelineItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        // Move to the corresponding slide based on index
        swiper.slideTo(index);
    });
});

// Update active timeline item when slide changes
swiper.on('slideChange', function() {
    // Remove 'active' class from all timeline items
    timelineItems.forEach(item => item.classList.remove('active'));
    
    // Add 'active' class to the current timeline item based on the current slide index
    timelineItems[swiper.activeIndex].classList.add('active');
});
