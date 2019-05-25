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
        var code = req.body.code;
        var grant_type = req.body.grant_type;
        var redirect_uri = req.body.redirect_uri
        var auth = req.header('authorization');
        
        var tmp = auth.split(' ');  
        var buf = new Buffer(tmp[1], 'base64');
        var plain_auth = buf.toString();
        var creds = plain_auth.split(':');
        var username = creds[0];
        var client_secret = creds[1];

        res.json({
            access_token:"access_token_123",
            token_type:"bearer",
            expires_in:2592000,
            refresh_token:"refresh_token_123",
            scope:"read",
            uid:100101,
            info:{
                name:"test user",
                email:"test@yopmail.com"
            }});
    }
};