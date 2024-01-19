const handleErrorResponse = (res, error, notFoundMessage) => {
    if(error.message === "Item not found") {
        res.status(404).json({ message: notFoundMessage || 'Item not found.' })
    } else {
        res.status(500).json({ error: error.message });
    }
}

module.exports = handleErrorResponse;