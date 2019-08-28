console.log("Hello world!");

$(document).ready(() => {
    // Global Flags
    let view = null;

    // Click handlers
    $(document).on("click", ".switch-view-button", handleSwitchView);

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
})