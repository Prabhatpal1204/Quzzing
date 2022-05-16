const form = document.querySelector('.login-form-btn');
const msg = document.querySelector('.user-message');

form.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    console.log(username);
    const patternEmail =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (email == '' || password == '' || username == '') {
        msg.classList.remove('hidden');
        msg.innerText = 'Please Enter all details';
        msg.classList.add('animation');
        gsap.from('.animation', {
            opacity: 0,
            duration: 1,
            ease: 'ease-in'
        });
        return;
    }
    if (!patternEmail.test(email)) {
        msg.classList.remove('hidden');
        msg.innerText = 'Enter a valid email';
        msg.classList.add('animation');
        gsap.from('.animation', {
            opacity: 0,
            duration: 1,
            ease: 'ease-in'
        });
        return;
    }
    if (password.length < 6) {
        msg.classList.remove('hidden');
        msg.innerText = 'Password Length should be greater then 6';
        msg.classList.add('animation');
        gsap.from('.animation', {
            opacity: 0,
            duration: 1,
            ease: 'ease-in'
        });
        return;
    }

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