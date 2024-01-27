const fs = require('fs');
require('dotenv').config();

let SECRET = process.env.SECRET || 'virgo';
let jwtPrivateKey = null;
let jwtPublicKey = null;

try {
    jwtPublicKey = fs.readFileSync('jwt_public.pem');
    jwtPrivateKey = fs.readFileSync('jwt_private.pem');
} catch (err) {
    console.log(`Need to generate key! Run the following commands: `);
    console.log(`openssl genrsa -des3 -out jwt.pem -passout pass:${SECRET} 2048`);
    console.log(`openssl rsa -in jwt.pem -outform PEM -pubout -out jwt_public.pem -passin pass:${SECRET}`);
    console.log(`openssl rsa -in jwt.pem -outform PEM -out jwt_private.pem -passin pass:${SECRET}`);
    console.log(`rm -f jwt.pem`);
    throw new Error('Generate RSA keys first');
}

module.exports = {
    SECRET,
    jwtPrivateKey,
    jwtPublicKey,
};
