let messages;

$(document).ready(function () {
    $("#editMessageDiv").hide();

    reloadMessages()

    $("#searchInput").on('keyup', function () {
        search($(this).val());
    });

    $('#editMessageForm').submit(function (event) {
        event.preventDefault();
        const formData = $(this).serializeArray();

        const jsonData = {};
        formData.forEach(field => {
            jsonData[field.name] = field.value;
        });

        const { messageId } = jsonData;
        delete jsonData.messageId;

        if (!isValidEmail(jsonData.email)) {
            showFailToast("Please enter a valid email address.");
            return;
        }

        $.ajax({
            url: `/message/${messageId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function (response) {
                $('#editMessageForm')[0].reset();
                $("#searchInput").val("")
                reloadMessages();
                showSuccessToast('Message edited successfully!');
            },
            error: function (error) {
                console.error(error)
                alert(error.responseText);
            }
        });
    });
});

function search(word) {
    console.log(JSON.stringify(messages))
    $('#messages-area').empty();
    const term = word.trim().toLowerCase();
    const filteredMessages = messages.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.content.toLowerCase().includes(term)
    );
    for (let i = 0; i < filteredMessages.length; i++) {
        const message = filteredMessages[i]
        addMessage(message)
    }
}

function closeNewEditForm() {
    $("#editMessageDiv").hide();
}

function editMessage(id) {
    $.getJSON(`/message/${id}`, function (data) {
        $('#messageIdEdit').val(data._id);
        $('#nameEdit').val(data.name);
        $('#emailEdit').val(data.email);
        $('#textEdit').val(data.content);
        $("#editMessageDiv").show();
    });
}

function deleteMessage(id) {
    $.ajax({
        url: `/message/${id}`,
        method: 'DELETE',
        success: function () {
            reloadMessages();
            showFailToast("Message deleted!")
            $("#searchInput").val("")
        },
        error: function (error) {
            console.error(error)
            alert(error.responseText);
        }
    });
}

function addMessage(message) {
    $("#editMessageDiv").hide();
    $('#editMessageForm')[0].reset();

    const messageDate = new Date(message.date);
    const formattedDate = `${messageDate.getDate().toString().padStart(2, '0')}/` +
        `${(messageDate.getMonth() + 1).toString().padStart(2, '0')}/` +
        `${messageDate.getFullYear()} ` +
        `${messageDate.getHours().toString().padStart(2, '0')}:` +
        `${messageDate.getMinutes().toString().padStart(2, '0')}`;
    const details = [message.name, message.email, formattedDate];
    const messageElemnt = `
        <div class="col-12 col-lg-6 mt-3">
            <div class="message h-100">
                <div class="details p-2 d-flex justify-content-between align-items-center">
                    <span>${details.join('  •  ')}</span>
                    <div>
                    <button class='btn btn-sm mr-3' onclick="editMessage('${message._id}')">Edit</button>
                    <button class='btn btn-sm' onclick="deleteMessage('${message._id}')">X</button>
                    </div>
                </div>
                <div class='content p-2 h-100'>
                    ${message.content}
                </div>
            </div>
        </div>`;

    $('#messages-area').append(messageElemnt);
}

function reloadMessages() {
    $('#messages-area').html('')
    $.getJSON(`/message`, function (messagesRes) {
        messages = messagesRes
        if (messages.length > 0) {
            messages.forEach(addMessage);
        } else {
            $('#messages-area').html("<div class='p-1'>There is no message yet.</div>")
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