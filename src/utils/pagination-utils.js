require('dotenv').config();
const applyPagination = (page, limit) => {
    const pageNumber = parseInt(page, 1);
    const pageSize = parseInt(limit, process.env.LIMIT || 25);
    const skip = (pageNumber - 1) * pageSize;
    return { skip, limit: pageSize };
}

module.exports = applyPagination;