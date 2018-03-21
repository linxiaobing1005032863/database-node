var Router = require('koa-router');
var path = require('path');
var sendfile = require('koa-sendfile');
var server = require(path.resolve('koa/servers/' + path.basename(path.resolve(__filename,'../'))+'/index.js'));
var config = require(path.resolve('plugins/read-config.js'));
var fetch = require('node-fetch');//url转发
var koaBody = require('koa-body');
var request = require('request-promise');
var uploadFile = require(path.resolve('plugins/uploadFile.js'));
var urlEncode = require(path.resolve('plugins/urlEncode.js'));
var fileType = require(path.resolve('plugins/fileType.js'));
module.exports = function(){
    var router = new Router();
    //获取json
    router.get('/json/list', function*(){ //列表
        var $self = this;
        var page = $self.request.query;
        yield (server().jsonList(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
        /*********************************项目信息管理************************************************/
    }).get('/project/list', function*(){ //列表
        var $self = this;
        var page = $self.request.query;
        yield (server().projectList(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/project/detail', function*(){ //列表详情
        var $self = this;
        var page = $self.request.query;
        yield (server().projectDetail(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).post('/project/add', function*(){  //添加
        var $self = this;
        var data = this.request.body;
        yield (server().projectAdd(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/project/edit', function*(){  //编辑
        var $self = this;
        var data = this.request.body;
        yield (server().projectEdit(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/project/delete', function*(){ //删除
        var $self = this;
        var deleteData = this.request.query;
        yield (server().projectDelete(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/project/allDel', function*(){ //批量删除
        var $self = this;
        var deleteData = this.request.body;
        yield (server().projectAllDel(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/project/upload', koaBody({multipart:true}),function *(next) {//上传文件
        var $self = this;
        var uploadData = $self.request.body;
        yield (server().projectUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/project/modelUpload', koaBody({multipart:true}),function *(next) {     //上传模板文件
        var $self = this;
        var uploadData = $self.request.body;
        yield (server().projectModelUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/project/view', function*(){ //查看附件
        var $self = this;
        var view = $self.request.query;
        yield (server().projectView(view)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/project/download', function*(){//下载附件
        var $self = this;
        var count = $self.request.query;
        yield (fetch(config()['rurl']+`/customer/index/dowContract${urlEncode(count,true)}`, {
            method : 'GET',
        }).then((res)=>{
            fileType(res.headers._headers['content-disposition'][0].split('filename=')[1],this,true);
            return res.buffer();
        }).then(function(data){
            $self.body = data;
        }));
    }).get('/project/modelDownload', function*(){   //下载模板附件
        var $self = this;
        var count = $self.request.query;
        var fileName = '项目模板'+'.xlsx';
        yield (fetch(config()['rurl']+`/customer/index/dowProjectFormatWord`, {
            method : 'GET'
        }).then(function(res){
            $self.set('content-type', 'application/vnd.ms-excel;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+encodeURI(fileName));
            return res.buffer();
        }).then(function(data){
            $self.body = data;
        }));
    }).get('/owner/list', function*(){ //列表
        /************业主信息管理*************/
        var $self = this;
        var page = $self.request.query;
        page.userToken = $self.cookies.get('token');
        yield (server().ownerList(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/owner/detail', function*(){ //列表详情
        var $self = this;
        var page = $self.request.query;
        yield (server().ownerDetail(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).post('/owner/add', function*(){  //添加
        var $self = this;
        var data = this.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().ownerAdd(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/owner/edit', function*(){  //编辑
        var $self = this;
        var data = this.request.body;
        data.userToken = $self.cookies.get('token');
        yield (server().ownerEdit(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/owner/delete', function*(){ //删除
        var $self = this;
        var deleteData = this.request.query;
        yield (server().ownerDelete(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/owner/allDel', function*(){ //业主批量删除
        var $self = this;
        var deleteData = this.request.body;
        yield (server().ownerAllDel(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/owner/view', function*(){ //查看附件
        var $self = this;
        var view = $self.request.query;
        yield (server().ownerView(view)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/owner/upload', koaBody({multipart:true}),function *(next) {//上传文件
        var $self = this;
        var uploadData = $self.request.body;
        yield (server().ownerUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/owner/modelUpload', koaBody({multipart:true}),function *(next) {// 模板文件上传
        var $self = this;
        var uploadData = $self.request.body;
        yield (server().ownerModelUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/owner/modelDownload', function*(){              //下载模板附件  业主
        var $self = this;
        var count = $self.request.query;
        var fileName = '业主模板'+'.xlsx';
        yield (fetch(config()['rurl']+`/customer/index/dowOwnerFormatWord`, {
            method : 'GET'
        }).then(function(res){
            $self.set('content-type', 'application/vnd.ms-excel;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+encodeURI(fileName));
            return res.buffer();
        }).then(function(data){
            $self.body = data;
        }));
    }).get('/unit/list', function*(){ //列表
        /************中标单位信息管理*************/
        var $self = this;
        var page = $self.request.query;
        yield (server().unitList(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/unit/detail', function*(){ //列表详情
        var $self = this;
        var page = $self.request.query;
        yield (server().unitDetail(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).post('/unit/add', function*(){  //添加
        var $self = this;
        var data = this.request.body;
        yield (server().unitAdd(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/unit/edit', function*(){  //编辑
        var $self = this;
        var data = this.request.body;
        yield (server().unitEdit(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/unit/delete', function*(){ //删除
        var $self = this;
        var deleteData = this.request.query;
        yield (server().unitDelete(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/unit/modelDownload', function*(){                      //下载模板附件  中标单位
        var $self = this;
        var count = $self.request.query;
        var fileName = '中标单位模板'+'.xlsx';
        yield (fetch(config()['rurl']+`/customer/index/dowCompanyFormatWord`, {
            method : 'GET'
        }).then(function(res){
            $self.set('content-type', 'application/vnd.ms-excel;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+encodeURI(fileName));
            return res.buffer();
        }).then(function(data){
            $self.body = data;
        }));
    }).post('/unit/modelUpload', koaBody({multipart:true}),function *(next) {    // 上传模板文件
        var $self = this;
        var uploadData = $self.request.body;
        yield (server().unitUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/unit/allDel', function*(){ //中标单位批量删除
        var $self = this;
        var deleteData = this.request.body;
        yield (server().unitAllDel(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/site/list', function*(){ //列表
        /************站点信息*************/
        var $self = this;
        var page = $self.request.query;
        yield (server().siteList(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/site/detail', function*(){ //列表详情
        var $self = this;
        var page = $self.request.query;
        yield (server().siteDetail(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).post('/site/add', function*(){  //添加
        var $self = this;
        var data = this.request.body;
        yield (server().siteAdd(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/site/edit', function*(){  //编辑
        var $self = this;
        var data = this.request.body;
        yield (server().siteEdit(data)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/site/delete', function*(){ //删除
        var $self = this;
        var deleteData = this.request.query;
        yield (server().siteDelete(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/site/download', function*(){//下载
        var $self = this;
        var count = $self.request.query;
        var fileName = '站点模板'+'.xlsx';
        yield (fetch(config()['rurl']+`/customer/index/dowFormatWord`, {
            method : 'GET'
        }).then(function(res){
            $self.set('content-type', 'application/vnd.ms-excel;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+encodeURI(fileName));
            return res.buffer();
        }).then(function(data){
            $self.body = data;
        }));
    }).post('/site/upload', koaBody({multipart:true}),function *(next) {//上传文件
        var $self = this;
        var uploadData = $self.request.body;
        yield (server().siteUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).post('/site/allDel', function*(){ //站点批量删除
        var $self = this;
        var deleteData = this.request.body;
        yield (server().siteAllDel(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));

    }).get('/we/list', function*(){ //列表详情
        //我的文档
        var $self = this;
        var page = $self.request.query;
        yield (server().weList(page)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
            }));
    }).get('/we/delete', function*(){ //删除
        var $self = this;
        var deleteData = this.request.query;
        yield (server().weDelete(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/we/download', function*(){//   我的文档下载
        var $self = this;
        var count = $self.request.query;
        yield (fetch(config()['rurl']+`/customer/index/documentDownload${urlEncode(count,true)}`, {
            method : 'GET'
        }).then((res)=>{
            if(res.headers._headers['content-disposition']){
                fileType(res.headers._headers['content-disposition'][0].split('filename=')[1],$self,true);
                return res.buffer();
            }else {
                return res.json();
            }
        }).then(function(data){
            if(data.code == 0){
               $self.body = data.msg
            }else {
                $self.body = data;
            }
        }).catch((error)=>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            })
        );
    }).post('/we/upload', koaBody({multipart:true}),function *(next) {//上传文件  我的文档
        var $self = this;
        var uploadData = $self.request.body;
        yield (server().weUpload(uploadData)
            .then((parsedBody) =>{
                $self.body = parsedBody;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    }).get('/we/username', function*(){ //传用户名给后台
        var $self = this;
        var deleteData = this.request.query;
        yield (server().weUsername(deleteData)
            .then((parsedBody) =>{
                var responseText = JSON.parse(parsedBody);
                $self.body = responseText;
            }).catch((error) =>{
                $self.set('Content-Type','application/json;charset=utf-8');
                $self.body=error.error;
                console.error(error.error);
            }));
    });
    return router;
};
