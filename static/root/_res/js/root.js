var app = angular.module('app', ['ui.router', 'oc.lazyLoad','angular-loading-bar','toastr']);
app.controller('root', function ($rootScope, $urlRouter, $ocLazyLoad, $location) {
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if (!$location.path()) {
            $location.path('/root');
        } else {
            if ($location.path() == '/root/') {
                $location.path('/root');
            }
        }
        var moduleName = $location.path();
        var modules = moduleName.substring(1).split('/');
        var prefixModules = [];
        modules.forEach(function (module) {
            var _module = module;
            var filter = _module.match(/\[\d+\]/g);
            if (filter) {
                _module = module.replace(/\[\d+\]/g, '');
            }
            prefixModules.push(_module);
            loadModule($ocLazyLoad, $urlRouter, prefixModules.join('/'), filter);//加载模块
        });
    });
    $urlRouter.listen();
});

function loadModule($ocLazyLoad, $urlRouter, moduleName, filter, fun) {
    moduleName = moduleName[0] != '/' ? ('/' + moduleName) : moduleName
    var loadFiles = ['/module/_config' + moduleName + '.js', moduleName + '/_res/js/router.js', moduleName + '/_res/js/controller.js'];
    if (filter) {
        var filterStr = filter.pop();
        if (filterStr == '[123]') {
            return;
        }
        if (filterStr.match('1')) {//不加载config.js配置文件
            loadFiles.shift(0);
            if (filterStr.match('2')) {//不加载router.js路由文件
                loadFiles.shift(0);
                $ocLazyLoad.load(loadFiles[0]).then(function () {
                    $urlRouter.sync();
                    if (fun) {
                        fun();
                    }
                });
            } else {
                $ocLazyLoad.load(loadFiles[0]).then(function () {
                    loadFiles.shift(0);
                    $ocLazyLoad.load(loadFiles[0]).then(function () {
                        $urlRouter.sync();
                        if (fun) {
                            fun();
                        }
                    });
                });
            }
            return;
        } else if (filterStr.match('2')) {//不加载controller.js控制器文件
            loadFiles.splice(1, 1);
            $ocLazyLoad.load(loadFiles[0]).then(function () {
                loadFiles.shift(0);
                $ocLazyLoad.load(loadFiles[0]).then(function () {
                    $urlRouter.sync();
                    if (fun) {
                        fun();
                    }
                });
            });
            return;
        }
    }

    $ocLazyLoad.load(loadFiles[0]).then(function () {
        loadFiles.shift(0);
        $ocLazyLoad.load(loadFiles[0]).then(function () {
            loadFiles.shift(0);
            $ocLazyLoad.load(loadFiles[0]).then(function () {
                $urlRouter.sync();
                if (fun) {
                    fun();
                }
            });
        });
    });
}

app.config(function ($provide, $urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
    $provide.decorator('$state', function ($delegate, $ocLazyLoad, $urlRouter) {//ui-router 渲染
        var state = {};
        angular.copy($delegate, state);
        $delegate.transitionTo = function (uiRouter) {
            var args = arguments;
            var uiRouter = args[0];
            if (uiRouter.self) {//刷新进来
                var name = uiRouter.self.name;
                if (name != 'root') {
                    name = '/' + name.split('.').join('/');
                }

                var filter = name.match(/\[\d+\]/g);
                if (filter) {
                    name = name.replace(/\[\d+\]/g, '');
                }
                if (filter) {
                    if (!filter.pop().match('3')) {
                        $ocLazyLoad.load([name + '/_res/js/controller.js']).then(function () {
                            state.transitionTo.apply(null, args);
                        });
                    }
                } else {
                    $ocLazyLoad.load([name + '/_res/js/controller.js']).then(function () {
                        state.transitionTo.apply(null, args);
                    });
                }
            } else {// ui-sref 点击进来
                if (uiRouter[0] == '.') {//判断是否有相对路径 .user
                    var sname = args[2].relative.self.name;
                    var snames = sname.split('.');
                    var uiRouters = uiRouter.substring(1).split('.');
                    if (uiRouters[0] == snames[snames.length - 1]) {//
                        uiRouters.shift(1);
                        uiRouter = (sname + '.' + uiRouters.join('.'));
                    } else {
                        var len = sname.indexOf(uiRouter) != -1 ? sname.indexOf(uiRouter) : sname.length;
                        uiRouter = sname.substring(0, len) + uiRouter;
                    }
                }
                var path = uiRouter;
                if (path[0] != '_') {
                    var filter = path.match(/\[\d+\]/g);
                    if (filter) {
                        path = path.replace(/\[\d+\]/g, '');
                    }
                    loadModule($ocLazyLoad, $urlRouter, path.split('.').join('/'), filter, function () {
                        state.transitionTo.apply(null, args);
                    });
                } else {
                    var modules = path.substring(1).split('.');
                    var prefixModules = [];
                    modules.forEach(function (module, i) {
                        var _module = module;
                        var filter = _module.match(/\[\d+\]/g);
                        if (filter) {
                            _module = module.replace(/\[\d+\]/g, '');
                        }
                        prefixModules.push(_module);
                        if (args[0][0] == '_') {
                            args[0] = args[0].substring(1);
                        }
                        loadModule($ocLazyLoad, $urlRouter, prefixModules.join('/'), filter, function () {
                            try {
                                state.transitionTo.apply(null, args);
                            } catch (e) {
                            }
                        });//加载模块
                    });
                }


            }
        };
        return $delegate;
    });
}).config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push(HttpInterceptor);
}]).config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: false,
        tapToDismiss: true,

        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
});
app.factory('HttpInterceptor', ['$q', HttpInterceptor]);
function HttpInterceptor($q,toastr){
    return {
        request : function(config){
            return config;
        },
        requestError : function(err){
            console.info(err);
            return $q.reject(err);
        },
        response : function(res){
            return res;
        },
        responseError : function(err){
            if(-1 === err.status){
                // 远程服务器无响应
            } else if(500 === err.status){
                // 处理各类自定义错误
            } else if(501 === err.status){
                // ...
            }else if(404===err.status){
                toastr.error('服务器出错，请联系管理员', '温馨提示');
            }
            console.info(err);
            return $q.reject(err);
        }
    };
}