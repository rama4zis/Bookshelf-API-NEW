const http = require('http');
const { nanoid } = require('nanoid');

const requireListener = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    let body = [];
    const { url, method } = req;

    if (url === '/') {
        res.end('Hello, this is Home Page');
    }

    if (url === '/books') {
        switch (method) {
            case 'GET':
                res.end('This is a GET Request');
                break;

            case 'POST':
                req.on('data', (chunk) => {
                    body.push(chunk);
                });
                // eslint-disable-next-line no-case-declarations
                let myBook = {};
                req.on('end', () => {
                    body = Buffer.concat(body).toString();
                    myBook = JSON.parse(body);

                    // make generate ID
                    const id = nanoid();

                    // generate date now
                    const date = new Date().toISOString();

                    const newData = {
                        id,
                        finished: (myBook.readPage === myBook.pageCount),
                        insertDate: date,
                        updateDate: date,
                    };

                    myBook = Object.assign(myBook, newData);

                    res.end(JSON.stringify(myBook));
                });
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
};

const server = http.createServer(requireListener);

const port = 9000;
const host = '0.0.0.0';

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
