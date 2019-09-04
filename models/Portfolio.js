const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
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
        date: {
            type: Date,
            default: Date.now
        }
    }],
    transaction: [{
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

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);