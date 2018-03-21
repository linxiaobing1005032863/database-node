var app = angular.module('viewCtrlM', ['toastr']);
app.controller('viewCtrl', function($scope, projectSer,$stateParams,$state,toastr,){
    var data = {
        id:$stateParams.id,
        token:$stateParams.tonken
    };
    projectSer.projectView(data).then(function (response) {
        if(response.data.code == 200){
            $scope.views = response.data.data;
        }else {
            toastr.error('没有附件','温馨提示');
            $state.go('root.database.projectMas.list[12]',{id:null,name:null});
        }
    });
    $scope.del = function (obj) {
        var data = {
            id:$stateParams.id,
            token:$stateParams.tonken,
            type:obj
        };
        projectSer.projectDelete(data).then(function(response){
            if(response.data.code==200){
                toastr.info('删除成功','温馨提示');
                projectSer.projectView(data).then(function (response) {
                    if(response.data.code == 200){
                        $scope.views = response.data.data;
                    }else {
                        toastr.error('没有附件','温馨提示');
                        $state.go('root.database.projectMas.list[12]',{id:null,name:null});
                    }
                });
            }else{
                if(error) return;
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    $scope.dol = function (data) {
        var obj = {
            id:$stateParams.id,
            token:$stateParams.tonken,
            type:data
        };
        window.open(`/project/download${encode(obj,true)}`)
    };

    //点击改变列表颜色
    $scope.showView = function(event){
        angular.forEach($scope.views,function(obj){
            obj._selectList = false
        });
        event._selectList = true;
        //向父Ctrl传递事件
        $scope.$emit('changeId', event.id,event.token);
    };
    $scope.editFun = function () {
        projectSer.editRange(data).then(function (response) {
            if(response.data.code == 0){
                $state.go('root.organize.views.range.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});

function encode(){
    var obj = arguments[0];
    var contacat = false;
    if (arguments[1]) {
        contacat = true;
    }
    var str = '';
    var count = 0;
    for (var name in obj) {
        if (obj[name]&&( typeof obj[name]) != 'function') {
            str += (((contacat && count == 0) ? '?' : '&') + name + '=' + obj[name]);
            count++;
        }
    }
    return encodeURI(str);
}






