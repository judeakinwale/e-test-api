const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const AdminInformation = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('admin', AdminInformation);