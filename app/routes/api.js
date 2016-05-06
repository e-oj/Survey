/**
 * @author EmmanuelOlaojo
 * @since 5/5/16
 */

var express = require("express");
var apiRouter = express.Router();

var User = require("../Models/user");
var Question = require("../Models/question");
var Response = require("../Models/response");

module.exports = function(){
  var userRouter = require("./users")(User);
  var questionsRouter = require("./questions")(Question);
  var responseRouter = require("./response")(Response);

  apiRouter.use("/users", userRouter);
  apiRouter.use("/questions", questionsRouter);
  apiRouter.use("/response", responseRouter);

  return apiRouter;
};