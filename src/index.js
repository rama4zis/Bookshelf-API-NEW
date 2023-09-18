const http = require('http');

const requireListener = (req, res) => {

    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    let body = [];
    const { method } = req;

    switch (method) {
        case 'GET':
            res.end('This is a GET Request');
            break;

        case 'POST':
            req.on('data', (chunk) => {
                body.push(chunk);
            })

            req.on('end', () => {
                body = Buffer.concat(body).toString();
                res.end(`This is a POST Request: ${body}`);
            })
            break;

        case 'PUT':
            res.end('This is a PUT Request');
            break;

        case 'DELETE':
            res.end('This is a DELETE Request');
            break;

        default:
            res.statusCode = 404;
            res.end();
    }

}

const server = http.createServer(requireListener);

const port = 9000;
const host = '0.0.0.0';

server.listen(port, host, () => {
    console.log('Server is running on http://' + host + ':' + port);
})