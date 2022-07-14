const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Question = require("./question");

const SectionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please enter section title"],
  },
  timer: {
    type: Number,
    default: 0,
  },
  videoUrl: {
    type: String,
  },
  instruction: {
    type: String,
    required: [true, "Please enter section instruction"],
  },
  test: {
    type: mongoose.Schema.ObjectId,
    ref: "test",
    required: [true, "Please enter a test id"],
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

SectionSchema.pre("remove", async function (next) {
  console.log("Deleting Questions ...".brightBlue);
  await this.model("question").deleteMany({section: this._id});
  console.log("Questions Deleted.".bgRed)
  next();
});

// Reverse Populate with Virtuals
SectionSchema.virtual("questions", {
  ref: "question",
  localField: "_id",
  foreignField: "section",
  justOne: false,
});

module.exports = mongoose.model("section", SectionSchema);
