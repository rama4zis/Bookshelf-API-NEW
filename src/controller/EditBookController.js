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
    if (!newData.name) {
        return {
            response: {
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            },
            code: 400,
        };
    }
    const {
        // eslint-disable-next-line max-len
        name = currentBook.response.data.book.name, year = currentBook.response.data.book.year, author = currentBook.response.data.book.author, summary = currentBook.response.data.book.summary, publisher = currentBook.response.data.book.publisher, pageCount = currentBook.response.data.book.pageCount, readPage = currentBook.response.data.book.readPage, reading = currentBook.response.data.book.reading,
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
        insertedAt: currentBook.response.data.book.insertedAt,
        updatedAt: updateAt,
    };

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
