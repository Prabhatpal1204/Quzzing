const form = document.querySelector('.login-form-btn');
form.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    console.log(username);
    fetch('/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: username,
                email,
                password
            })
        })
        .then((res) => {
            if (res.status === 200) {
                location.href = '/users/login';
            }
        })
        .catch((err) => {
            console.log(err);
        });
});