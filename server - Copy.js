var http = require('http');
var https = require('https');
var fs = require('fs');
var app = require('./app');
const port = process.env.PORT || 5000;
app.set('port', port);

// Initialization of basic HTTP / HTTPS Service https://azureossd.github.io/2020/02/12/configuring-ssl-certificates-with-nodejs/
const options = {
	key: fs.readFileSync(process.env.CERTIFICATE_SSL_KEY),
	cert: fs.readFileSync(process.env.CERTIFICATE_SSL_CERT),
}; 

/* if (process.env.CERTIFICATE_SSLCACERTS) {
options.ca = [];
process.env.CERTIFICATE_SSLCACERTS.forEach((sslCaCert) => {
options.ca.push(fs.readFileSync(sslCaCert).toString());
});
} */

const server = https.createServer(options, app);
//const server = http.createServer(app);

server.listen(port,() => {
    console.log(`Server running at port ${port}`);
});