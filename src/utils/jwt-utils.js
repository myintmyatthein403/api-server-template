const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('./../config/jwt-config');
// const errorLogger = require('log4js').getLogger();

const generateJWT = (payload, expiresIn) => {
    try {
        const options = {
            algorithm: 'RS256',
            expiresIn,
        };
        return jwt.sign(payload, config.jwtPrivateKey, options);
    } catch (error) {
        // errorLogger.error('Error generating JWT: ', error);
        throw new Error('Error generating JWT');
    }
};

const generateAccessToken = (user) => {
    const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION || 15 * 60; // 15 minutes in seconds
    return generateJWT({ user }, accessTokenExpiration);
};

const generateRefreshToken = (user, tokenLength = 12) => {
    const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || 7 * 24 * 60 * 60; // 7 days in seconds
    const refreshToken = crypto.randomBytes(tokenLength).toString('hex');
    const payload = { user, refreshToken };
    return generateJWT(payload, refreshTokenExpiration);
};

const refreshAccessToken = (refreshToken) => {
    try {
        const decodedRefreshToken = jwt.verify(refreshToken, config.jwtPublicKey);
        const user = decodedRefreshToken.payload.user;
        return generateAccessToken(user);
    } catch (error) {
        handleTokenError(error);
    }
};

const verifyJWT = (token) => {
    try {
        if (token) {
            return jwt.verify(token, config.jwtPublicKey);
        }
    } catch (error) {
        // errorLogger.error('Error decoding JWT: ', error);
        throw new Error('Error decoding JWT');
    }
};

const handleTokenError = (error) => {
    if (error.name === 'TokenExpiredError') {
        throw new Error('Refresh token has expired');
    } else {
        throw new Error('Error refreshing access token');
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshAccessToken,
    verifyJWT,
};
