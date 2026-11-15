const welcomeName = document.getElementById('welcomeName');
const usersTableBody = document.getElementById('usersTableBody');
const logoutLink = document.getElementById('logoutLink');

// the user who logged in (saved by login.js)
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// nobody logged in -> back to the login page
if (loggedInUser == null) {
  window.location.href = 'login.html';
} else {
  welcomeName.textContent = loggedInUser.username;
}

// show every registered user in the table (no password)
let users = JSON.parse(localStorage.getItem('users')) || [];

users.forEach((user, index) => {
  const row = document.createElement('tr');
  row.className = 'hover:bg-gray-50';

  const values = [index + 1, user.username, user.email, user.dob, user.role || 'user'];
  values.forEach(value => {
    const cell = document.createElement('td');
    cell.className = 'p-3 border-b border-gray-200';
    cell.textContent = value;
    row.appendChild(cell);
  });

  usersTableBody.appendChild(row);
});

// logout removes the logged-in user from local storage
logoutLink.addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
});
