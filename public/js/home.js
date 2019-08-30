// Global Flags
let validNewPost = false;
const postsContainer = $(".posts");

// Run by default

showPosts([
    { 
        id: "1",
        body: "😄😄😅😅😄😄😄😅😅😄😄😄🤑🤑😄😄😅😄🤑🤑🤑🤑🤑🤐🤐🤐🤐🤐",
        createdAt: "2019-08-30 14:34:46",
        user: {
            username: "😄",
            avatarImg: "https://via.placeholder.com/200"
        }
    },
    { 
        id: "2",
        body: "😄😄😅😅😄😄😄😅😅😄😄😄🤑🤑😄😄😅😄🤑🤑🤑🤑🤑🤐🤐🤐🤐🤐",
        createdAt: "2019-08-30 14:34:46",
        user: {
            username: "😄",
            avatarImg: "https://via.placeholder.com/200"
        }
    },
    { 
        id: "3",
        body: "😄😄😅😅😄😄😡😡😡😡😡😡😡😡😡😅😄🤑🤑🤑🤑🤑😡😡😡🤐🤐🤐🤐🤐",
        createdAt: "2019-08-30 14:34:46",
        user: {
            username: "🤫",
            avatarImg: "https://via.placeholder.com/200"
        }
    },
    { 
        id: "4",
        body: "😄😄😅😅😄😄😄😅😅😄😄😄🤑🤑😄😄😅😄🤑🤑🤑🤑🤑🤐🤐🤐🤐🤐",
        createdAt: "2019-08-30 14:34:46",
        user: {
            username: "🤨",
            avatarImg: "https://via.placeholder.com/200"
        }
    }
]);

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

function showPosts(posts) {
    posts.forEach(post => {
        postsContainer.prepend(`
        <div class="post bd-bottom hover-fade p-3">
            <div class="avatar-container">
                <img src="${post.user.avatarImg}" alt="${post.user.username}" onerror="this.src='/images/blank-avatar.jpg';" />
            </div>
            <div class="post-content pl-3">
                <div class="poster-information">
                    <span class="text-bold">${post.user.username}</span>
                    <span class="text-fine ml-1">${post.createdAt} (use moment on this)</span>
                    <span class="dropdown text-fine cursor-pointer ml-1 p-1" style="margin-left: auto;"><i class="fas fa-chevron-down"></i></span>
                </div>
                <div class="post-content mb-2">${post.body}</div>
                <div class="post-actions">
                    <a href="javascript:likePost(${post.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22.559" height="19.744"
                            viewBox="0 0 22.559 19.744">
                            <path id="heart-regular"
                                d="M20.2,33.4a6.637,6.637,0,0,0-8.918.661A6.632,6.632,0,0,0,2.362,33.4a6.666,6.666,0,0,0-.467,9.746l7.728,7.874a2.314,2.314,0,0,0,3.313,0l7.728-7.874A6.671,6.671,0,0,0,20.2,33.4Zm-1.04,8.261-7.728,7.874a.181.181,0,0,1-.3,0L3.4,41.663a4.544,4.544,0,0,1,.322-6.64,4.467,4.467,0,0,1,6.014.463l1.542,1.573,1.542-1.573a4.464,4.464,0,0,1,6.014-.467A4.563,4.563,0,0,1,19.157,41.663Z"
                                transform="translate(0 -31.978)" fill="#63376b" />
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
