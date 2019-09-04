// Global Flags
let view = null;
let userId = null;
let userData = null;
let userLikes = null;

// Gets user's profile data
const me = $.get("/api/users/me");

const postsContainer = $("#user-flutters");
const likedPostsContainer = $("#user-likes");

// Get the id flag from url 
let query = window.location.href;
if (query.includes("id=")) {
    userId = query.split("id=")[1];
    loadInfo();
    loadLikedPosts();
} else {
    console.log("NO ID IN URL!")
}

// Click handlers
$(document).on("click", ".switch-view-button", handleSwitchView);

// Gets user profile information for the query url
function getUser() {
    console.log("Requesting GET from: /api/users?user=" + userId);
    return $.get("/api/users?user=" + userId, data => {
        console.log("retreived data for: ", data[0]);
        userData = data;
    });
}

// Gets the users liked posts
function getUserLikes() {
    const queryUrl = "/api/likes/user/" + userId;
    console.log("Requesting GET likes from:", queryUrl);
    return $.get(queryUrl, data => {
        console.log("retreived likes data for: ", data);
        userLikes = data;
    });
}

// Click Handler Functions
// This function handles the switch view click and function
function handleSwitchView() {
    const switchTo = $(this).attr("data-view")
    console.log("Switching to view: ", switchTo);
    switchView(switchTo);
}

// Page functions
// This function switches the view of the profile page 
function switchView(switchTo) {
    // Grabs the containing divs
    const flutters = $("#user-flutters");
    const likes = $("#user-likes");

    // Grabs the buttons to modify styling
    const fluttersBtn = $(".switch-view-button[data-view='Flutters']");
    const likesBtn = $(".switch-view-button[data-view='Likes']");

    if (!switchTo) return console.log("switchView needs a value!");
    if (switchTo === "Flutters") {
        // Switch the display properties
        flutters.css("display", "unset");
        likes.css("display", "none");

        // ... and update the buttons
        likesBtn.removeAttr("active");
        fluttersBtn.attr("active", "");
    } if (switchTo === "Likes") {
        likes.css("display", "unset");
        flutters.css("display", "none");

        fluttersBtn.removeAttr("active");
        likesBtn.attr("active", "");
    } else return console.log("switchView had an invalid value passed!");
}

// Load the user's info based on the id in the url to the dom
async function loadInfo() {
    await (getUser()).then(function (user) {
        user = user[0]; // goes into the array and gets first object from retreived data
        // Profile Main
        $("#title").text(`${user.username}'s Profile`)
        $(document).find(".user-display-name").text(user.username);
        $("#user-flutter-count").text(user.Posts.length);
        $(".banner-image").attr("src", user.bannerImg);
        $("#user-avatar").attr("src", user.avatarImg);
        $("#user-bio").text(user.bio);

        // Show posts
        showPosts(user);

        // Show liked posts
        // someFunction()
    })
}

async function loadLikedPosts() {
    await (getUserLikes().then(function (posts) {
        posts.forEach(post => {
            console.log("liked post: ", post);
            console.log("Checking: ", userId, post.User.id)
            if (userId != post.Post.User.id) prependToLikes(post);
        })
    }))
}

function showPosts(user) {
    console.log(user);
    user.Posts.forEach(post => {
        const date = new Date(post.createdAt);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let time = date.getHours();
        let timeOfDay = "AM";

        if (time > 12) {
            time -= 12;
            timeOfDay = "PM";
        }

        postsContainer.prepend(`
        <div class="post bd-bottom hover-fade p-3">
            <div class="avatar-container">
                <img src="${user.avatarImg}" alt="${user.username}" onerror="this.src='/images/blank-avatar.jpg';" />
            </div>
            <div class="post-content pl-3">
                <div class="poster-information">
                    <span class="text-bold">${user.username}</span>
                    <span class="text-fine ml-1">${months[date.getMonth()]} ${date.getDate()} at ${time}:${(date.getMinutes()<10?'0':'') + date.getMinutes()} ${timeOfDay}</span>
                    <span class="dropdown text-fine cursor-pointer ml-1 p-1" style="margin-left: auto;"><i class="fas fa-chevron-down"></i></span>
                </div>
                <div class="post-content mb-2">${post.content}</div>
                <div class="post-actions">
                    <a href="javascript:likePost(${post.id})">
                        <svg class="fill like-btn" data-state="unliked" xmlns="http://www.w3.org/2000/svg" width="24.559" height="21.747" viewBox="0 0 24.559 21.747">
                            <path id="Union_10" data-name="Union 10" d="M9.623,19.044,1.895,11.17a6.667,6.667,0,0,1,.467-9.746,6.632,6.632,0,0,1,8.918.661A6.636,6.636,0,0,1,20.2,1.424a6.671,6.671,0,0,1,.467,9.751l-7.728,7.874a2.315,2.315,0,0,1-3.313,0Z" transform="translate(1 1.003)"/>
                        </svg>
                    </a>
                    <a href="javascript:replyPost(${post.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23.727" height="22.198"
                            viewBox="0 0 23.727 22.198">
                            <path id="Path_1" data-name="Path 1"
                                d="M666.885-951.019c.026,0,0-6.463,0-6.463l-9.32,9.32,9.32,9.32v-6.284s7.651-.285,7.761,3.66c.039,1.4-1.162,2.939-.13,3.971s4.776-2.154,4.776-6.229c0-3.876-2.644-6.976-11.053-7.271C667.8-951.011,667.35-951.019,666.885-951.019Z"
                                transform="translate(-656.565 958.482)" fill="none" stroke="#63376b"
                                stroke-linecap="square" stroke-linejoin="round" stroke-width="2" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        `);
    })
}

function prependToLikes(postData) {

    const date2 = new Date(postData.Post.createdAt);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let time = date2.getHours(); 
    let timeOfDay = "AM";

    if (time > 12) {
        time -= 12;
        timeOfDay = "PM";
    }

    likedPostsContainer.prepend(`
        <div class="post bd-bottom hover-fade p-3">
            <div class="avatar-container">
                <img src="${postData.Post.User.avatarImg}" alt="${postData.Post.User.username}" onerror="this.src='/images/blank-avatar.jpg';" />
            </div>
            <div class="post-content pl-3">
                <div class="poster-information">
                    <span class="text-bold">${postData.Post.User.username}</span>
                    <span class="text-fine ml-1">${months[date2.getMonth()]} ${date2.getDate()} at ${time}:${(date2.getMinutes()<10?'0':'') + date2.getMinutes()} ${timeOfDay}</span>
                    <span class="dropdown text-fine cursor-pointer ml-1 p-1" style="margin-left: auto;"><i class="fas fa-chevron-down"></i></span>
                </div>
                <div class="post-content mb-2">${postData.Post.content}</div>
                <div class="post-actions">
                    <a href="javascript:likePost(${postData.Post.id})">
                        <svg class="fill like-btn" data-state="unliked" xmlns="http://www.w3.org/2000/svg" width="24.559" height="21.747" viewBox="0 0 24.559 21.747">
                            <path id="Union_10" data-name="Union 10" d="M9.623,19.044,1.895,11.17a6.667,6.667,0,0,1,.467-9.746,6.632,6.632,0,0,1,8.918.661A6.636,6.636,0,0,1,20.2,1.424a6.671,6.671,0,0,1,.467,9.751l-7.728,7.874a2.315,2.315,0,0,1-3.313,0Z" transform="translate(1 1.003)"/>
                        </svg>
                    </a>
                    <a href="javascript:replyPost(${postData.Post.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23.727" height="22.198"
                            viewBox="0 0 23.727 22.198">
                            <path id="Path_1" data-name="Path 1"
                                d="M666.885-951.019c.026,0,0-6.463,0-6.463l-9.32,9.32,9.32,9.32v-6.284s7.651-.285,7.761,3.66c.039,1.4-1.162,2.939-.13,3.971s4.776-2.154,4.776-6.229c0-3.876-2.644-6.976-11.053-7.271C667.8-951.011,667.35-951.019,666.885-951.019Z"
                                transform="translate(-656.565 958.482)" fill="none" stroke="#63376b"
                                stroke-linecap="square" stroke-linejoin="round" stroke-width="2" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `);
}