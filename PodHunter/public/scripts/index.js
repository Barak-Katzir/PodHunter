$(document).ready(function () {
    $.getJSON('/podcast', function (data) {
        const sortedPodcasts = data.sort(function (a, b) {
            return b.rank - a.rank;
        });

        for (let i = 0; i < 4; i++) {
            const playlist = JSON.parse(localStorage.getItem('playlist') || '[]');
            const likesList = JSON.parse(localStorage.getItem('likes') || '[]');
            const rankStars = getStars(sortedPodcasts[i].rank);
            const isOnPlaylist = playlist.includes(sortedPodcasts[i].name);
            const isLike = likesList.includes(sortedPodcasts[i].name);
            const likeIcon = isLike ? "fa-solid" : "fa-regular";
            const podcastElement = `
                <div class="col-12 col-md-6 col-lg-3 mb-3">
                    <div class="card item-card h-100">
                        <img src="${sortedPodcasts[i].picture}" class="card-img-top" onclick='redirectToPodcastPage("${sortedPodcasts[i]._id}")'>
                        <div class="card-body d-flex flex-column">
                            <div class="card-text text-center p-2">
                                <h4>${sortedPodcasts[i].name}</h4>
                                ${sortedPodcasts[i].description}
                                <br>Rank: ${rankStars}
                                <br>Category: ${sortedPodcasts[i].category}
                            </div>
                            <div class="mt-auto d-flex justify-content-between">
                                <a href="${sortedPodcasts[i].link}" class="btn btn-outline-success btn-sm flex-fill me-2 d-flex align-items-center justify-content-center" target="_blank" role="button">
                                    Listen Now!
                                </a>
                                <button class="btn btn-outline-success btn-sm" style="width: 140px;" onclick="toggleButton(this)" data-podcast="${sortedPodcasts[i].name}">
                                ${isOnPlaylist ? "Remove!" : "Add To Playlist!"}
                                </button>
                                <button class="btn bg-transparent" onclick="toggleHeart(this)" data-podcast="${sortedPodcasts[i].name}" style="width: 40px;">
                                    <i class="${likeIcon} fa-heart fa-xl" style="color: #ff1500;"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            $('#topPodcasts').append(podcastElement);
        }
    });
});

function redirectToPodcastPage(podcastId) {
    window.location.href = `/podcast.html?id=${podcastId}`;
}