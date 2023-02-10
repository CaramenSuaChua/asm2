const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tranSchema = new Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    hotel: {
        type: String,
        ref: 'Hotel',
        required: true
    },
    room: {
        type: Array,
        ref: 'Room',
        required: true
    },
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Transaction', tranSchema)