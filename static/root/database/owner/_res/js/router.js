var app = angular.module('owner', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.database.owner", {
        url : "/owner",
        views : {
            "content@root.database":{
                templateUrl : "root/database/owner/_res/html/index.html",
                controller:"ownerCtrl"
            },"menu@root.database.owner":{
                templateUrl : "root/database/owner/_res/html/menu.html",
                controller:"ownerMenuCtrl"
            }
        }
    }).state("root.database.owner.list[12]",{
        url:"/list[12]?id=&name=&tonken&page=",
        views:{
            "content@root.database.owner":{
                templateUrl : "root/database/owner/list/_res/html/index.html",
                controller:'ownerListCtrl'
            }
        }
    }).state("root.database.owner.edit[12]",{
        url:"/edit[12]?id=&tonken=",
        views:{
            "content@root.database.owner":{
                templateUrl : "root/database/owner/edit/_res/html/index.html",
                controller:'ownerEditCtrl'
            }
        }
    }).state("root.database.owner.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.database.owner":{
                templateUrl : "root/database/owner/add/_res/html/index.html",
                controller:'ownerAddCtrl'
            }
        }
    }).state("root.database.owner.upload[12]",{
        url:"/upload[12]?id=&name=&tonken=&type",
        views:{
            "content@root.database.owner":{
                templateUrl : "root/database/owner/upload/_res/html/index.html",
                controller:'ownerUploadCtrl'
            }
        }
    }).state("root.database.owner.view[12]",{
            url:"/view[12]?id=&name=&tonken=",
            views:{
                "content@root.database.owner":{
                    templateUrl : "root/database/owner/view/_res/html/index.html",
                    controller:'viewCtrl'
                }
            }
    })
});

