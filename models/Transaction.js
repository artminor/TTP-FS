const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    stock: [{
        ticker: {
            type: String,
            required: true
        },
        shares: {
            type: Number,
            required: true
        },
        salePrice: {
            type: Number,
            required: true
        },
        soldPrice: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);