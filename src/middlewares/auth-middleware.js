const expressAsyncHandler = require("express-async-handler");
const { verifyJWT } = require("./../utils/jwt-utils");

const ensureAuthHandler = async (req, res, next) => {
    try {
        const authHeader = req?.headers?.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const checkAuth = verifyJWT(token);
            if (checkAuth === 403) {
                res.sendStatus(403);
            } else {
                res.locals.user = checkAuth;
                next();
            }
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

exports.ensureAuth = expressAsyncHandler(async (req, res, next) => {
    await ensureAuthHandler(req, res, next);
});
