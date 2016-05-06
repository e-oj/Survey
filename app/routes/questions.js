/**
 * @author EmmanuelOlaojo
 * @since 5/5/16
 */

var express = require("express");
var questionRouter = express.Router();

module.exports = function(Question) {
  questionRouter.post("/", function(req, res){
    var quest = req.body.question;

    if(!quest){
      res.status(400);
      return res.json({
        success: false
        , message: "@questionRouter: Missing Information"
      });
    }

    var question = new Question();
    question.question = quest;

    question.save(function(err, question){
      if(err){
        res.status(400);
        return res.json({
          success: false
          , message: "@questionRouter: Missing Information"
        });
      }

      res.status(200);
      res.json({
        success: true
        , result: question
      });
    });
  });

  questionRouter.get("/", function(req, res){
    Question.find({}, function(err, questions){
      if(err){
        res.status(500);
        return res.json({
          success: false
          , message: "@questionRouter: Error finding questions"
        });
      }

      res.status(200);
      res.json({
        success: true
        , result: questions
      });
    });
  });

  questionRouter.delete("/:id", function(req, res){
    var questId = req.params.id;

    Question.remove({_id: questId}, function(err, question){
      if(err){
        res.status(500);
        return res.json({
          success: false
          , message: "@questionRouter: Error finding questions"
        });
      }

      res.status(200);
      res.json({
        success: true
        , result: question
      });
    });
  });

  return questionRouter;
};