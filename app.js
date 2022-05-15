if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const morgan = require('morgan');
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin,X-Reuested-With,Content-Type,Accept,Authorization'
//     );
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
//         return res.status(200).json({});
//     }
// });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// app.set('layout', 'layouts/layout');
// app.use(expressLayout);
app.use('/public', express.static('public'));
const store = new MongoDBStore({
    uri: process.env.DATABASE_URL,
    collection: 'sessions'
});
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

try {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true
    });
} catch (error) {
    console.log(error);
}

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log('http://localhost:3000');
});