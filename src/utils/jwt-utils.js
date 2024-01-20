const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateJWT = (payload, expiresIn, privateKey) => {
    try {
        const options = {
            algorithm: 'RS256',
            expiresIn,
        };
        return jwt.sign(payload, privateKey, options);
    } catch (error) {
        console.error('Error generating JWT: ', error);
        throw new Error('Error generating JWT');
    }
};

const generateAccessToken = (user, privateKey) => {
    const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION || 15 * 60; // 15 minutes in seconds
    return generateJWT({ user }, accessTokenExpiration, privateKey);
};

const generateRefreshToken = (user, privateKey, tokenLength = 12) => {
    const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || 7 * 24 * 60 * 60; // 7 days in seconds
    const refreshToken = crypto.randomBytes(tokenLength).toString('hex');
    const payload = { user, refreshToken };
    return generateJWT(payload, refreshTokenExpiration, privateKey);
};

const refreshAccessToken = (refreshToken, publicKey) => {
    try {
        const decodedRefreshToken = jwt.verify(refreshToken, publicKey);
        const user = decodedRefreshToken.payload.user;
        return generateAccessToken(user, publicKey);
    } catch (error) {
        handleTokenError(error);
    }
};

const verifyJWT = (token, publicKey) => {
    try {
        if (token) {
            return jwt.verify(token, publicKey);
        }
    } catch (error) {
        console.error('Error decoding JWT: ', error);
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
