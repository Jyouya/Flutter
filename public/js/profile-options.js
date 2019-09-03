console.log("Profile icons js loaded");

let userId = null;
let userData = null;

// Get the id flag from url 
let query = window.location.href;
if (query.includes("id=")) {
    userID = query.split("id=")[1];
    console.log(userID);
    userData = getUserInfo(userId);
} else {
    console.log("NO ID IN URL!");
    window.location.href = "/login";
}

function getUserInfo(id) {
    return $.get("/api/users?id=" + id, data => {
        userData = data[0];
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
