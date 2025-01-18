document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const duration = 2000; // Total duration in milliseconds (2 seconds)

    // Create an Intersection Observer to detect when the counters are visible
    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.5 // Trigger when 50% of the counter is visible
    };

    const startCounting = (counter) => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || ""; // Get the suffix, default to empty
        const updateInterval = duration / target; // Time per increment

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = count + 1;
                setTimeout(updateCount, updateInterval);
            } else {
                counter.innerText = target + suffix; // Add suffix after counting is complete
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the counting effect when the element becomes visible
                startCounting(entry.target);
                // Stop observing once the effect starts
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each counter element
    counters.forEach(counter => {
        observer.observe(counter);
    });
});
