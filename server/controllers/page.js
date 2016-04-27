'use strict';

exports.page = (req, res) => {
    res.render('index/index', req.commonData);
};

exports.getStatus = (req, res) => {
    let status = {
        fullness: 100,
        energy: 100,
        mood: 100
    };
    res.send(JSON.stringify(status));
};

exports.error404 = (req, res) => {
    res.sendStatus(404);
};
