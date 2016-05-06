/**
 * @author EmmanuelOlaojo
 * @since 5/6/16
 */

angular.module("Question", ["ngResource", "ConstFactory"])
  .directive("ojQuestion", [
    "$resource"
    , "$window"
    , "constants"
    , function($resource, $window, constants){
      
      function controller(){
        var self = this;
        var prevRes = $window.localStorage.getItem(self.ojQueryId);
  
        self.response = prevRes? prevRes == "true" : null;
        self.kill = prevRes? true : false;
        self.success = false;
        self.failed = false;
        self.answerMode = false;

        self.submit = function(){
          self.kill = true;

          var res = $resource(constants.response);
          var author = $window.localStorage.getItem("userId");
          var question = self.ojQueryId;
          var response = self.response;

          if(response == null){
            self.failed = true;
            self.kill = false;
            return;
          }
          
          res.save({}, {
            author: author
            , question: question
            , response: response
          }, function(){
            self.success = true;
            self.failed = false;
            $window.localStorage.setItem(question, ""+response);
          }, function(){
            self.failed = true;
            self.kill = false;
          });
        }
      }
  
      function link(boundScope, elem){
        var scope = boundScope.questCt;
        if(!scope.ojQuery) throw new Error("To use oj-question, a value must be specified for oj-query");
        if(!scope.ojQueryId) throw new Error("To use oj-question, a value must be specified for oj-queryId");

        elem.find(".question").text(scope.ojQuery);
      }
  
      return {
        scope: {
          ojQuery: "@"
          , ojQueryId: "@"
        }
        , templateUrl: "/app/views/templates/question.html"
        , restrict: "E"
        , replace: true
        , link: link
        , controller: controller
        , controllerAs: "questCt"
        , bindToController: true
      }
    }
  ]);
