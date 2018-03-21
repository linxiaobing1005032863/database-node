var app = angular.module('unitServer',[]);
app.factory('unitSer',function ($http) {
    return {
        unitList : unitList,
        unitAdd : unitAdd,
        unitEdit : unitEdit,
        unitFind : unitFind,
        unitDetail:unitDetail,
        unitDelete:unitDelete,
        unitUpload: unitUpload,
        unitView: unitView,
        unitDownload: unitDownload,
        unitAllDel: unitAllDel,
    };
    function unitList(data) {//列表
        return $http.get('/unit/list',{
            params:data
        })
    }
    function unitAdd(data) {                   //添加
        return $http.post('/unit/add',data)
    }
    function unitFind(data){                   //获取数据
        return $http.get('/unit/find',{
            params:data
        })
    }
    function unitEdit(data) {                   //编辑
        return $http.post('/unit/edit',data)
    }
    function unitDelete(data) {                    //删除
        return $http.get('/unit/delete',{
            params:data
        })
    }
    function unitDetail(data) {                   //详情
        return $http.get('/unit/detail',{
            params:data
        })
    }
    function unitUpload(data) {                   //上传附件
        return $http.post('/unit/modelUpload',data)
    }
    function unitView(data) {                   //查看附件
        return $http.get('/unit/view',{
            params:data
        })
    }
    function unitDownload(data) {                   //查看附件
        return $http.get('/unit/download',{
            params:data
        })
    }
    function unitAllDel(data) {                   //批量删除
        return $http.post('/unit/allDel',data)
    }
});
