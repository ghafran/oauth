const request = require('./request.js');

function start(){
    return request.send({
        host: 'oauth.vital.chat',
        path: '/check',
        method: 'POST',
        data: {
            offer: 'test_offer'
        }
    }).then((data) => {
        let json = data.toString('utf8');
        console.log(json);
    }).catch((err)=>{
        console.error(err);
    });
}

start();