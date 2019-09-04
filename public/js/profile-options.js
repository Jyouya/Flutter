console.log("Profile icons js loaded");

let userId = null;
let userData = null;

// Get the id flag from url 
let query = window.location.href;
if (query.includes("id=")) {
    userId = query.split("id=")[1];
    console.log(userId);
    userData = getUserInfo(userId);
} else {
    console.log("NO ID IN URL!");
    window.location.href = "/login";
}

function getUserInfo(id) {
    return $.get("/api/users/me", data => {
        console.log("ME data: ", data)
        userData = data;
        autofillForms();
    });
}

// Is called after getting user info
function autofillForms() {
    console.log(userData);
    $("#email-input").val(userData.email);
    $("#username-input").val(userData.username);
    $("#avatarImg-input").val(userData.avatarImg);
    $("#bannerImg-input").val(userData.bannerImg);
    $("#bio-input").val(userData.bio);
}


// Putting to api
$("form").submit(function(event) {
    event.preventDefault()
    let data = $(this).serialize();
    console.log("Information to put: ", data)
    $.ajax({
        url: '/api/users',
        method: "PUT",
        data: data
    }).then(function() {
        window.location.href = "/profile"
    }).catch(function (data) {
        console.log(data.responseJSON)
        data.responseJSON.errors.forEach(function (error) {
            console.log(error.path);
            console.log(error.message);
            const inputElement = $(`input[name="${error.path}"]`);
            inputElement.addClass("flash-input-class");
            setTimeout(() => {
                inputElement.removeClass("flash-input-class");
            }, 1000);
        });
    });
})