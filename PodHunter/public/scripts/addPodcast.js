$(document).ready(function () {
    $('#podcastForm').submit(function (event) {
        event.preventDefault();
        const formData = $(this).serializeArray();

        const jsonData = {};
        formData.forEach(field => {
            jsonData[field.name] = field.value;
        });

        $.ajax({
            url: `/podcast`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function (response) {
                showSuccessToast('Podcast added successfully!');
                const pauseDuration = 2000;
                setTimeout(function () {
                    window.location = './podcast.html?id=' + response._id;
                }, pauseDuration);
            },
            error: function (error) {
                console.error(error)
                alert(error.responseText);
            }
        });
    });
});

function showSuccessToast(message) {
    const toastElement = document.getElementById('toast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastElement);
    toastElement.classList.add("toast-success");
    toast.show();
}