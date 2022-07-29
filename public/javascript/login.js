const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the main page
      document.location.replace('/');
    } else {
      const data = await response.json();
      console.log(data);
      alert(data.message);
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);


