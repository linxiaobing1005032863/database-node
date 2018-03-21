var app = angular.module('site', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.database.site", {
        url : "/site",
        views : {
            "content@root.database":{
                templateUrl : "root/database/site/_res/html/index.html",
                controller:"siteCtrl"
            },"menu@root.database.site":{
                templateUrl : "root/database/site/_res/html/menu.html",
                controller:"siteMenuCtrl"
            }
        }
    }).state("root.database.site.list[12]",{
        url:"/list[12]?id=&name=&tonken&page=",
        views:{
            "content@root.database.site":{
                templateUrl : "root/database/site/list/_res/html/index.html",
                controller:'siteListCtrl'
            }
        }
    }).state("root.database.site.edit[12]",{
        url:"/edit[12]?id=&tonken=",
        views:{
            "content@root.database.site":{
                templateUrl : "root/database/site/edit/_res/html/index.html",
                controller:'siteEditCtrl'
            }
        }
    }).state("root.database.site.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.database.site":{
                templateUrl : "root/database/site/add/_res/html/index.html",
                controller:'siteAddCtrl'
            }
        }
    }).state("root.database.site.upload[12]",{
        url:"/upload[12]?id=&name=&tonken=&type",
        views:{
            "content@root.database.site":{
                templateUrl : "root/database/site/upload/_res/html/index.html",
                controller:'siteUploadCtrl'
            }
        }
    })
});

