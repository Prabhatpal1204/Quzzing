const hamMenu = document.querySelector('.ham');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('#overlay');
hamMenu.addEventListener('click', (e) => {
    nav.classList.toggle('appear');
    overlay.classList.toggle('appear');
});
overlay.addEventListener('click', (e) => {
    nav.classList.toggle('appear');
    overlay.classList.toggle('appear');
});