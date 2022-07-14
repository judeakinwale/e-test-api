const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  title: {
    type: String,
    required: [true, "Please input the title/name"],
  },
  description: {
    type: String,
    required: [true, "Please input the title/name"],
  },
  logo: {
    type: String,
    default: "logo_company.png",
  },
  colorScheme: [{type: String}],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("company", CompanySchema);
