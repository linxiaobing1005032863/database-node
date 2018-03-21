var app = angular.module('databaseServer',[]);
app.factory('databaseSer',function ($http) {
    return {
        jsonList : jsonList,
    };
    function jsonList(data) {//列表
        return $http.get('/json/list',{
            params:data
        })
    }
});
