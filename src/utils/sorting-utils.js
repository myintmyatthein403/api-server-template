const applySorting = (sort) => {
    let sortQuery = {};
    if(sort) {
        const [ sortField, sortOrder ] = sort.split(',');
        sortQuery[sortField] = sortOrder === 'desc' ? -1 : 1;
    }
    return sortQuery;
}

module.exports = applySorting;