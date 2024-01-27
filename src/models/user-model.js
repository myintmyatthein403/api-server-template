const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false,
    },
    certified: {
        type: Boolean,
        default: false,
        required: true,
    },
    blocked: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
})

// Exclude the password field from the toJSON transformation
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});
userSchema.pre('save', function(next)  {
    this.updatedAt = new Date();
    next()
})

module.exports = mongoose.model('User', userSchema);