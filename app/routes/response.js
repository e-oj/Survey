/**
 * @author EmmanuelOlaojo
 * @since 5/5/16
 */

var express = require("express");
var responseRouter = express.Router();

module.exports = function(Response){
  responseRouter.post("/", function(req, res){
    var info = req.body;
    
    if(!(info.author && info.question && info.response)){
      console.log(info);
      res.status(400);
      return res.json({
        success: false
        , message: "@responseRouter: Missing Information"
      });
    }

    var response = new Response();

    response.author = info.author;
    response.question = info.question;
    response.response = info.response;

    response.save(function(err, response){
      if(err){
        res.status(500);
        return res.json({
          success: false
          , message: "@responseRouter: Error finding user"
        });
      }

      res.status(200);
      res.json({
        success: true
        , result: response
      });
    });
  });

  responseRouter.get("/", function(req, res){
    Response.find({})
      .populate("author", "-_id")
      .exec(function(err, responses){
        if(err){
          res.status(500);
          return res.json({
            success: false
            , message: "@responseRouter: Error finding users"
          });
        }

        res.status(400);
        res.json({
          success: true
          , result: responses
        });
      });
  });

  responseRouter.get("/:id", function(req, res){
    var questionId = req.params.id;
    console.log(questionId);

    Response.find({question: questionId})
      .populate("author", "-_id")
      .exec(function(err, responses){
        if(err){
          res.status(500);
          return res.json({
            success: false
            , message: "@responseRouter: Error finding Response"
          });
        }

        res.status(200);
        res.json({
          success: true
          , result: responses
        });
      });
  });

  return responseRouter;
};
