const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memoriesSchema = new Schema({
    blog_img: {
        type: String,   
    },
    blog_name: {
        type: String    
    },
    blog_description: {
        type: String    
    }
}, { timestamps: true });

const Memories = mongoose.model('blogs', memoriesSchema);

module.exports = Memories;