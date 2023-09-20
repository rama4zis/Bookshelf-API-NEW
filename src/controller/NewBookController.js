const { nanoid } = require('nanoid');

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

    console.log('Book added: ', book);
};

module.exports = {
    newBookController,
};
