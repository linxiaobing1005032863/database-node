var app = angular.module('rootModule', []);
app.factory('rootSer', function($http){
    return {
        logout : logout,
    };
    function logout(){
        return $http.get('/user/logout');
    }
});