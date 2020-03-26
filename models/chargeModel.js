const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chargeSchema = new Schema({
    Title: String,
    AddressLine1: String,
    Town: String,
    StateOrProvince: String,
    Postcode: String,
    Connections: Array,
    Location: {
        type: String,
        enum: ['point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true

    }
    
});

module.exports = mongoose.model('charge', chargeSchema);