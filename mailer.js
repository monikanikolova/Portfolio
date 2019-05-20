document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault();
  const nameNode = document.getElementById('name');
  const emailNode = document.getElementById('email');
  const messageNode = document.getElementById('message')
  const mailObj = {
    name: nameNode.value.trim(),
    email: emailNode.value.trim(),
    message: messageNode.value.trim(),
  };
  // fetch won't work in IE, FYI
  fetch('/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mailObj)
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.ok) {
        // reset form
        nameNode.value = '';
        emailNode.value = '';
        messageNode.value = '';
        // you wont want to use alerts in your actual app
        alert('message sent successfully');
      } else {
        alert('something went wrong with nodemailer');
      }
    })
    .catch((error) => {
      alert('something went wrong between the server and frontend', error);
    });
})