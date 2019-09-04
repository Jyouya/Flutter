const postsContainer = $(".posts");

function getPosts(options = {}) {
    let queryCount = "";
    if (options.count) queryCount = `${options.count}`;

    let queryUser = "";
    if (options.userId) queryUser = `${options.userId}`;

    const query = new URLSearchParams ({
        count: queryCount,
        user: queryUser
    }).toString();

    console.log("Getting posts with options: ", options, "\nAnd query: ", query);

    return $.get("/api/posts?" + query);
}

const posts = getPosts({});
showPosts();

async function showPosts() {
    (await posts).forEach(post => {
        const date = new Date(post.createdAt);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let time = date.getHours();
        let timeOfDay = "AM";

        if (time > 12) {
            time -= 12;
            timeOfDay = "PM";
        }
        
        postsContainer.append(`
        <div class="post bd-bottom hover-fade p-3" data-post-id="${post.id}" id="post-${post.id}">
            <a href="/profile?id=${post.User.id}">
                <div class="avatar-container">
                    <img src="${post.User.avatarImg || ''}" alt="${post.User.username}" onerror="this.src='/images/blank-avatar.jpg';" />
                </div>
            </a>
            <div class="post-content pl-3">
                <div class="poster-information">
                    <span class="text-bold">${post.User.username}</span>
                    <span class="text-fine ml-1">${months[date.getMonth()]} ${date.getDate()} at ${time}:${(date.getMinutes()<10?'0':'') + date.getMinutes()} ${timeOfDay}</span>
                    <span class="dropdown text-fine cursor-pointer ml-1 p-1" style="margin-left: auto;"><i class="fas fa-chevron-down"></i></span>
                </div>
                <div class="post-content mb-2">${post.content}</div>
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