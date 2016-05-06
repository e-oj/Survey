/**
 * @author EmmanuelOlaojo
 * @since 5/5/16
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question: {type: String, required: true}
});

var Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;