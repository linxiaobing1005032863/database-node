var app = angular.module('projectServer',[]);
app.factory('projectSer',function ($http) {
    return {
        projectList : projectList,
        projectAdd : projectAdd,
        projectEdit : projectEdit,
        projectDetail:projectDetail,
        projectDelete:projectDelete,
        projectUpload: projectUpload,
        projectView: projectView,
        projectAllDel: projectAllDel,
        projectModelUpload: projectModelUpload,
    };
    function projectList(data) {//列表
        return $http.get('/project/list',{
            params:data
        })
    }
    function projectAdd(data) {                   //添加
        return $http.post('/project/add',data)
    }
    function projectEdit(data) {                   //编辑
        return $http.post('/project/edit',data)
    }
    function projectDelete(data) {                    //删除
        return $http.get('/project/delete',{
            params:data
        })
    }
    function projectDetail(data) {                   //详情
        return $http.get('/project/detail',{
            params:data
        })
    }
    function projectUpload(data) {                   //上传附件
        return $http.post('/project/upload',data)
    }
    function projectModelUpload(data) {             //模板文件上传
        return $http.post('/project/modelUpload',data)
    }
    function projectView(data) {                   //查看附件
        return $http.get('/project/view',{
            params:data
        })
    }
    function projectAllDel(data) {                   //批量删除
        return $http.post('/project/allDel',data)
    }
});
