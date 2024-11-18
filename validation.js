document.querySelector('form').addEventListener('submit', function(event) {
    let emailField = document.getElementById('subscribe');
    let email = emailField.value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
    }
});

document.getElementById('signUpForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
  
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
      alert('Email already registered');
      return;
    }
  
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign Up Successful!');
    closeModal('signUpModal');
  });
  
  document.getElementById('logInForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('logInEmail').value;
    const password = document.getElementById('logInPassword').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
      alert('Invalid email or password');
      return;
    }
  
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'profile.html';
  });
  
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }
  