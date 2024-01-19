const applyFilters = (filters) => {
    let findQuery = {};

    for(const key in filters) {
        findQuery[key] = filters[key];
    }
    return findQuery;
}

module.exports = applyFilters;