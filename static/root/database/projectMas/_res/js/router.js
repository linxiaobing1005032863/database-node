var app = angular.module('projectMas', []);
app.config(function($provide, $stateProvider){
    $stateProvider.state("root.database.projectMas", {
        url : "/projectMas",
        views : {
            "content@root.database":{
                templateUrl : "root/database/projectMas/_res/html/index.html",
                controller:"projectMasCtrl"
            },"menu@root.database.projectMas":{
                templateUrl : "root/database/projectMas/_res/html/menu.html",
                controller:"projectMasMenuCtrl"
            }
        }
    }).state("root.database.projectMas.list[12]",{
        url:"/list[12]?id=&name=&tonken&page=",
        views:{
            "content@root.database.projectMas":{
                templateUrl : "root/database/projectMas/list/_res/html/index.html",
                controller:'listCtrl'
            }
        }
    }).state("root.database.projectMas.edit[12]",{
        url:"/edit[12]?id=&tonken=",
        views:{
            "content@root.database.projectMas":{
                templateUrl : "root/database/projectMas/edit/_res/html/index.html",
                controller:'editCtrl'
            }
        }
    }).state("root.database.projectMas.add[12]",{
        url:"/add[12]",
        views:{
            "content@root.database.projectMas":{
                templateUrl : "root/database/projectMas/add/_res/html/index.html",
                controller:'addCtrl'
            }
        }
    }).state("root.database.projectMas.upload[12]",{
        url:"/upload[12]?id=&name=&tonken=&type",
        views:{
            "content@root.database.projectMas":{
                templateUrl : "root/database/projectMas/upload/_res/html/index.html",
                controller:'uploadCtrl'
            }
        }
    }).state("root.database.projectMas.view[12]",{
            url:"/view[12]?id=&name=&tonken=",
            views:{
                "content@root.database.projectMas":{
                    templateUrl : "root/database/projectMas/view/_res/html/index.html",
                    controller:'viewCtrl'
                }
            }
        })
});

