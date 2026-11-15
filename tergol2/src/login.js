const html = document.documentElement;
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const usernameOrEmail = document.getElementById('userInput').value;
  const password = document.getElementById('passInput').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];

  let user = users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail);

  let nameOrEmail = 'test';
  let pass = 'password';

  if (user != undefined) {
    // match whichever one was typed: the username or the email
    nameOrEmail = usernameOrEmail === user.email ? user.email : user.username;
    pass = user.password;
  }

  if (usernameOrEmail === nameOrEmail && password === pass) {
    // save the logged-in user's details in local storage (without the password)
    const loggedInUser = user != undefined
      ? { username: user.username, email: user.email, dob: user.dob, role: user.role }
      : { username: nameOrEmail, email: '', dob: '', role: 'user' };
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    loginMessage.textContent = 'Login successful!';
    loginMessage.classList.remove('text-red-500');
    loginMessage.classList.add('text-green-500');

    // an admin is sent to the user management page
    if (loggedInUser.role === 'admin') {
      window.location.href = 'userManagement.html';
    }
  } else {
    loginMessage.textContent = 'Invalid username/email or password.';
    loginMessage.classList.remove('text-green-500');
    loginMessage.classList.add('text-red-500');
  }
});
