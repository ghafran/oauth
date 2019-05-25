

var web = require('./web.js'),
    express = require('express'),
    http = require('http'),
    https = require('https'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    serveStatic = require('serve-static'),
    ejs = require('ejs'),
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
server.listen(80);

https.createServer({
    key: fs.readFileSync(__dirname + '/ssl/privkey.pem'),
    cert: fs.readFileSync(__dirname + '/ssl/cert.pem'),
    ca: fs.readFileSync(__dirname + '/ssl/chain.pem')
}, app).listen(443);

http.createServer((req, res) => {
    res.writeHead(301, {
        'Location': 'https://' + req.headers.host + req.url
    });
    res.end();
}).listen(80);