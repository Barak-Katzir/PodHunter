function toggleButton(button) {
    const toastEl = document.getElementById('toast');
    const toast = new bootstrap.Toast(toastEl);
    const playlist = JSON.parse(localStorage.getItem('playlist') || '[]');
    const name = button.dataset.podcast;

    const isFavorite = playlist.includes(name);

    if (isFavorite) {
        toastEl.querySelector('.toast-body').textContent = "Removed from my playlist!";
        toastEl.classList.remove("toast-success");
        button.textContent = "Add To Playlist!";
        localStorage.setItem('playlist', JSON.stringify(playlist.filter(n => n !== name)));
    } else {
        toastEl.querySelector('.toast-body').textContent = "Added to my playlist!";
        toastEl.classList.add("toast-success");
        button.textContent = "Remove!";
        localStorage.setItem('playlist', JSON.stringify([...playlist, name]));
    }
    toast.show();
}