'use strict';

const path = require('path');

const express = require('express');
const app = express();

const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const viewsDir = path.join(__dirname, './server/bundles');
const publicDir = path.join(__dirname, 'public');

app.set('views', viewsDir);
app.set('view engine', 'hbs');

app.use(express.static(publicDir));

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use((req, res, next) => {
    req.commonData = {
        meta: {
            description: 'Свиногочи',
            charset: 'utf-8'
        },
        page: {
            title: 'Свиногочи'
        },
        isDev: process.env.NODE_ENV === 'development'
    };

    next();
});

require('./server/routes')(app);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));

module.exports = app;
