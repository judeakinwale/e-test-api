const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const CompanyInformation = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, "Please input the title/name"]
    },
    description: {
        type: String,
        required: [true, "Please input the title/name"]
    },
    logo: {
        type: String,
        required: [true, "Please upload Company logo"]
    },
    colorScheme: [
        {type: String},
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('company', CompanyInformation);
