var _wsConns;
var _conns = {};

module.exports = class conns {

    static start(wsConns) {
        _wsConns = wsConns;
    }

    static onConnection(conn) {
        conn.on('message', async(data) => {
            console.log(data);
        });
    }

    static sendMessage(data) {
        _wsConns.clients.forEach(function each(client) {
            try {
                client.send(JSON.stringify(data));
            } catch (err) {
                console.log(err);
            }
        });
    }
};