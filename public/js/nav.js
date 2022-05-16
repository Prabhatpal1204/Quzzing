// const item1 = document.querySelector('.item1');
// const item2 = document.querySelector('.item2');
// const item3 = document.querySelector('.item3');
// const item4 = document.querySelector('.item4');
// const item5 = document.querySelector('.item5');
// const item6 = document.querySelector('.item6');
// const item7 = document.querySelector('.item7');
// const item8 = document.querySelector('.item8');

// item1.addEventListener;

const box = document.querySelectorAll('.box-item');
box.forEach((item) => {
    item.addEventListener('click', (e) => {
        // console.log(`quiz/${item.innerText}` + 'a');
        location.href = `/quiz/${item.innerText}`;
    });
});