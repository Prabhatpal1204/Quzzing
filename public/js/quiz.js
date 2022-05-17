const star = document.querySelector('#start');
const question = document.querySelector('.question');
var questionArr = [];
var answerArr = [];
var questionPointer = 0;
var answerPointer = 0;
var correctAnsArry = [];
var result = [];
var currentAns = [];
const questionContainer = document.querySelector('.wrapper');
const answerColl = document.querySelectorAll('.btn-answer');
const results = document.querySelector('.result-wrapper');
const score = document.querySelector('progress');
const displayScore = document.querySelector('.display-score');
let root = document.documentElement;
const questionCount = document.querySelector('.question-count');
const tags = star.innerHTML;
const tag = tags.split(' ');
// const container = document.querySelector('animate-conatianer');
// console.log(answerColl);
const url = `https://quizapi.io/api/v1/questions?apiKey=9Crh0SYQwk1sjO958Qm54tVdqXpNeWEo5R27y0KZ&limit=10&tags=${tag[2]}`;

star.addEventListener('click', (e) => {
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const question = data.map((element) => {
                return element.question;
            });
            const answers = data.map((element) => {
                return element.answers;
            });
            const correctAns = data.map((element) => {
                return element.correct_answers;
            });
            questionArr = [...question];
            answerArr = [...answers];
            correctAnsArry = [...correctAns];
            createQuestions(questionArr, answerArr, correctAns);
        })
        .catch((err) => {
            console.log(err);
        });
});

const createQuestions = (questions, answers, correctAns) => {
    const ansArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    // console.log(answers);
    star.classList.remove('appear');
    star.classList.add('hidden');
    var i = 0;
    questionContainer.classList.remove('hidden');
    questionContainer.classList.add('animation');

    questionCount.innerHTML = `Question No. ${questionPointer + 1}`;

    question.innerHTML = questions[questionPointer];

    Array.from(answerColl).forEach((as) => {
        if (answers[answerPointer][`answer_${ansArray[i]}`] == null) {
            as.innerText = 'None of the Above';
        } else if (
            answers[answerPointer][`answer_${ansArray[i]}`] == null &&
            answers[answerPointer][`answer_${ansArray[i + 1]}`] == null
        ) {
            as.innerText = 'Both A and B';
        } else {
            if (answers[answerPointer][`answer_${ansArray[i]}`].length > 60) {
                as.innerText = answers[answerPointer][`answer_${ansArray[i]}`].slice(
                    0,
                    60
                );
            } else {
                as.innerText = answers[answerPointer][`answer_${ansArray[i]}`];
            }
        }
        ++i;
    });

    // console.log(correctAns);
    const ans = correctAns.map((element) => {
        return extractAns(element);
    });
    // console.log(ans);
    result = [...ans];
    questionPointer++;
    answerPointer++;
    // if (questionPointer >= 10) {
    //     questionPointer = 12;
    //     return;
    // } else {
    //     const ansArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    //     // console.log(answers);
    //     star.classList.remove('appear');
    //     star.classList.add('hidden');
    //     var i = 0;
    //     questionContainer.classList.remove('hidden');

    //     questionCount.innerHTML = `Question No. ${questionPointer + 1}`;

    //     question.innerHTML = questions[questionPointer];

    //     Array.from(answerColl).forEach((as) => {
    //         as.innerText = answers[answerPointer][`answer_${ansArray[i]}`];
    //         ++i;
    //     });

    //     // console.log(correctAns);
    //     const ans = correctAns.map((element) => {
    //         return extractAns(element);
    //     });
    //     // console.log(ans);
    //     result = [...ans];
    //     questionPointer++;
    //     answerPointer++;
};

const extractAns = (ans) => {
    const ansArray = ['a', 'b', 'c', 'd', 'e', 'f'];
    for (var index = 0; index < 6; index++) {
        const check = ans[`answer_${ansArray[index]}_correct`];
        if (check === 'true') {
            return ansArray[index];
        }
    }
};

document.querySelectorAll('.btn-answer').forEach((btn) => {
    btn.addEventListener('click', (b) => {
        currentAns.push(b.target.dataset.ans);
        if (questionPointer === 10) {
            answerCheck();
        } else {
            createQuestions(questionArr, answerArr, correctAnsArry);
        }
    });
});

// document.addEventListener('click', (e) => {
//     if (e.target.matches('.btn-answer')) {
//         if (questionPointer <= 10) {
//             if (e.target.matches('.answer1')) {
//                 currentAns.push('a');
//             }
//             if (e.target.matches('.answer2')) {
//                 currentAns.push('b');
//             }
//             if (e.target.matches('.answer3')) {
//                 currentAns.push('c');
//             }
//             if (e.target.matches('.answer4')) {
//                 currentAns.push('d');
//             }
//             // console.log(currentAns);
//             createQuestions(questionArr, answerArr, correctAnsArry);
//         } else {
//             answerCheck();
//         }
//     }
// });

const answerCheck = () => {
    let count = 0;
    questionContainer.classList.add('hidden');
    results.classList.remove('hidden');
    results.classList.add('animation');
    gsap.from('.animation', {
        opacity: 0,
        duration: 0.5,
        x: -10,
        ease: 'ease-in'
    });
    let correct = 0;
    currentAns.forEach((e) => {
        if (e === result[count]) {
            ++correct;
        }
        ++count;
    });
    root.style.setProperty('--per', correct * 10 + '%');
    displayScore.innerText = `${correct}/10`;
};