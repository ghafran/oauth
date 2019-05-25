// start web server
require('./web/server');

// cleanup events
process.on('SIGTERM', function () { // ctrl c
    process.exit();
});

process.on('SIGINT', function () { // ctrl z
    process.exit();
});

process.on('uncaughtException', function (err) {

});