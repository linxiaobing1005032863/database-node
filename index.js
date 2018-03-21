const app = require('koa')();//koa web应用
const path = require('path');//路径
const fs = require('fs');
const router = require("koa-router")();//路由中间件
const session = require('koa-session');//cookie
const koaBody = require('koa-body');
const staticCache = require('koa-static-cache');
const routersPath = '/koa/routers/';
const sendfile = require('koa-sendfile');
var configsCache = {};
const port = process.env.PORT || 80;
// const port = 9923;
const config = require(path.resolve('plugins/read-config.js'));

function fileExists(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

app.keys = ['issp-node'];//session加密值
app.use(session(app));//使用cookie
app.use(koaBody());//必需要路由用之前使用,不然获取不到表单
router.get('/', function *(next) {//根路由
    var status = yield (sendfile(this, path.resolve('static/root/_res/html/index.html')));
    if (!status) {
        this.throw(404);
    }
});
router.get(/^\/module\/_config(?:\/.|$)/, function *(next) {
    var moduleName = this.url.substring(16).replace('.js','');
    var modules = moduleName.split('/');// 以'/'为分隔,第一个是模块名称,往后的为子模块
    if (moduleName == '') {
        this.throw(404);
    }
    var filePath = path.resolve('static/' + modules[0] + '/_res/js/' + (modules.shift(1) && modules.length > 0 ? modules.join('/') : '') + '/config.js');
    if(Object.getOwnPropertyNames(configsCache).length==1000){
        this.body = 'configsCache 对象缓存过大,请检查.';
        return
    }
    if (configsCache[moduleName] == undefined) {//缓存,下次不再判断文件是否存在
        if (fileExists(filePath)) {
            configsCache[moduleName] = true;
        } else {
            configsCache[moduleName] = false;
        }
    }
    if (configsCache[moduleName]) {
        var status = yield (sendfile(this, filePath));
        if (!status) {
            this.throw(404);
        }
    } else {
        this.body = '';
    }
});

/*


 {
 "default":"dev",
 "dev": {
 "rurl": "https://wl.bjike.com"
 "rurl": "http://172.17.205.23:80"
 "rurl": "http://192.168.0.93:90"
 }
 }


* */

//============路由===========

app.use(require(path.join(__dirname,routersPath,'/database/index.js'))().routes());//客户信息
app.use(router.routes());


//============静态文件资源===========
app.use(staticCache(path.join(__dirname, '/static'), {
    maxAge: 10 * 60 * 60
}));


app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.listen(port, function () {
    console.log('koa server listening on port ' + port);
});