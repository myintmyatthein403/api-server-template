const applyPopulation = (model, populate) => {
    if(!populate) {
        return [];
    }

    if(populate.toLowerCase() === 'all') {
        const itemSchemaPaths = Object.keys(model.schema.paths);
        return itemSchemaPaths.filter((path) => path !== '_id');
    } else {
        return JSON.parse(populate);
    }
}

module.exports = applyPopulation;