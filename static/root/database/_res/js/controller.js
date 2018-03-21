var app = angular.module('database', []);
app.controller('databaseCtrl', function ($scope,$state) {
    if ($state.current.url == '/database') {//默认加载列表
        $state.go('root.database.projectMas');
    }
}).controller('navCtrl',function($scope,$state,$location,$rootScope,databaseSer){
    //一级导航
    $scope.menuClass='know';
    $scope.menuCla = function(name){
        $scope.menuClass = name;
    };

    //二级导航
    $scope.navClass= 'projectMas';
    $scope.navCla = function(name){
        $scope.navClass = name;
    };

    if (window.location.href.split('/').splice(6,1)) {//如果是刷新进来的页面，没有经过list
        $scope.menu = window.location.href.split('/').splice(6,1);
        $scope.navClass = String($scope.menu);
    }


    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]'){
            $scope.navClas = window.location.href.split('/').splice(-2,1);
            $scope.menuClass ='know';
            $scope.navClass =String($scope.navClas);
        }
    });
     // 组织事件冒泡
    $scope.shop = function (event) {
        event.stopPropagation()
    };

    databaseSer.jsonList().then(function (res) {
        if(res.status == 200){
            res.data.data.shift();
            // res.data.data.splice(start,delCount);//从start的位置开始向后删除delCount个元素
            $scope.navName = res.data.data;
        }
    })

});


