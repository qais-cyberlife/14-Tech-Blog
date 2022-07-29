const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  function sendEmail() {
    Email.send({
        Host : "smtp.mailtrap.io",
        Username : "worldcuptestsite123@gmail.com",
        Password : "W0rldCup567",
        To : 'joelcronin@example.com',
        From : "worldcuptestsite123@gmail.com",
        Subject : "Test email",
        Body : "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>"
    }).then(
      message => alert(message)
      
    );
    console.log("==================================================================================================================================")
    }

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler, sendEmail);

