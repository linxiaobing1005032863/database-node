var request = require('request-promise');
var path = require('path');
var config = require(path.resolve('plugins/read-config.js'));
var form = require(path.resolve('plugins/form.js'));
var urlEncode = require(path.resolve('plugins/urlEncode.js'));
var uploadFile = require(path.resolve('plugins/uploadFile.js'));
module.exports = function () {
    //获取json
    this.jsonList = function (argvs) { //列表
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['vurl'],
        };
        return request(options);
    };

    /*******项目信息管理*********/
    this.projectList = function (argvs) { //列表
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/projectList${urlEncode(argvs,true)}`,
        };
        return request(options);
    };
    this.projectAdd = function (argvs) { //添加
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/addProject`,
            form: argvs
        };
        return request(options);
    };
    this.projectDetail = function (argvs) {       //列表详情
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/projectInfo${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    this.projectEdit = function (argvs) { //编辑
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/editProject`,
            form: argvs
        };
        return request(options);
    };
    this.projectDelete = function (argvs) {       //删除
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/delProject${urlEncode(argvs,true)}`,
        };

        return request(options);
    };
    this.projectAllDel = function (argvs) {       //批量删除
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/batchDelProject`,
            form:argvs
        };
        return request(options);
    };

    //上传附件
    this.projectUpload = function(argvs){
        var options = {
            url: config()['rurl']+`/customer/index/addFile${urlEncode(argvs.fields,true)}`,
            method: 'POST',
            formData: {
                file: uploadFile(argvs.files.files)
            },
        };
        return request(options);
    };
    //模板文件上传
    this.projectModelUpload = function(argvs){
        var options = {
            url: config()['rurl']+`/customer/index/batchProject${urlEncode(argvs.fields,true)}`,
            method: 'POST',
            formData: {
                file: uploadFile(argvs.files.files)
            },
        };
        return request(options);
    };




    this.projectView = function (argvs) {       // 查看附件
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/slectEnclosure${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    /*******************************业主信息管理*******************************/
    this.ownerList = function (argvs) { //列表
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/ownerList${urlEncode(argvs,true)}`,
            headers:{
                userToken:argvs.userToken
            }
        };
        return request(options);
    };
    this.ownerAdd = function (argvs) { //添加
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/addOwner`,
            form: argvs,
            headers:{
                userToken:argvs.userToken
            }
        };
        return request(options);
    };
    this.ownerDetail = function (argvs) {       //列表详情
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/ownerInfo${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    this.ownerEdit = function (argvs) { //编辑
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/editOwnerList`,
            form: argvs
        };
        return request(options);
    };
    this.ownerDelete = function (argvs) {       //删除
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/delOwner${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    //上传附件
    this.ownerUpload = function(argvs){
        // console.log(argvs.files.files)
        var options = {
            url: config()['rurl']+`/customer/index/addFile`,
            method: 'POST',
            formData: {
                file : uploadFile(argvs.files.files),
            },
        };

        return request(options);
    };

    //模板上传附件
    this.ownerModelUpload = function(argvs){
        var options = {
            url: config()['rurl']+`/customer/index/batchOwner`,
            method: 'POST',
            formData: {
                file: uploadFile(argvs.files.files)
            },
        };
        return request(options);
    };

    this.ownerAllDel = function (argvs) {       //批量删除
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/batchDelOwner`,
            form:argvs
        };
        return request(options);
    };
    this.ownerView = function (argvs) {       // 查看附件
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/slectEnclosure${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    /*******************************中标单位信息管理*******************************/
    this.unitList = function (argvs) { //列表
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/bidCompanyList${urlEncode(argvs,true)}`,
        };
        return request(options);
    };
    this.unitAdd = function (argvs) { //添加
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/addBidCompany`,
            form: argvs
        };
        return request(options);
    };
    this.unitDetail = function (argvs) {       //列表详情
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/bidCompanyInfo${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    this.unitEdit = function (argvs) { //编辑
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/editBidCompany`,
            form: argvs
        };
        return request(options);
    };
    this.unitDelete = function (argvs) {       //删除
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/delBidCompany${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    this.unitUpload = function (argvs) {       //批量上传   中标单位管理
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/batchCompany`,
            formData: {
                file: uploadFile(argvs.files.files)
            },
        };
        return request(options);
    };


    this.unitAllDel = function (argvs) {       //批量删除
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/batchDelCommany`,
            form:argvs
        };
        return request(options);
    };



    /*******************************站点信息*******************************/
    this.siteList = function (argvs) { //列表
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/siteList${urlEncode(argvs,true)}`,
        };
        return request(options);
    };
    this.siteAdd = function (argvs) { //添加
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/addSite`,
            form: argvs
        };
        return request(options);
    };
    this.siteDetail = function (argvs) {       //列表详情
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/siteInfo${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    this.siteEdit = function (argvs) { //编辑
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/editSite`,
            form: argvs
        };
        return request(options);
    };
    this.siteDelete = function (argvs) {       //删除
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/delSite${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    this.siteAllDel = function (argvs) {       //批量删除
        var options = {
            method: 'POST',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/batchDelSite`,
            form:argvs
        };
        return request(options);
    };


    //上传附件
    this.siteUpload = function(argvs){
        var options = {
            url: config()['rurl']+`/customer/index/batchSite${urlEncode(argvs.fields,true)}`,
            method: 'POST',
            formData: {
                file: uploadFile(argvs.files.files)
            },
        };
        return request(options);
    };

    /*************************************我的文档***************************************/
    this.weList = function (argvs) {       //列表
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/myDocument${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    this.weDelete = function (argvs) {       //删除
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/delDocument${urlEncode(argvs,true)}`,
        };
        return request(options);
    };
    this.weUpload = function(argvs){        //上传附件

        var options = {
            url: config()['rurl']+`/customer/index/documentUpload`,
            method: 'POST',
            formData: {
                file: uploadFile(argvs.files.files),
                user:argvs.fields.user
            }
        };
        return request(options);
    };

    this.weUsername = function (argvs) {       //传用户名给后台
        var options = {
            method: 'GET',
            timeout: 3000,
            uri: config()['rurl'] + `/customer/index/myDocument${urlEncode(argvs,true)}`,
        };
        return request(options);
    };

    return this;
};
