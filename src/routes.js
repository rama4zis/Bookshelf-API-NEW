const { newBookController } = require('./controller/NewBookController');
const {
 findNameBook, findReadingBook, findFinishedBook, findIdBook,
} = require('./controller/FindBookController');
const { editBookController } = require('./controller/EditBookController');
const { deleteBookController } = require('./controller/DeleteBookController');
const notes = require('./notes');

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
        handler: (request, h) => {
            if (request.query.name) {
                return findNameBook(request.query.name);
            }
            if (request.query.reading) {
                return findReadingBook(request.query.reading);
            }
            if (request.query.finished) {
                return findFinishedBook(request.query.finished);
            }

            return h.response({
                status: 'success',
                data: {
                    books:
                        notes.map((note) => ({
                            id: note.id,
                            name: note.name,
                            publisher: note.publisher,
                        })),
                },
            });
        },
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: (request, h) => {
            const returnData = findIdBook(request.params.bookId);
            return h.response(returnData.response).code(returnData.code);
        },
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: (request, h) => {
            const returnData = editBookController(request.params.bookId, request.payload);
            return h.response(returnData.response).code(returnData.code);
        },
    },
    {
        method: 'POST',
        path: '/books',
        handler: (request, h) => {
            const myBook = request.payload;
            const returnData = newBookController(myBook);
            return h.response(returnData.response).code(returnData.code);
        },
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: (request, h) => {
            const returnData = deleteBookController(request.params.bookId);
            return h.response(returnData.response).code(returnData.code);
        },
    },

    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => h.response('404 Error! Page Not Found!').code(404),
    },
];

module.exports = routes;
