const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const haberlerRoutes = require('./routes/haberler');
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comments');

const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth')


mongoose.connect('mongodb+srv://woody:123456ab@cluster0.rs9we.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE ,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/haberler', haberlerRoutes);
app.use('/user', userRoutes);
app.use('/comment',commentRoutes);

//ERROR HANDLING
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;