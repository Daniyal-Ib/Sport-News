let popup = document.getElementById("popupForm");

    function showPopup() {
        popup.style.display = "flex";
    }

    function closePopup() {
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }