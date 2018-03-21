var app = angular.module('owner', [{
    files:[
        "root/database/owner/_res/js/service.js"
    ]
}]);
app.controller('ownerCtrl',function ($scope,$state) {
    if ($state.current.url == '/owner') {//默认加载列表
        $state.go('root.database.owner.list[12]');
    }
}).controller('ownerMenuCtrl',function($scope,$state,$location,$stateParams,$rootScope){
    var urlName = $state.current.url.split('/')[1].split('[')[0];
    $scope.menuClass = urlName+"Menu";
    $scope.navClass= function(name){
        $scope.menuClass = name;
    };
    if (window.location.href.split('id=')[1]) {//如果是刷新进来的页面，没有经过list
        $scope.idListd = window.location.href.split('id=')[1];
        if($location.search().name){
            $scope.menuClass = $location.search().name + 'Menu'
        }
    }
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]'&& window.location.href.indexOf('id=') == -1){
            $scope.menuClass = 'listMenu';
        }
    });
    //监听到父Ctrl后改变事件
    $scope.$on("listId", function(event, msg,token){
        $scope.idListd = msg;
        $scope.tonken = token;
    });
    $scope.$on("ableMenu", function(event,menu){
        $scope.menuClass = menu;
    });
    $scope.$on('listPage',function (event,page) {
        $scope.page = page;
    });
    $scope.$on('allName',function (event,name) {
        $scope.name = name;
    });

    $scope.delete = function(){
        if($scope.name == false) return;
        if($scope.idListd){
            $state.go('root.database.owner.list[12]',{id:$scope.idListd,name:'delete',page:$scope.page,tonken:$scope.tonken});
            $scope.menuClass = 'deleteMenu';
        }
    };
    $scope.list = function(){
        $scope.menuClass = 'listMenu';
        $state.go('root.database.owner.list[12]',{id:null,name:null,page:null,tonken:null});
    };
    $scope.all = function(){
        if($scope.name == false){
            $state.go('root.database.owner.list[12]',{id:$scope.idListd,name:'all',page:$scope.page,tonken:$scope.tonken});
            $scope.menuClass = 'allMenu';
        }
    };
    $scope.add = function(){
        $scope.menuClass = 'addMenu';
        $scope.idListd = null;
    };
    $scope.edit = function(){
        if($scope.idListd){
            $state.go('root.database.owner.edit[12]',{id:$scope.idListd,tonken:$scope.tonken});
            $scope.menuClass = 'editMenu'
        }
    };
    $scope.view = function(){
        if($scope.idListd){
            $state.go('root.database.owner.view[12]',{id:$scope.idListd,name:'view',tonken:$scope.tonken});
            $scope.menuClass = 'viewMenu';
        }
    };
    $scope.upload = function(){     //模板上传
        $scope.menuClass = 'uploadMenu';
    };

    $scope.download = function(){    //模板下载
        $scope.menuClass = 'listMenu';
        window.open(`/owner/modelDownload`);
    };
});

app.filter('cover',function () {
   return  function (val) {
       var result;
       switch (val){
           case 'MAN':
               result = '男';
               break;
           case 'WOMAN':
               result = '女';
               break;
           case 'COMPLETEPROJECT':
               result = '已完成项目客户';
               break;
           case 'PROJECTING':
               result = '现项目客户';
               break;
           case 'POTENTIAL':
               result = '潜在客户';
               break;
           case 'FAILURECUSTOMER':
               result = '失败客户';
               break;
           case 'LOSTCUSTOMER':
               result = '已流失客户';
               break;
       }
       return result
   }
});
