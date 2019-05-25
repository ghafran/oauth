var _ = require('lodash'),
    promise = require('bluebird');

module.exports = class web {

    static setupRoutes(router) {
        router.all('/', web.index);
        router.all('/check', web.check);
        router.all('/oauth', web.oauth);
        router.all('/oauth/token', web.token);
    }

    static index(req, res) {
        res.status(200).render('views/index.ejs');
    }

    static check(req, res) {
        res.status(200).json({
            success: true
        });
    }

    static oauth(req, res) {
        console.log(req);
        var code = 'code_123'
        var state = req.query.state
        var redirect_uri = req.query.redirect_uri;
        res.redirect(`${redirect_uri}?code=${code}&state=${state}`);
    }

    static token(req, res) {
        console.log(req);
        res.status(200).json({
            success: true
        });
    }
};