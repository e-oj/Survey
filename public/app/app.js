angular.module("app", ["ngResource", "ConstFactory", "Question", "Response", "Query"])
  .config(['$httpProvider', "$logProvider", function($httpProvider, $logProvider){
    var actions = {};
    actions.transformRequest = function(data){
      var formData = new FormData();

      angular.forEach(data, function(value, key){
        formData.append(key, value);
      });
      //console.log(formData);
      return formData;
    };

    $logProvider.debugEnabled(true);
    $httpProvider.defaults.transformRequest = actions.transformRequest;
    $httpProvider.defaults.headers.post['Content-Type'] = undefined;
  }])

  .controller("appCtrl", [
    "$resource"
    , "$window"
    , "constants"
    , "queries"
    , function($resource, $window, constants, queries){
      var self = this;
      self.firstName = "";
      self.lastName = "";

      self.questions = queries;
      self.hasName = $window.localStorage.getItem("userId") ? true : false;
      self.failed = false;

      self.submit = function(){
        var info = $resource(constants.users);

        info.save({}, {
          firstName: self.firstName
          , lastName: self.lastName
        }, function(res){
          self.hasName = true;
          self.failed = false;
          $window.localStorage.setItem("userId", res.result._id)
        }, function(){
          self.failed = true;
        });
      }
    }
  ]);