// Global Flags
let validNewPost = false;

// Run by default

// Listeners
$(".new-post-input-field").on("input", checkNewPostData);
$(document).on("click", "#submit-post-button", handleSubmitPost);

// Handler functions

// This functions handles adding a new post button
function handleSubmitPost() {
    const postData = {
        body: $("textarea.new-post-input-field").val()
    };
    console.log(postData);
}

// Page functions

// This handles when the user likes a post
function likePost(id) {
    console.log("Liking post ", id);
    // make a HTTP post to the likes table
}

// This handles when the user likes a post
function replyPost(id) {
    console.log("Replying to post ", id);
    // make a HTTP post to the likes table
}

// This function checks the user's inputted data
function checkNewPostData() {
    const input = $(this).val();
    if (/([A-Z]|[a-z])/g.test(input)) validNewPost = true;
    else validNewPost = false;

    updateButton();
}

function updateButton() {
    if (validNewPost) $("#submit-post-button").removeAttr("disabled");
    else $("#submit-post-button").attr("disabled", "");
}
