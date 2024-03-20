const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memoriesSchema = new Schema({
    
    memoriesImg: {
        type: String,   
    },
    memories_name: {
        type: String    
    }
}, { timestamps: true });

const Memories = mongoose.model('memories', memoriesSchema);

module.exports = Memories;