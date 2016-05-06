/**
 * @author EmmanuelOlaojo
 * @since 5/5/16
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResponseSchema = new Schema({
  author: {type: Schema.ObjectId, ref: "User", required: true}
  , question: {type: Schema.ObjectId, ref: "Question", index: true}
  , response: {type: Boolean, required: true}
});

var Response = mongoose.model("Response", ResponseSchema);
module.exports = Response;