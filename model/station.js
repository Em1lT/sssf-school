const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    Title: String,
    AddressLine1: String,
    Town: String,
    StateOrProvince: String,
    Postcode: String,
    Connections: [{
        type: [Schema.Types.ObjectId],
        ref: 'Connection'
    }],
    Location: {
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

module.exports = mongoose.model('station', stationSchema);