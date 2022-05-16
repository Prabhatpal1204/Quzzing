const form = document.querySelector('.login-form-btn');
const msg = document.querySelector('.user-message');
form.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if (email == '' || password == '') {
        msg.classList.remove('hidden');
        msg.innerText = 'Enter All Feilds';
        msg.classList.add('animation');
        gsap.from('.animation', {
            opacity: 0,
            duration: 1,
            ease: 'ease-in'
        });
        return;
    }
    console.log(email + password);
    fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                location.href = '/';
            } else if (res.status == 404) {
                msg.classList.remove('hidden');
                msg.innerText = 'Invalid Email';
                msg.classList.add('animation');
                gsap.from('.animation', {
                    opacity: 0,
                    duration: 1,
                    ease: 'ease-in'
                });
            } else {
                msg.classList.remove('hidden');
                msg.innerText = 'Invalid password';
                msg.classList.add('animation');
                gsap.from('.animation', {
                    opacity: 0,
                    duration: 1,
                    ease: 'ease-in'
                });
            }
        })
        .catch();
});