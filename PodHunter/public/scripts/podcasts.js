let podcasts;

$(document).ready(function () {
    $.getJSON('/podcast', function (data) {
        podcasts = data;
        search("");
    });

    $("#searchInput").on('keyup', function () {
        search($(this).val());
    });
});

function search(word) {
    $('#podcasts').empty();
    const playlist = JSON.parse(localStorage.getItem('playlist') || '[]');
    const likeslist = JSON.parse(localStorage.getItem('likes') || '[]');
    const term = word.trim().toLowerCase();
    const filteredPodcasts = podcasts.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
    for (let i = 0; i < filteredPodcasts.length; i++) {
        const rankStars = getStars(filteredPodcasts[i].rank);
        const isOnPlaylist = playlist.includes(filteredPodcasts[i].name);
        const isLike = likeslist.includes(filteredPodcasts[i].name);
        const likeIcon = isLike ? "fa-solid" : "fa-regular";
        const podcastElement = `
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <div class="card item-card h-100">
                    <img src="${filteredPodcasts[i].picture}" class="card-img-top" onclick='redirectToPodcastPage("${filteredPodcasts[i]._id}")'>
                    <div class="card-body d-flex flex-column">
                        <div class="card-text text-center p-2">
                            <h4>${filteredPodcasts[i].name}</h4>
                            ${filteredPodcasts[i].description}
                            <br>Rank: ${rankStars}
                            <br>Category: ${filteredPodcasts[i].category}
                        </div>
                        <div class="mt-auto d-flex justify-content-between">
                            <a href="${filteredPodcasts[i].link}" class="btn btn-outline-success flex-fill me-2 d-flex align-items-center justify-content-center" target="_blank" role="button">
                                Listen Now!
                            </a>
                            <button id="addPlaylist" class="btn btn-outline-success flex-fill" onclick="toggleButton(this)" data-podcast="${filteredPodcasts[i].name}">
                            ${isOnPlaylist ? "Remove!" : "Add To Playlist!"}
                        </button>                        
                            <button class="btn mx-auto mt-auto bg-transparent" onclick="toggleHeart(this)" data-podcast="${filteredPodcasts[i].name}">
                                <i class="${likeIcon} fa-heart fa-2xl" style="color: #ff1500;"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('#podcasts').append(podcastElement);
    }
}

function redirectToPodcastPage(podcastId) {
    window.location.href = `/podcast.html?id=${podcastId}`;
}