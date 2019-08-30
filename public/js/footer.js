const menu = $(".footer-menu");

function openFooterMenu() {
    console.log("ET");
    menu.css("display", "unset");
};

$(document).on("click", function (event) {
    if (!event.target.matches(".footer-menu")) {
        menu.css("display", "none");
    }
});