const { nanoid } = require('nanoid');
const notes = require('../notes');

const newBookController = (data) => {
    const statusFinish = (data.readPage === data.pageCount);
    const book = {
        id: nanoid(),
        name: data.name,
        year: data.year,
        author: data.author,
        summary: data.summary,
        publisher: data.publisher,
        pageCount: data.pageCount,
        readPage: data.readPage,
        reading: data.reading,
        finished: statusFinish,
        insertDate: new Date().toISOString(),
        updateDate: new Date().toISOString(),
    };

    if (data.name === '') {
        const code = 400;
        return {
            response: {
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            },
            code,
        };
    }

    if (data.readPage > data.pageCount) {
        const code = 400;
        return {
            response: {
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            },
            code,
        };
    }

    notes.push(book);

    const isSuccess = notes.filter((note) => note.id === book.id).length > 0;
    if (isSuccess) {
        const code = 201;
        return {
            response: {
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: book.id,
                },
            },
            code,
        };
    }
    const code = 400;
    return {
        response: {
            status: 'fail',
            message: 'Buku gagal ditambahkan',
        },
        code,
    };
};

module.exports = {
    newBookController,
};
