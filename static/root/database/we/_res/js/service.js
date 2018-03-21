var app = angular.module('weServer',[]);
app.factory('weSer',function ($http) {
    return {
        weList : weList,
        weDelete:weDelete,
        weUpload: weUpload,
        weDownload: weDownload,
        weUsername: weUsername,
    };
    function weList(data) {//列表
        return $http.get('/we/list',{
            params:data
        })
    }
    function weDelete(data) {   //删除
        return $http.get('/we/delete',{
            params:data
        })
    }
    function weUpload(data) {    //上传附件
        return $http.post('/we/upload',data)
    }
    function weDownload(data) {                   //下载附件
        return $http.get('/we/download',{
            params:data
        })
    }
    function weUsername(data) {                   //传值用户名给后台
        return $http.get('/we/username',{
            params:data
        })
    }


});
