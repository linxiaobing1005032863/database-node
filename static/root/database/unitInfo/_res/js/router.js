var app = angular.module('unitInfo', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.database.unitInfo", {
        url : "/unitInfo",
        views : {
            "content@root.database":{
                templateUrl : "root/database/unitInfo/_res/html/index.html",
                controller:"unitInfoCtrl"
            },"menu@root.database.unitInfo":{
                templateUrl : "root/database/unitInfo/_res/html/menu.html",
                controller:"unitInfoMenuCtrl"
            }
        }
    }).state("root.database.unitInfo.list[12]",{
        url:"/list[12]?id=&name=&tonken&page=",
        views:{
            "content@root.database.unitInfo":{
                templateUrl : "root/database/unitInfo/list/_res/html/index.html",
                controller:'unitListCtrl'
            }
        }
    }).state("root.database.unitInfo.edit[12]",{
        url:"/edit[12]?id=&tonken=",
        views:{
            "content@root.database.unitInfo":{
                templateUrl : "root/database/unitInfo/edit/_res/html/index.html",
                controller:'unitEditCtrl'
            }
        }
    }).state("root.database.unitInfo.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.database.unitInfo":{
                templateUrl : "root/database/unitInfo/add/_res/html/index.html",
                controller:'unitAddCtrl'
            }
        }
    }).state("root.database.unitInfo.upload[12]",{
        url:"/upload[12]?id=&name=&tonken=&type",
        views:{
            "content@root.database.unitInfo":{
                templateUrl : "root/database/unitInfo/upload/_res/html/index.html",
                controller:'unitUploadCtrl'
            }
        }
    }).state("root.database.unitInfo.view[12]",{
            url:"/view[12]?id=&name=&tonken=",
            views:{
                "content@root.database.unitInfo":{
                    templateUrl : "root/database/unitInfo/view/_res/html/index.html",
                    controller:'unitViewCtrl'
                }
            }
        })
});

