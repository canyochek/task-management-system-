const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String, 
        required: true
    },
    dateDisplay: {
        type: String, 
        required: true
    },
    dateISO: {
        type: String, 
        required: true
    },
    listId: {
        type: String, 
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);