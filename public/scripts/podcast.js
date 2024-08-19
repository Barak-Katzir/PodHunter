$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const podcastId = urlParams.get('id');

    $("#newCommentDiv").hide();
    $("#editCommentDiv").hide();

    reloadComments();

    $.getJSON(`/podcast/${podcastId}`, function (data) {
        $('#podcast-name').text(data.name);
        $('#podcast-picture').attr('src', data.picture);
        $('#podcast-description').text(data.description);
        $('#podcast-rank').html(getStars(data.rank));
        $('#podcast-category').text(data.category);
        $('#podcast-link').text(data.name);
        $('#podcast-link').attr('href', data.link);
    });

    $('#newCommentForm').submit(function (event) {
        event.preventDefault();
        const formData = $(this).serializeArray();

        const jsonData = {};
        formData.forEach(field => {
            jsonData[field.name] = field.value;
        });

        if (!isValidEmail(jsonData.email)) {
            showFailToast("Please enter a valid email address.");
            return;
        }

        $.ajax({
            url: `/comment/${podcastId}`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function (response) {
                $('#newCommentForm')[0].reset();
                addComment(response);
                reloadComments();
                showSuccessToast('Comment submitted successfully!');
            },
            error: function (error) {
                console.error(error)
                alert(error.responseText);
            }
        });
    });

    $('#editCommentForm').submit(function (event) {
        event.preventDefault();
        const formData = $(this).serializeArray();

        const jsonData = {};
        formData.forEach(field => {
            jsonData[field.name] = field.value;
        });

        const { commentId } = jsonData;
        delete jsonData.commentId;

        if (!isValidEmail(jsonData.email)) {
            showFailToast("Please enter a valid email address.");
            return;
        }

        $.ajax({
            url: `/comment/${commentId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function (response) {
                $('#editCommentForm')[0].reset();
                reloadComments();
                showSuccessToast('Comment edited successfully!');
            },
            error: function (error) {
                console.error(error)
                alert(error.responseText);
            }
        });
    });
});

function deletePodcast() {
    const deleteConfirmationModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));

    document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
        const urlParams = new URLSearchParams(window.location.search);
        const podcastId = urlParams.get('id');

        $.ajax({
            url: `/podcast/${podcastId}`,
            method: 'DELETE',
            success: function (response) {
                deleteConfirmationModal.hide();
                showFailToast("Podcast deleted successfully!");
                const pauseDuration = 2000;
                setTimeout(function () {
                    window.location = './podcasts.html';
                }, pauseDuration);
            },
            error: function (error) {
                console.error(error);
                alert(error.responseText);
            }
        });
    });
    deleteConfirmationModal.show();
}


function redirectToEditPodcastPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const podcastId = urlParams.get('id');
    window.location.href = `/editPodcast.html?id=${podcastId}`;
}

function addComment(comment) {
    $("#newCommentDiv").hide();
    $("#editCommentDiv").hide();
    $('#newCommentForm')[0].reset();
    $('#editCommentForm')[0].reset();
    const commentDate = new Date(comment.date);
    const formattedDate = `${commentDate.getDate().toString().padStart(2, '0')}/` +
        `${(commentDate.getMonth() + 1).toString().padStart(2, '0')}/` +
        `${commentDate.getFullYear()} ` +
        `${commentDate.getHours().toString().padStart(2, '0')}:` +
        `${commentDate.getMinutes().toString().padStart(2, '0')}`;
    const details = [comment.name, comment.email, formattedDate];
    const commentElement = `
<div class="col-12 col-lg-6 mt-3">
    <div class="comment h-100">
        <div class="details p-2 d-flex justify-content-between align-items-center">
            <span>${details.join('  •  ')}</span>
            <div>
            <button class='btn btn-sm mr-3' onclick="editComment('${comment._id}')">Edit</button>
            <button class='btn btn-sm' onclick="deleteComment('${comment._id}')">X</button>
            </div>
        </div>
        <div class='content p-2 h-100'>
            ${comment.text}
        </div>
    </div>
</div>`;

    $('#comments-area').append(commentElement);
}

function openNewCommentForm() {
    $("#newCommentDiv").show();
    $("#editCommentDiv").hide();
}

function closeNewCommentForm() {
    $("#newCommentDiv").hide();
}

function closeNewEditForm() {
    $("#editCommentDiv").hide();
}

function reloadComments() {
    const urlParams = new URLSearchParams(window.location.search);
    const podcastId = urlParams.get('id');
    $('#comments-area').html('')
    $.getJSON(`/comment/${podcastId}`, function (comments) {
        if (comments.length > 0) {
            comments.forEach(addComment);
        } else {
            $('#comments-area').html("<div class='p-1'>There is no comment yet.</div>")
        }
    });
}

function editComment(id) {
    $("#newCommentDiv").hide();
    const urlParams = new URLSearchParams(window.location.search);
    const podcastId = urlParams.get('id');
    $.getJSON(`/comment/${podcastId}/${id}`, function (data) {
        $('#commentIdEdit').val(data._id);
        $('#nameEdit').val(data.name);
        $('#emailEdit').val(data.email);
        $('#textEdit').val(data.text);
        $("#editCommentDiv").show();
    });
}

function deleteComment(id) {
    $.ajax({
        url: `/comment/${id}`,
        method: 'DELETE',
        success: function () {
            reloadComments();
            showFailToast("Comment deleted.")
        },
        error: function (error) {
            console.error(error)
            alert(error.responseText);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
}

function showSuccessToast(message) {
    const toastElement = document.getElementById('toast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastElement);
    toastElement.classList.add("toast-success");
    toast.show();
}

function showFailToast(message) {
    const toastElement = document.getElementById('toast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message;
    const toast = new bootstrap.Toast(toastElement);
    toastElement.classList.remove("toast-success");
    toast.show();
}
