

var web = require('./web.js'),
    express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    serveStatic = require('serve-static'),
    ejs = require('ejs'),
    url = require('url'),
    ws = require('ws'),
    path = require('path');

// setup web server
var app = express();
app.disable('x-powered-by');
app.disable('etag');
app.use(serveStatic(path.resolve(__dirname, 'static'), {}));
app.set('views', path.resolve(__dirname));
app.engine('html', ejs.renderFile);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var router = express.Router();
web.setupRoutes(router);
app.use(router);

var server = http.createServer(app);
server.listen(7861, '127.0.0.1');

const conn = require('./ws.js');
const wsConn = new ws.Server({
    noServer: true
});

wsConn.on('connection', (conn) => {
    // Process connection
    conn.onConnection(conn);
});

conn.start(wsConn);

server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url).pathname;

    if (pathname.startsWith('/socket')) {
        wsConn.handleUpgrade(request, socket, head, (ws) => {
            wsConn.emit('connection', ws, request); // this is required
        });
    } else {
        socket.destroy();
    }
});