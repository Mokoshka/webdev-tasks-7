'use strict';

const page = require('./controllers/page');

module.exports = (app) => {
    app.get('/', page.page);

    app.get('/status', page.getStatus);

    app.all('*', page.error404);

    app.use((err, req, res, next) => {
        console.error(err);

        res.sendStatus(500);
    });
};
