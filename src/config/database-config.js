exports.DBConfig = {
    DBHost : process.env.DBHOST || 'mongodb://127.0.0.1:27017',
    DBCollection: process.env.DBCOLLECTION || 'test_dev'
}