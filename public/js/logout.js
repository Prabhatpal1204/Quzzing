const logout = () => {
    fetch('/users/logout', { method: 'POST' })
        .then((res) => {
            if (res.status === 200) {
                location.href = '/';
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

// logout.addEventListener('click', (e) => {
//     fetch('/users/logout', { method: 'POST' })
//         .then((res) => {
//             if (res.status === 200) {
//                 location.href = '/';
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });