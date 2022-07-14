const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: [true, "Please enter question"],
  },
  answers: [{type: String}],
  correct_answers: [
    {
      type: String,
      required: true,
      // select: false
    },
  ],
  section: {
    type: mongoose.Schema.ObjectId,
    ref: "section",
    required: true,
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

// QuestionSchema.pre("remove", async function(next) {
//   console.log("Deleting answers ...".brightblue);
//   await this.model("answer").deleteMany({question: this._id});
//   console.log("Answers Deleted.".bgred);
//   next();
// });

module.exports = mongoose.model("question", QuestionSchema);
