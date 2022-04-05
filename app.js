if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');

const indexRoute = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));

const mongoose = require('mongoose');

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

app.listen(process.env.PORT || 3000);