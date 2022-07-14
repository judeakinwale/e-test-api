const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Section = require("./section");

const TestSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please enter test title"],
  },
  timer: {
    type: Number,
    default: 0,
  },
  videoUrl: {
    type: String,
  },
  isTraining: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, 
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true},
});

TestSchema.pre("remove", async function (next) {
  console.log("Deleting Sections ...".brightBlue);
  await this.model("section").deleteMany({test: this._id});
  console.log("Sections Deleted.".bgRed)
  next();
});

// Reverse Populate with Virtuals
TestSchema.virtual("sections", {
  ref: "section",
  localField: "_id",
  foreignField: "test",
  justOne: false,
});

module.exports = mongoose.model("test", TestSchema);
