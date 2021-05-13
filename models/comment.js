const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 300
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    article: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    }
});

CommentSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Comment', CommentSchema);