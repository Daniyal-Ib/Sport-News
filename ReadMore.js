function toggleReadMore() {
    let moreText = document.getElementById("moreText");
    let btnText = document.getElementById("readMoreBtn");

    // Проверяем состояние скрытого текста
    if (moreText.style.display === "none") {
        moreText.style.display = "block";  
        btnText.textContent = "Read More"; 
    } else {
        moreText.style.display = "none";   
        btnText.textContent = "Read More"; 
    }
}