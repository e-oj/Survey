angular.module('ConstFactory', [])
    .factory('constants', function(){
        var statics = {};

        statics.api = "/api";
        statics.response = statics.api + "/response/";
        statics.questions = statics.api + "/questions/";
        statics.users = statics.api + "/users/";

        return statics;
    });