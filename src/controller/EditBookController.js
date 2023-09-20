const { findIdBook } = require('./FindBookController');
const notes = require('../notes');

const editBookController = (id, newData) => {
    if (!notes.find((note) => note.id === id)) {
        const code = 404;
        return {
            response: {
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
            },
            code,
        };
    }

    const currentBook = findIdBook(id);
    const {
        // eslint-disable-next-line max-len
        name = currentBook.name, year = currentBook.year, author = currentBook.author, summary = currentBook.summary, publisher = currentBook.publisher, pageCount = currentBook.pageCount, readPage = currentBook.readPage, reading = currentBook.reading,
    } = newData;
    const updateAt = new Date().toISOString();
    const statusFinish = (readPage === pageCount);
    const book = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished: statusFinish,
        insertDate: currentBook.insertDate,
        updateDate: updateAt,
    };

    if (!name) {
        const code = 400;
        return {
            response: {
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            },
            code,
        };
    }

    if (readPage > pageCount) {
        const code = 400;
        return {
            response: {
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            },
            code,
        };
    }

    const index = notes.findIndex((note) => note.id === id);
    notes[index] = book;

    return {
        response: {
            status: 'success',
            message: 'Buku berhasil diperbarui',
        },
        code: 200,
    };
};

module.exports = { editBookController };
