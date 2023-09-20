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
        handler: () => 'This is a GET Request',
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: (request) => `You just accessed book ${request.params.bookId}`,
    },
    {
        method: 'POST',
        path: '/books',
        handler: (request) => {
            const myBook = request.payload;
            return `This is test for POST :${JSON.stringify(myBook)}`;
        },
    },

    {
        method: '*',
        path: '/{any*}',
        handler: () => 'Page not found',
    },
];

module.exports = routes;
