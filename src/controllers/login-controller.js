const expressAsyncHandler = require('express-async-handler');
// const errorLogger = require('log4js').getLogger();
const userService = require('./../services/user-service');
const GenericService = require('./../services/generic-service');
const { generateAccessToken, generateRefreshToken } = require('./../utils/jwt-utils');
const { comparePasswords } = require('./../utils/bcrypt-utils')
const userModel = require('./../models/user-model');
const { validationResult } = require('express-validator');

const logInHandler = async (req, res, next, identifier, password) => {
    try {

        // Query the database for the user
        const { items } = await GenericService.getAll(userModel, {
            filters: {
                $or: [
                    { username: identifier },
                    { email: identifier },
                ],
            },
            select:'+password'
        });

        if (items?.length !== 0) {
            const user = items[0]; // Assuming you are expecting only one user

            // Compare the entered password with the stored hashed password
            const passwordMatch = await comparePasswords(password, user.password);
            if (passwordMatch) {
                if (!user.blocked) {
                    res.status(200).cookie('refreshToken', generateRefreshToken(user)).json({
                        meta: {
                            accessToken: generateAccessToken(user)
                        },
                        data: user.toJSON(),
                    });
                } else {
                    res.sendStatus(403);
                }
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        // Handle errors appropriately
        res.status(500).json({
            errors: err?.message,
        });
    }
};

const signUp = expressAsyncHandler(async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
            });
        }
        let { username, email, password } = req?.body;
        // Call a pure function to handle user creation
        const newUser = await userService.create(username, email, password);

        // Return the result instead of modifying the response here
        return handleSignUpResult(newUser, res);
    } catch (err) {
        // Log the error and return the response instead of modifying it here
        // errorLogger(err);
        return res.status(500).json({
            errors: err.message,
        });
    }
});

// Pure function to handle the result of the signUp operation
function handleSignUpResult(newUser, res) {
    if (newUser === 409) {
        // Instead of res.sendStatus(409), return the response
        return res.status(409).json({
            errors: 'User already exists',
        });
    } else {
        // Instead of res.status(201).json({ data: newUser }), return the response
        return res.status(201).json({
            data: newUser,
        });
    }
}

exports.logIn = expressAsyncHandler(async (req, res, next) => {
    const { identifier, password } = req.body;
    await logInHandler(req, res, next, identifier, password);
});

exports.signUp = signUp;
