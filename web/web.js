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
        var client_id = req.query.client_id;
        var response_type = req.query.response_type;
        var scope = req.query.scope;
        var state = req.query.state
        var redirect_uri = req.query.redirect_uri;
        res.redirect(`${redirect_uri}?code=${code}&state=${state}`);
    }

    static token(req, res) {
        console.log(req);

        var client_id = req.body.client_id;
        var client_secret = req.body.client_secret;
        var code = req.body.code;
        var grant_type = req.body.grant_type; // authorization_code, refresh_token
        var redirect_uri = req.body.redirect_uri
        var refresh_token = req.body.refresh_token

        var access_token = 'access_token_123';
        var refresh_token = 'refresh_token_123';

        res.json({
            access_token: access_token,
            refresh_token: refresh_token,
            token_type: 'bearer',
            expires_in: 2592000
        });
    }
};