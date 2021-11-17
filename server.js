var http = require('http');
var app = require('./app');
const port = process.env.PORT || 5000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port,() => {
    console.log(`Server running at port ${port}`);
});