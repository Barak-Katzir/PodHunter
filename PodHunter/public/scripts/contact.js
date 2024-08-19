$(document).ready(function () {
    const toastElList = document.getElementById('alert');
    const modal = new bootstrap.Modal(document.getElementById('myModal'))
    const toast = new bootstrap.Toast(toastElList);
    $("#contactForm").submit(function (e) {
        e.preventDefault();

        let name = $("#name").val();
        let email = $("#email").val();
        let message = $("#message").val();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name == "" || email == "" || message == "") {
            toastElList.querySelector('.toast-body').textContent = "Please fill out all fields.";
            toastElList.classList.remove("toast-success");
            toast.show();
        } else if (!emailRegex.test(email)) {
            toastElList.querySelector('.toast-body').textContent = "Please enter a valid email address.";
            toastElList.classList.remove("toast-success");
            toast.show();
        } else {
            toastElList.querySelector('.toast-body').textContent = "Success! Your message has been sent.";
            toastElList.classList.add("toast-success");
            toastElList.querySelector(".btn-close");

            $.ajax({
                url: `/message`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: name,
                    email: email,
                    content: message
                }),
                success: function (response) {
                    showSuccessToast('Message added successfully!');
                },
                error: function (error) {
                    console.error(error)
                    alert(error.responseText);
                }
            });
            toast.show();
            modal.show();
        }
    });
});
