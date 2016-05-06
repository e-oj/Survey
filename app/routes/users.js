/**
 * @author EmmanuelOlaojo
 * @since 5/5/16
 */

var express = require("express");
var userRouter = express.Router();

module.exports = function(User){
  userRouter.post("/", function(req, res){
    var info = req.body;

    if(!(info.firstName && info.lastName)){
      res.status(400);
      return res.json({
        success: false
        , message: "@userRouter: Missing Information"
      });
    }

    var user = new User();

    user.firstName = info.firstName;
    user.lastName = info.lastName;

    console.log(info);

    user.save(function(err, newUser){
      if(err){
        res.status(500);
        return res.json({
          success: false
          , message: "@userRouter: Error saving user"
        });
      }

      res.status(200);
      res.json({
        success: true
        , message: "User Created"
        , result: newUser
      });
    });
  });

  userRouter.get("/:id", function(req, res){
    var userId = req.params.id;
    console.log(userId);

    if(!userId){
      res.status(400);
      return res.json({
        success: false
        , message: "@userRouter: Missing Information"
      });
    }

    User.findById(userId, function(err, user){
      if(err){
        res.status(500);
        return res.json({
          success: false
          , message: "@userRouter: Error finding user"
        });
      }

      res.status(200);
      res.json({
        success: true
        , result: user
      });
    });
  });

  userRouter.get("/", function(req, res){
    User.find({}, function(err, users){
      if(err){
        res.status(500);
        return res.json({
          success: false
          , message: "@userRouter: Error finding users"
        });
      }

      res.status(200);
      res.json({
        success: true
        , result: users
      });
    });
  });

  return userRouter;
};