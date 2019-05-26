var _ = require('lodash'),
    promise = require('bluebird'),
    PubNub = require('pubnub'),
    EventEmitter = require('events').EventEmitter;

var _messageBus = new EventEmitter();
_messageBus.setMaxListeners(Infinity);

_pubnub = new PubNub({
    publishKey : 'pub-c-6f959cde-7073-4fa8-8ca6-d7cfabeeb78e',
    subscribeKey : 'sub-c-803adfdc-7fb4-11e9-aee4-2e27e4d79cf8'
});

_pubnub.subscribe({
    channels: ['answer'] 
});

_pubnub.addListener({
    message: function(msg) {
        console.log(msg);
        
        _messageBus.emit('answer', {
            answer: msg.message.answer
        });
    }
}) 

module.exports = class web {

    static setupRoutes(router) {
        router.all('/', web.index);
        router.all('/check', web.check);
        router.all('/oauth', web.oauth);
        router.all('/oauth/token', web.token);
        router.all('/sendoffer', web.sendOffer);
        router.all('/disconnect', web.disconnect);

        router.all('/call', web.call);
    }

    static index(req, res) {
        res.status(200).render('views/index.ejs');
    }

    static check(req, res) {
        res.status(200).json({
            success: true
        });
    }

    static call(req, res) {
        res.status(200).render('views/call.ejs');
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

    static sendOffer(req, res) {
        console.log(req);

        var offer = req.body.offer || req.query.offer;

        _pubnub.publish({
            channel : 'offer',
            message : {
                offer: offer
            }}, (status, response) => {
                console.log(status, response);

                _messageBus.once('answer', (msg) => {
                    console.log(msg);

                    _messageBus.removeAllListeners('answer');
                    res.json({
                        answer: msg.answer
                    });
                });
        });
    }

    static disconnect(req, res){
        _pubnub.publish({
            channel : 'disconnect',
            message : {}
        }, (status, response) => {
                res.json({
                    success: true
                });
        });
    }
};