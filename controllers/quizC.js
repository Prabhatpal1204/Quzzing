exports.quizRender = (req, res, next) => {
    res.status(200).render('quiz', { quiz: req.params.quiz });
};