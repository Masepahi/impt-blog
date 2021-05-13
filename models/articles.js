const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ArticleSchema = new Schema({
    title: {
        type: 'string',
        required: true,
        minlength: 5,
        maxlenght: 200
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 500,
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    published: {
        type : Boolean
    },
    image: {
        type : String
    }
});

ArticleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Article", ArticleSchema);