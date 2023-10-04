const messageBox = document.querySelector("#message-box");
const messageTitle = document.querySelector("#message-title");
const messageText = document.querySelector("#message-text");

let add = "Added to favourites";
let remove = "Removed from favourites";

function messageBoxDisplayed(display = false, title = "") {
    messageBox.style.visibility = display ? "visible" : "hidden";
    
    messageText.innerHTML = title;
 
    if (display) {
        setTimeout(() => {
            messageBoxDisplayed(false, title)
        }, 2000);
    }

}

// messageBoxDisplayed(true, remove)


