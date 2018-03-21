var app = angular.module('app', ['ngVerify','ipCookie',
    'indexSerModule'
]);
app.controller('rootCtrl', function ($scope,$rootScope,$state,ipCookie,rootSer,$location) {
    if ($state.current.url == '/root') {//默认加载列表
        $state.go('root.database');
    }
    if(ipCookie('username')){
        $scope.username = '欢迎回来，'+ipCookie('username');
    }else{
        var absurl = $location.absUrl();
        window.location.href='http://login.issp.bjike.com/login?url='+absurl;
    }
    if($scope.username== undefined){
        $scope.username="登录用户"
    }
    $scope.exit = function () {
        var absurl = $location.absUrl();
        window.location.href='http://login.issp.bjike.com/login?url='+absurl
    };
        //跳转首页
    $scope.jumpPage = function () {
        window.location.href="https://customersmanage.issp.bjike.com"
    };


    //监听当前页面id变化
    $scope.$on('changeId',function(event,msg,token){
        $scope.$broadcast('listId',msg,token)
    });
    $scope.$on('changeMenu',function(event,msg){
        $scope.$broadcast('ableMenu',msg)
    });
    $scope.$on('changePage',function(event,msg){
        $scope.$broadcast('listPage',msg)
    });
    $scope.$on('changeName',function(event,msg){
        $scope.$broadcast('allName',msg)
    });


});

/*增加滚动条*/
app.directive('resize', function ($window) {
    return function (scope,element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return { 'h': w.height() };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.style = function () {
                return {
                    'height': (newValue.h - 55) + 'px'
                };
            };
        }, true);
        w.bind('resize', function () {
            scope.$apply();
        });
    };
}).directive('tic',function(){
    return{
        restrict:'AE',
        replace:true,
        link:function(scope,elements,attrs) {
            elements.click(function () {
            elements.addClass('tick').css('border','1px solid #2aa6e7').parents().parents().siblings().removeClass('tick');
            /*点击勾选*/
            $(".checked-none").each(function(i){
                elements.attr({"id":"checked"+i});
                elements.next("label").attr("for","checked"+i);
            });
        })}

    }
}).directive('act',function(){
    return{
        restrict:'AE',
        replace:true,
        link:function(scope,elements,attrs) {
                elements.click(function () {
                    elements.parent().toggleClass('act').toggleClass('box-en-bg');
                    if(elements.parent().hasClass('box-en-bg')){
                        $('.box-circle-text').text('否');

                    }else {
                        $('.box-circle-text').text('是');
                    }
                })
        }
    }
}).directive('sho',function(){   //多余的字段不显示使用title
    return{
        restrict:'AE',
        replace:true,
        link:function(scope,elements,attrs) {
            elements.hover(function () {
                var $self = this;
                $self.title= elements.text();
            })
        }
    }
});
