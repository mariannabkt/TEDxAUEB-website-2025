window.addEventListener('scroll', function () {
    document.querySelectorAll('.scroll-section').forEach(section => {
        const teamImg = section.querySelector('.team-img');
        const teamTitleMult = section.querySelector('.team-title-mult');

        if (!teamImg || !teamTitleMult) return; // Skip if missing elements

        // Get the position of the image and title on the page
        const imgRect = teamImg.getBoundingClientRect();
        const titleRect = teamTitleMult.getBoundingClientRect();

        // Calculate how much the title overlaps the image
        const titleHeight = titleRect.height;

        // Calculate the top and bottom of the title relative to the image
        const topOffset = Math.max(0, titleRect.bottom - imgRect.top);
        const bottomOffset = Math.max(0, imgRect.bottom - titleRect.top);

        // Ensure values are within bounds
        let clipTop = Math.min(titleHeight - topOffset, titleHeight);
        let clipBottom = Math.min(titleHeight - bottomOffset, titleHeight);

        // Apply the clip-path dynamically
        teamTitleMult.style.clipPath = `inset(${clipTop}px 0 ${clipBottom}px 0)`;
    });
});
