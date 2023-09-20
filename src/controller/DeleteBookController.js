const notes = require('../notes');

const deleteBookController = (id) => {
    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) {
        const code = 404;
        return {
            response: {
                status: 'fail',
                message: 'Buku gagal dihapus. Id tidak ditemukan',
            },
            code,
        };
    }

    notes.splice(index, 1);

    return {
        response: {
            status: 'success',
            message: 'Buku berhasil dihapus',
        },
        code: 200,
    };
};

module.exports = { deleteBookController };
