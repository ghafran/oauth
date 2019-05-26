const https = require('https');

module.exports = class {

  static send(config) {

    return new Promise((resolve, reject) => {

      var data = JSON.stringify(config.data);

      var options = {
        hostname: config.host,
        port: 443,
        path: config.path,
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      };

      var req = https.request(options, (res) => {
        res.on('data', (d) => {
          resolve(d);
        });
      });

      req.on('error', (err) => {
        console.error(err);
        reject(err);
      });

      req.write(data);
      req.end();
    });
  }
};
