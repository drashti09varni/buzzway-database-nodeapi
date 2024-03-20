const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    tour_name: {
        type: String,
    },
    tour_description: {
        type: String,
    },
    tourImg: {
        type: String,   
    },
}, { timestamps: true });

const Tour = mongoose.model('tour', tourSchema);

module.exports = Tour;