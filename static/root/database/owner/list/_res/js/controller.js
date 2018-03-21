var app = angular.module('ownerListModel', ['toastr','ng-pagination']);
app.controller('ownerListCtrl',function($scope,ownerSer,toastr,$stateParams,$state,$location){
    if($scope.projectLists) return;
    $scope.$emit('changeId', null,null);
    if($stateParams.name =='detail'){
        $scope.detailShow = true;
        $scope.detailText = '列表详情';
    }else {
        $scope.detailShow = false;
        $scope.detailText = '列表';
    }
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };
    function activatePage(page) {
        var data = {
            page:page||1
        };
        ownerSer.ownerList(data).then(function (response) {
            if(response.data.code == 200){
                $scope.custom.itemsCount = response.data.data.total;
                $scope.ownerLists = response.data.data.data;
                if($stateParams.id){
                    if($stateParams.id.indexOf('&')){
                        $stateParams.id = $stateParams.id.split('&')[0];
                    }
                    angular.forEach($scope.ownerLists,function(obj){
                        if(obj.id == $stateParams.id){
                            obj._selectList = true;
                            if($stateParams.name == 'all'){
                                $scope.ownerLists._del = true;
                            }
                            if($stateParams.name == 'delete'){
                                $scope.ownerLists._del = false;
                            }
                        }
                    });
                    //向父Ctrl传递事件
                    $scope.$emit('idList', $stateParams.id);
                }
            }else{
                toastr.error(response.data.msg, '温馨提示');
            }
        });
    }

    //获取id
    if($stateParams.id){
        switch ($stateParams.name){
            case 'delete':
                $scope.delShow = true;
                break;
            case 'all':
                $scope.delShow = true;
                break;
        }
    }
    $scope.cancel = function () {  //取消删除
        $scope.delShow = false;
        $state.go('root.database.owner.list[12]',{id:null,name:null});
    };
    var count = 0;
    //确认删除
    $scope.delFn = function(){//确认删除
        var data = {
            id:$stateParams.id,
            token:$stateParams.tonken,
            type:0,
        };
        if($stateParams.name =="delete") {
            ownerSer.ownerDelete(data).then(function (response) {
                if (response.data.code == 200) {
                    count++;
                    toastr.info("信息已删除", '温馨提示');
                    $scope.$emit('idList', null);
                    $scope.delShow = false;
                    if (($scope.custom.itemsCount - count) % 10) {
                        $state.go('root.database.owner.list[12]', {id: null, name: null});
                    } else {
                        $state.go('root.database.owner.list[12]', {
                            id: null,
                            name: null,
                            page: $location.search().page - 1
                        });
                    }
                } else {
                    toastr.error(response.data.msg, '温馨提示');
                }
            });
        }
        //批量删除
        if($stateParams.name =="all" ){
            $scope.ifAllDel = true;
            $scope.idArr = [];
            angular.forEach($scope.ownerLists,function (obj) {
                $scope.idArr.push(obj.id);
            });
            var  data= {
                id:[]
            };
            for(var i=0;len=$scope.idArr.length,i<len;i++){
                data.id.push($scope.idArr[i]);
            }
            if($scope.ifAllDel){
                ownerSer.ownerAllDel(data).then(function(response){
                    if(response.data.code == 200){
                        toastr.info('批量删除成功','温馨提示');
                        $scope.$emit('idList', null);
                        $scope.delShow = false;
                        $state.go('root.database.owner.list[12]',{id:null,name:null,page:$location.search().page-1>0?$location.search().page-1:null,tonken:null});
                    }else{
                        toastr.info(response.data.msg,'温馨提示')
                    }
                })
            }
        }
    };
    //点击改变列表颜色
    $scope.ownerShowDetail = function(event){
        angular.forEach($scope.ownerLists,function(obj){
            obj._selectList = false
        });
        event._selectList = true;
        //向父Ctrl传递事件
        $scope.$emit('changeId', event.id,event.token);
        $scope.$emit('changeName', true);
        $scope.$emit('changePage', $location.search().page);
    };

    //批量删除点击选中
    $scope.ownerAll = function (event) {
        if(event.length == 0) return;
        if(event._del){
            event._del = false;
        }else{
            event._del = true;
            $scope.ifAllDel = true;
            //向父Ctrl传递事件
            $scope.$emit('changeId', event[0].id,event[0].token);
            $scope.$emit('changeName', false);
            $scope.$emit('changePage',$location.search().page);
        }
        angular.forEach(event,function(obj){
            obj._del = false
        });
    };
    $scope.files = [];
    $scope.imageShow = true;
    $scope.ownerJumpDetail = function (event) {
        $scope.detailShow = true;
        $scope.detailText = '列表详情';
        var data = {
            id:event.id,
            token:event.token,
        };
        $scope.custom.itemsCount  = 2;
        ownerSer.ownerDetail(data).then(function (response) {
            if($scope.detailList) return;
            if(response.data.code == 200){
                $scope.detailList = response.data.data;
                $scope.uriArr = JSON.parse($scope.detailList.prove_url);

                console.log($scope.uriArr)
                // $scope.uriList = $scope.uriArr.split(',');
                // $scope.uriList.pop();
                // $scope.uriList = "http://192.168.0.93:90"+$scope.uriArr;
                // $scope.uriList = [];
                 for(var i =0;len=$scope.uriArr.length,i<len;i++){
                     $scope.files.push({
                         name: $scope.uriArr[i].substring($scope.uriArr[i].lastIndexOf('/') + 1).toLowerCase(),
                         type:  $scope.uriArr[i].substring($scope.uriArr[i].lastIndexOf('.') + 1).toLowerCase(),
                         url:    "https://wl.bjike.com" + $scope.uriArr[i]
                     });
                     console.log($scope.files)
                     // $scope.arrUrl  =$scope.uriArr[i].split('.')[1];
                     // $scope.uriList.push("https://wl.bjike.com"+$scope.uriArr[i])
                     // $scope.uriArr[i] = "https://wl.bjike.com" + $scope.uriArr[i];
                     // // $scope.uriList.push("http://192.168.0.93:90"+$scope.uriArr[i]);
                     // var aaa = $scope.uriArr[i].substring($scope.uriArr[i].lastIndexOf('.') + 1).toLowerCase();
                     // if(aaa!='png'&&aaa!='jpg'){
                     //     $scope.imageShow = false;
                     // }else{
                     //     $scope.imageShow = true;
                     // }
                     // console.log($scope.uriArr[i]);
                     // console.log($scope.imageShow)

                 }
                $('.ddWid').width($scope.detailList.percent);
            }
        });
    };
    $scope.ownerJump = function () {
        $scope.detailShow = false;
        $scope.detailText = '列表';
    }



});

