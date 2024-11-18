function toggleTheme() {
    let body = document.body;
    body.classList.toggle('dark-mode');
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);