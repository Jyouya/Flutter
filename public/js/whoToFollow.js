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
    async function handleFollow() {
        const userId = $(this).attr("data-user-id");
        console.log(userId);
        await $.post(`/api/follows/${userId}`);
        $(this).parent().remove();

        // Post to the user's id the new follow
    }

    // General functions

    // This function grabs suggestions based on who the user should follow.
    async function getFollowSuggestions() {
        // For later, when we can hook into the api and get suggestions
        // $.get().then(users => displaySuggestions(users))
        console.log(await me);
        if (await me) {
            displaySuggestions(await $.get('/api/follows/recommended'));
        }
        // For now, dummy data
    }

    function displaySuggestions(suggestedUsers) {
        console.log('suggested', suggestedUsers);
        let list = $(".list");
        suggestedUsers.forEach(user => {
            followDiv.append(`<div class="p-2 bd-top" style="display: flex; align-items: center;">
            
                <a href="/profile?id=${user.id}" class="avatar-container mr-2">
                    <img src="${user.avatarImg || ''}" alt="${user.username}" onerror="this.src='/images/blank-avatar.jpg';" />
                </a>
                <a href="/profile?id=${user.id}" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${user.username}</a>
                <button class="button follow" data-user-id="${user.id}" style="margin-left: auto">Follow</button>
            </div>`);
        })
    }
});