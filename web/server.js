

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
server.listen(80);