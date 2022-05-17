var tl = gsap.timeline();

tl.from('#background-2', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out'
    })
    .from('#desktop, #display', { opacity: 0, duration: 0.4 }, '>-0.3')
    .from(
        '.not', {
            stagger: 0.1,
            opacity: 0,
            duration: 0.4,
            ease: 'back.out(1.7)',
            x: -50,
            y: 10
        },
        '>-0.2'
    )
    .from(
        '#download , #brackets, #setting', {
            stagger: 0.1,
            opacity: 0,
            duration: 0.4,
            ease: 'back.out(1.7)',
            x: 50,
            y: -30
        },
        '>-0.2'
    )
    .from('#mobile', { opacity: 0, duration: 0.3, ease: 'expo.in' })
    .to('#set1 ,#set2 ,#set3', {
        rotate: '+=360',
        repeat: 2,
        duration: 2,
        ease: 'linear',
        transformOrigin: '50% 50%'
    });