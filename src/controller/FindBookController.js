const notes = require('../notes');

const findNameBook = (name) => name;

const findReadingBook = (reading) => reading;

const findFinishedBook = (finished) => finished;

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
