var app = angular.module('app');
app.config(function ($provide, $stateProvider) {
    $stateProvider.state("root", {
        url: "/root",
        views: {
            "": {
                templateUrl: "root/_res/html/content.html",
                controller: "rootCtrl"
            }
        }
    })
});