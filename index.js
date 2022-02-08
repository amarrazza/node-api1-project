const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
console.log("anyone home");

server.listen(port, () => {
    console.log("server has started!");
});