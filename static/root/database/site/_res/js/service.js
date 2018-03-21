var app = angular.module('siteServer',[]);
app.factory('siteSer',function ($http) {
    return {
        siteList : siteList,
        siteAdd : siteAdd,
        siteEdit : siteEdit,
        siteDetail:siteDetail,
        siteDelete:siteDelete,
        siteUpload: siteUpload,
        siteAllDel: siteAllDel,
    };
    function siteList(data) {//列表
        return $http.get('/site/list',{
            params:data
        })
    }
    function siteAdd(data) {                   //添加
        return $http.post('/site/add',data)
    }
    function siteEdit(data) {                   //编辑
        return $http.post('/site/edit',data)
    }
    function siteDelete(data) {                   //删除
        return $http.get('/site/delete',{
            params:data
        })
    }
    function siteDetail(data) {                   //详情
        return $http.get('/site/detail',{
            params:data
        })
    }
    function siteUpload(data) {                   //上传附件
        return $http.post('/site/upload',data)
    }
    function siteAllDel(data) {                   //上传附件
        return $http.post('/site/allDel',data)
    }
});
