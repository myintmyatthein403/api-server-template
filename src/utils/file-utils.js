const fs = require('fs');

const readKeyFile = (fileName) => {
    try {
        return fs.readFileSync(fileName);
    } catch(error) {
        throw new Error(`Error reading ${fileName}`)
    }
}

module.exports = {
    readKeyFile
}