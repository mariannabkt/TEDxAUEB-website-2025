let allVideos = [];
let currentVideos = [];
let currentPage = 1;
let videosPerPage = 12;

fetch('js/videos.json', {
    method: 'GET'
})
    .then(response => {
        return response.json();
    })
    .then(data => {
        allVideos = data.videos;
        currentVideos = allVideos;
        displayVideos();
    })
    .catch(error => console.error("Error loading JSON:", error));

function displayVideos() {
    let startIndex = (currentPage - 1) * videosPerPage;
    let endIndex = startIndex + videosPerPage;
    let visibleVideos = currentVideos.slice(startIndex, endIndex);
    let htmlContent = '';

    visibleVideos.forEach(video => {
        htmlContent += `
                    <div class="video">
                        <div class="year-bg">
                            <h4 class="year">${video.year}</h4>
                        </div>
                        <img src="${video.thumbnailUrl}" alt="${video.title}">
                        <a target="_blank" href="https://www.youtube.com/watch?v=${video.videoId}">
                            <p class="video-title">${video.title}</p>
                            <div class="btn-bg">
                                <button>Watch <img src="styles/images/video-link-icon.svg"></button>
                            </div>
                        </a>
                    </div>
                `;
    });

    document.getElementById('videos-container').innerHTML = htmlContent;
    updatePagination();
}

document.getElementById("videosPerPage").addEventListener("change", function () {
    videosPerPage = parseInt(this.value);
    currentPage = 1;
    displayVideos();
});

function updatePagination() {
    let totalPages = Math.ceil(currentVideos.length / videosPerPage);
    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;

    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("prevPage").addEventListener("click", function () {
    if (currentPage > 1) {
        currentPage--;
        displayVideos();
    }
});

document.getElementById("nextPage").addEventListener("click", function () {
    if (currentPage < Math.ceil(currentVideos.length / videosPerPage)) {
        currentPage++;
        displayVideos();
    }
});

document.getElementById('event').addEventListener('change', function() {
    const selectedYear = this.value;
    if (selectedYear === "All Events") {
        currentVideos = allVideos;
    }
    else {
        currentVideos = allVideos.filter(video => video.year === selectedYear);
    }
    displayVideos();
});