const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const main = document.querySelector('.left');
const main2 = document.querySelector('.main2');
const menu = document.querySelectorAll('.box-item');
const headObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entries);
        entry.target.classList.toggle('animation', entry.isIntersecting);
        gsap.from('.animation', {
            opacity: 0,
            duration: 0.8,
            y: -20,
            ease: 'ease-in'
        });
        if (!entry.isIntersecting) headObs.unobserve(entry.target);
    });
});
headObs.observe(header);

const topicsObs = new IntersectionObserver((entries) => {
    const count = entries.length / 2;
    for (let i = 0; i < entries.length; i++) {
        if (i < count) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('odd');
                if (!entries[i].isIntersecting) topicsObs.unobserve(entries[i].target);
            }
        } else {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('even');
                if (!entries[i].isIntersecting) topicsObs.unobserve(entries[i].target);
            }
        }
    }
});
menu.forEach((element) => {
    topicsObs.observe(element);
});

const mainObs = new IntersectionObserver((entries) => {
    console.log(entries);
    entries.forEach((entry) => {
        entry.target.classList.toggle('animtion', entry.isIntersecting);
        if (!entry.isIntersecting) mainObs.unobserve(entry.target);
    });
});
mainObs.observe(main);

// const footerObs = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         console.log(entries);
//         entry.target.classList.toggle('anition', entry.isIntersecting);
//         gsap.from('.anition', {
//             opacity: 0,
//             duration: 0.6,
//             x: 20,
//             ease: 'ease-in'
//         });
//         if (!entry.isIntersecting) headObs.unobserve(entry.target);
//     });
// });
// footerObs.observe(footer);