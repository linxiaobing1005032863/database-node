var app = angular.module('we', [{
    files:[
        "root/database/we/_res/js/service.js"
    ]
},'ipCookie','toastr']);
app.controller('weCtrl',function ($scope,$state) {
    if ($state.current.url == '/we') {//默认加载列表
        $state.go('root.database.we.list[12]');
    }
}).controller('weMenuCtrl',function($scope,$state,$rootScope,$location,ipCookie,weSer,toastr){
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
    var data = {
        user:ipCookie('username')
    };
    weSer.weUsername(data).then(function(response){
        if(response.data.code==200){
            // console.log(response)  传用户名给后台
        }else{
            toastr.error( response.data.msg, '温馨提示');
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
    $scope.delete = function(){
        if($scope.idListd){
            $state.go('root.database.we.list[12]',{id:$scope.idListd,name:'delete',page:$scope.page,tonken:$scope.tonken});
            $scope.menuClass = 'deleteMenu';
        }
    };
    $scope.view = function(){
        if($scope.idListd){
            $state.go('root.database.we.view[12]',{id:$scope.idListd,name:'view',tonken:$scope.tonken});
            $scope.menuClass = 'viewMenu';
        }
    };
    $scope.upload = function(){
            $state.go('root.database.we.upload[12]',{id:$scope.idListd,name:'upload',tonken:$scope.tonken,type:0});
            $scope.menuClass = 'uploadMenu';
    };
    $scope.list = function(){
        $scope.menuClass = 'listMenu';
    };

    $scope.download = function() {
        if ($scope.idListd) {
            var downloadData = {
                user: ipCookie('username'),
                token: $scope.tonken,
                id: $scope.idListd
            };
            $scope.menuClass = 'listMenu';
            $state.go('root.database.we.list[12]',{id:null,name:null,page:null,tonken:null});
            window.open(`/we/download${encode(downloadData,true)}`);

        }
    }
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


