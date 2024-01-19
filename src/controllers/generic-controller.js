const {handleErrorResponse} = require("../utils/utils");

const create = async(req, res, model, service) => {
    try {
        const itemData = req.body;
        const newItem = await service.create(model, itemData);
        res.status(201).json(newItem);
    } catch(error) {
        if(error.code === 11000 || error.code === 11001) {
            res.status(409).json({
                error: 'Conflict - Duplicate key violation.'
            })
        } else {
            handleErrorResponse(res, error);
        }
    }
}

const find = async (req, res, model, service) => {
    try {
        const { items, totalItems } = await service.getAll(model, req?.query);

        if (items.length === 0) {
            res.status(204).json({ message: 'No items found' });
        } else {
            const totalPages = req.query.limit ? Math.ceil(totalItems / parseInt(req.query.limit, 10)) : 1;
            const meta = {
                page: parseInt(req.query.page, 10) || 1,
                totalPages,
                totalItems,
            };

            res.status(200).json({
                meta,
                data: items,
            });
        }
    } catch (error) {
        handleErrorResponse(res, error, 'No items found');
    }
};

const findOne = async(req, res, model, service) => {
    try {
        const itemId = req?.params?.id;
        const populateFields = req?.query?.populate || '';
        const item = await service.getOneItem(model, itemId, populateFields);

        if(!item) {
            res.status(204).json({
                message: 'Item not found'
            })
        } else {
            res.json(item);
        }
    } catch(error) {
        handleErrorResponse(res, error, 'Item not found');
    }
}

const update = async(req, res, model, service) => {
    try {
        const itemId = req?.params?.id;
        const updateData = req?.body;

        const updatedItem = await service.updateItem(model, itemId, updateData);
        res.status(200).json(updatedItem);
    } catch(error) {
        handleErrorResponse(res, error, 'Item not found')
    }
}

const deleteItem = async(req, res, model, service) => {
    try {
        const itemId = req?.params?.id;
        const deletedItem = await service.deleteItem(model, itemId);
        res.status(204).json(deletedItem);
    } catch(error) {
        handleErrorResponse(res, error, 'Item not found')
    }
}


module.exports = {
    create,
    find,
    findOne,
    update,
    deleteItem
}