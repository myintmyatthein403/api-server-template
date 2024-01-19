const { applyFilters, applyPopulation, applyPagination, applySorting } = require('./../utils/utils');

const create = async(model, data) => {
    const newItem = new model(data);
    return newItem.save();
}

const getAll = async (model, query) => {
    const { filters = {}, populate = '', sort = '', limit = '10', page = '1' } = query;

    const findQuery = applyFilters(filters);
    const populateQuery = applyPopulation(model, populate);
    const sortQuery = applySorting(sort);
    const { skip, limit: pageSize } = applyPagination(page, limit);

    const items = await model.find(findQuery)
        .populate(populateQuery)
        .sort(sortQuery)
        .skip(skip)
        .limit(pageSize);

    const totalItems = await model.countDocuments(findQuery);

    if (!items) {
        throw new Error('Items not found');
    }

    return { items, totalItems };
};

const getOneItem = async(model, itemId, populateFields = '') => {
    const item = await model.findById(itemId).populate(populateFields);
    if(!item) {
        throw new Error('Item not found')
    }

    return item;
}

const updateItem = async(model, itemId, updateData) => {
    const updatedItem =  await model.findByIdAndUpdate(itemId, updateData, {new: true});
    if(!updatedItem) {
        throw new Error('Item not found')
    }
    return updatedItem;
}

const deleteItem = async(model, itemId) => {
    const deletedItem = await model.findOneAndDelete({ _id: itemId })

    if(!deletedItem) {
        throw new Error('Item not found')
    }

    return deletedItem;
}

module.exports = {
    create,
    getAll,
    getOneItem,
    updateItem,
    deleteItem,
}