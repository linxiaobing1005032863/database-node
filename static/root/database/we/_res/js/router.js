var app = angular.module('we', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.database.we", {
        url : "/we",
        views : {
            "content@root.database":{
                templateUrl : "root/database/we/_res/html/index.html",
                controller:"weCtrl"
            },"menu@root.database.we":{
                templateUrl : "root/database/we/_res/html/menu.html",
                controller:"weMenuCtrl"
            }
        }
    }).state("root.database.we.list[12]",{
        url:"/list[12]?id=&name=&tonken&page=",
        views:{
            "content@root.database.we":{
                templateUrl : "root/database/we/list/_res/html/index.html",
                controller:'weListCtrl'
            }
        }
    }).state("root.database.we.upload[12]",{
            url:"/upload[12]?id=&name=&tonken=",
            views:{
                "content@root.database.we":{
                    templateUrl : "root/database/we/upload/_res/html/index.html",
                    controller:'weUploadCtrl'
                }
            }
        })
});

