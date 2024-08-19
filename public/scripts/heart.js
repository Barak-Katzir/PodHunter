function toggleHeart(button) {
    const toastEl = document.getElementById('toast');
    const toast = new bootstrap.Toast(toastEl);

    const heartIcon = button.querySelector('i');

    const likesList = JSON.parse(localStorage.getItem('likes') || '[]');
    const name = button.dataset.podcast;
    const isLiked = likesList.includes(name);

    if (isLiked) {
        toastEl.querySelector('.toast-body').textContent = "Removed from my likes!";
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        toastEl.classList.remove("toast-success");
        localStorage.setItem('likes', JSON.stringify(likesList.filter(n => n !== name)));
    } else {
        toastEl.querySelector('.toast-body').textContent = "Added to my likes!";
        toastEl.classList.add("toast-success");
        heartIcon.classList.add('fa-solid');
        heartIcon.classList.remove('fa-regular');
        addEffect(heartIcon);
        localStorage.setItem('likes', JSON.stringify([...likesList, name]));
    }
    toast.show();
}

function addEffect(icon) {
    icon.classList.add('fa-bounce');
    setTimeout((icon) => icon.classList.remove('fa-bounce'), 1500, icon);
}