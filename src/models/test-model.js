const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Add an index to the name field for efficient searching
testSchema.index({ name: 'text' });

// Middleware to update the updatedAt field before saving
testSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Add a static method for searching by name
testSchema.statics.searchByName = function (query) {
    return this.find({ $text: { $search: query } });
};

module.exports = mongoose.model('Test', testSchema);
