const notes = require('../notes');

const findNameBook = (search) => {
    const bookName = search.toLowerCase();
    const books = notes.filter((note) => note.name.toLowerCase().includes(bookName));
    if (books.length === 0) {
        return {
            response: {
                status: 'fail',
                message: 'Buku tidak ditemukan',
            },
            code: 400,
        };
    }

    return {
        response: {
            status: 'success',
            data: {
                books: books.map((note) => ({
                    id: note.id,
                    name: note.name,
                    publisher: note.publisher,
                })),
            },
        },
        code: 200,
    };
};

const findReadingBook = (search) => {
    const status = (search === '1');
    const books = notes.filter((note) => note.reading === status);

    return {
        response: {
            status: 'success',
            data: {
                books: books.map((note) => ({
                    id: note.id,
                    name: note.name,
                    publisher: note.publisher,
                })),
            },
        },
        code: 200,
    };
};

const findFinishedBook = (search) => {
    const status = (search === '1');
    const books = notes.filter((note) => note.finished === status);
    if (books.length === 0) {
        return {
            response: {
                status: 'fail',
                message: 'Tidak ada buku yang sudah dibaca',
            },
            code: 400,
        };
    }

    return {
        response: {
            status: 'success',
            data: {
                books: books.map((note) => ({
                    id: note.id,
                    name: note.name,
                    publisher: note.publisher,
                })),
            },
        },
        code: 200,
    };
};

const findIdBook = (id) => {
    if (!notes.find((note) => note.id === id)) {
        const code = 404;
        return {
            response: {
                status: 'fail',
                message: 'Buku tidak ditemukan',
            },
            code,
        };
    }

    return {
        response: {
            status: 'success',
            data: {
                book: notes.find((note) => note.id === id),
            },
        },
        code: 200,
    };
};

module.exports = {
    findNameBook, findReadingBook, findFinishedBook, findIdBook,
};
