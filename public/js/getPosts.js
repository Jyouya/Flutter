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
                        <svg class="fill like-btn" id="like-${post.id}" data-state="${post.Liked ? 'liked' : 'unliked'}" xmlns="http://www.w3.org/2000/svg" width="24.559" height="21.747" viewBox="0 0 24.559 21.747">
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