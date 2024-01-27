const expressAsyncHandler = require('express-async-handler');
const { hashPassword } = require('./../utils/bcrypt-utils')
const userSchema = require('./../models/user-model');
const GenericService = require('./generic-service');
// const errorLogger = require('log4js').getLogger();

exports.create = expressAsyncHandler(async (username, email, password) => {
    try {
        const existingUser = await GenericService.getAll(userSchema, {
            filters: {
                $or: [
                    {username},
                    {email},
                ]
            }
        });

        if (existingUser.items.length === 0) {
            const pwdHash = await hashPassword(password);

            const newUser = new userSchema({
                username,
                email,
                password: pwdHash,
                createdAt: new Date()
            });

            return await saveUser(newUser);
        } else {
            return 409;
        }
    } catch (err) {
        logAndThrowError(err);
    }
});


// Pure function to handle user save
async function saveUser(newUser) {
    try {
        return await newUser.save();
    } catch (err) {
        logAndThrowError(err);
    }
}

// Pure function to log error and throw
function logAndThrowError(err) {
    // errorLogger.error(err);
    throw new Error(err);
}