$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const podcastId = urlParams.get('id');

    $.getJSON(`/podcast/${podcastId}`, function (data) {
        $('#name').val(data.name);
        $('#description').val(data.description);
        $('#rank').val(data.rank);
        $('#category').val(data.category);
        $('#picture').val(data.picture);
        $('#link').val(data.link);
    });

    $('#podcastForm').submit(function (event) {
        event.preventDefault();
        const formData = $(this).serializeArray();

        const jsonData = {};
        formData.forEach(field => {
            jsonData[field.name] = field.value;
        });

        $.ajax({
            url: `/podcast/${podcastId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function (response) {
                window.location = './podcast.html?id=' + podcastId;
            },
            error: function (error) {
                console.error(error)
                alert(error.responseText);
            }
        });
    });
});