/**
 * @author EmmanuelOlaojo
 * @since 5/6/16
 */

angular.module("Response", ["ngResource", "ConstFactory"])
  .directive("ojResponse", [
    "$resource"
    , "constants"
    , function($resource, constants){

      function link(scope, elem){
        if(!scope.ojQuery) throw new Error("To use oj-question, a value must be specified for oj-query");
        if(!scope.ojQueryId) throw new Error("To use oj-question, a value must be specified for oj-queryId");

        elem.find(".question").text(scope.ojQuery);

        $resource(constants.response + scope.ojQueryId + "/").get({}, function(res){
          var responses = elem.find(".responses");

          res.result.forEach(function(response){
            var resP = angular.element(document.createElement("p"));
            var name = response.author.firstName.trim() + " " + response.author.lastName.trim();
            var answer = response.response? "agrees" : "disagrees";

            resP.addClass("response");
            resP.text(name + ": " + answer);

            responses.append(resP);
          });
        });
      }

      return {
        scope: {
          ojQuery: "@"
          , ojQueryId: "@"
        }
        , templateUrl: "/app/views/templates/response.html"
        , restrict: "E"
        , replace: true
        , link: link
      }
    }
  ]);