const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    minQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    supplier: {
        type: String,
        required: true
    },
    lastRestocked: {
        type: Date,
        default: Date.now
    },
    unit: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['in-stock', 'low-stock', 'out-of-stock'],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema); 