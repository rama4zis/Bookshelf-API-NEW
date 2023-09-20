const { newBookController } = require('./controller/NewBookController');
const { findNameBook, findReadingBook, findFinishedBook } = require('./controller/FindBookController');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: () => 'Hello, this is Home Page',
    },
    {
        method: '*',
        path: '/',
        handler: () => 'Page not found',
    },

    {
        method: 'GET',
        path: '/books',
        handler: (request) => {
            if (request.query.name) {
                return findNameBook(request.query.name);
            }
            if (request.query.reading) {
                return findReadingBook(request.query.reading);
            }
            if (request.query.finished) {
                return findFinishedBook(request.query.finished);
            }

            return 'You just accessed all books';
        },
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: (request) => `You just accessed book ${request.params.bookId}`,
    },
    {
        method: 'POST',
        path: '/books',
        handler: (request, h) => {
            const myBook = request.payload;
            newBookController(myBook);
            return h.response('Book added').code(201);
        },
    },

    {
        method: '*',
        path: '/{any*}',
        handler: () => 'Page not found',
    },
];

module.exports = routes;
