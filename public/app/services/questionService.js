/**
 * @author EmmanuelOlaojo
 * @since 5/6/16
 */
angular.module('Query', ['ngResource', 'ConstFactory'])
  .factory('queries', ['$resource','constants', function($resource, constants){
    var postRoute = $resource(constants.questions);
    return postRoute.get({});
  }]);