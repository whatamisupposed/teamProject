document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('account-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Assuming there's a function to save the updated user data
    saveAccountData();
  });
});

function saveAccountData() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  // Simulating an API call to save user data
  fetch('/api/update-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      email: email,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Account updated successfully');
      } else {
        alert('Error updating account');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
document.addEventListener('DOMContentLoaded', function () {
  fetch('/api/get-account-data')
    .then(response => response.json())
    .then(data => {
      document.getElementById('credit-hours').value = data.creditHours;
      document.getElementById('tuition-fees').value = `$${data.tuitionFees}`;
    })
    .catch(error => {
      console.error('Error fetching account data:', error);
    });
});
