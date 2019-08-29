$(document).ready(() => {
    // Grabs the follow element, and if none found, do nothing 
    const followDiv = $(".who-to-follow") || null;

    // Handle the follow button being pressed
    $(document).on("click", "button.follow", handleFollow);
    
    if (!followDiv.length) return console.log("No suggested follow div detected!");
    else {
        getFollowSuggestions();
    }

    //Handler functions

    // This function handles the "follow" button
    function handleFollow() {
        const userId = $(this).attr("data-user-id");
        console.log(userId);
        // Post to the user's id the new follow
    }

    // General functions

    // This function grabs suggestions based on who the user should follow.
    function getFollowSuggestions() {
        // For later, when we can hook into the api and get suggestions
        // $.get().then(users => displaySuggestions(users))

        // For now, dummy data
        displaySuggestions([
            {
                id: 1,
                username: "Testing123",
                avatar: "https://via.placeholder.com/200"
            }, 
            {
                id: 2,
                username: "Testing12334",
                avatar: "https://via.placeholder.com/200"
            },
            {
                id: 3,
                username: "Testing12334524",
                avatar: "https://via.placeholder.com/300"
            }
        ]);
    }

    function displaySuggestions(suggestedUsers) {
        let list = $(".list");
        console.log(list)
        suggestedUsers.forEach(user => {
            followDiv.append(`<div class="p-2 bd-top" style="display: flex; align-items: center;">
            
                <div class="avatar-container mr-2">
                    <img src="${user.avatar}" alt="${user.username}" onerror="this.src='/images/blank-avatar.jpg';" />
                </div>
                <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${user.username}</div>
                <button class="button follow" data-user-id="${user.id}" style="margin-left: auto">Follow</button>
            </div>`);
        })
    }
});