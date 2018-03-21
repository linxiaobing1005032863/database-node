var app = angular.module('editCtrlM', ['toastr']);
app.controller('editCtrl', function($scope, projectSer,$stateParams,$state,toastr,$http){
    $scope.ads = false;
    var data = {
        id:$stateParams.id,
        token:$stateParams.tonken,
    };
    //获取回显详情
    projectSer.projectDetail(data).then(function (response) {
        if(response.data.code == 200){
            $scope.edit = response.data.data;

            $scope.csData = $scope.edit.project_address.split('-');
            console.log($scope.csData)
            if($scope.csData.length == 1){
                $scope.csData.push('请选择市');
                $scope.csData.push('请选择区');
            }else if($scope.csData.length == 2){
                if($scope.csData[0]=="北京市"||$scope.csData[0]=="上海市"||$scope.csData[0]=="天津市"){
                    $scope.csData.splice(1,0,'市辖区');
                }else if($scope.csData[0]=="重庆市"){
                    if($scope.csData[1].charAt($scope.csData[0].length-1)=="区"){
                        $scope.csData.splice(1,0,'市辖区');
                    }
                    if($scope.csData[1].charAt($scope.csData[0].length-1)=="县"){
                        $scope.csData.splice(1,0,'县');
                    }
                }else{
                    $scope.csData.push('请选择区');
                }
            }else if($scope.csData.length == 3){
                $scope.oneData = $scope.csData.join(',');
                if($scope.csData[0] == ''){
                    $scope.csData = ['请选择省','请选择市','请选择区'];
                }
                if($scope.csData[1] == ''){
                    $scope.csData[1] = '请选择市';
                    $scope.csData[2] = '请选择区';
                    console.log($scope.csData)
                }
                if($scope.csData[2] == ''){
                    $scope.csData[2] = '请选择区';
                    console.log($scope.csData)
                }
            }


            $scope.csData = $scope.csData.join('/');
            $(".pick-area6")[0].name = $scope.csData;//地区回写
            $(".pick-area6").pickArea();//初始化三级联动
        }
    });
    //显示隐藏相对应的东西
    //上传文件
    $scope.files = [];
    $scope.affirmFile = [];
    var oldFiles = [];
    $scope.fileNameChanged = function (className,idName,fileIdName) {
        fileName(className,idName,fileIdName)
    };
    function fileName(className,idName,fileIdName) {
        $scope.$apply(function () {//触发angular脏检测
            var elFiles = document.getElementById(fileIdName).files;
            angular.forEach(elFiles,function (obj) {
                $(idName).text(obj.name);
                $(className).attr('title',obj.name);
            });

            for (var i = 0, len = elFiles.length; i < len; i++) {
                var file = elFiles[i];
                var hasOldFile = false;
                for(var ii=0,iiLen=oldFiles.length;ii<iiLen;ii++){
                    if(oldFiles[ii].name==file.name){
                        hasOldFile = true;
                        break;
                    }
                }
                if(!hasOldFile){
                    oldFiles.push(file);
                }
                $scope.files.push({
                    name: file.name,
                    size: file.size,
                    type: file.type
                });
            }
        });
    }

    $scope.updataSel = function(idNames){
        modelUpload(idNames)
    };
    function modelUpload(idNames) {
        var fd = new FormData();
        var _files = $scope.files;
        if($scope.files[0].size>'52428800'){   //判断文件超过50M清空数组
            $scope.files = [];
        }
        for (var i = 0; i < oldFiles.length; i++) {
            var f = oldFiles[i];
            for (var b = 0; b < _files.length; b++) {
                if (f.name == _files[b].name) {
                    fd.append('files', f);
                    break;
                }
            }
        }
        if (_files.length) {
            if(_files[0].size>'52428800'){    //判断文件超过50M  停止上传
                toastr.info('文件太大,请重新上传','温馨提示');
                return;
            }
            $http({
                method: 'POST',
                url: '/project/upload',
                headers: {
                    'Content-Type': undefined
                },
                data: fd,
                transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    });
                    return formData;
                }

            }, function (data) {
                console.info(data);
            }).then(function (response) {
                if (response.data.code == 200) {
                    if(idNames =='#changeText'){
                        $scope.edit.party_a_bid_contract_url= response.data.data;
                    }
                    if(idNames =='#changeTextOne'){
                        $scope.edit.bid_contract_url= response.data.data;
                    }
                    // if(idNames =='#changeTextTwo'){
                    //     $scope.edit.owner_contract_url= response.data.data;
                    // }
                    // if(idNames =='#changeTextThree'){
                    //     $scope.edit.party_a_owner_contract_url= response.data.data;
                    // }
                    if(idNames =='#changeTextFour'){
                        $scope.edit.site_selection_url= response.data.data;
                    }
                    $(idNames).text('成功上传');
                    toastr.success("文件上传成功", '温馨提示');
                } else {
                    toastr.error(response.data.msg, '温馨提示');
                }
            });
        }else{
            toastr.info('请选择上传的附件','温馨提示');
        }
    }

    //编辑提交
    $scope.projectEditFun = function () {
        console.log($(".pick-area-hidden").val())//获取地区的值

        if($(".pick-area-hidden").val()){//地区改变了
            var address = $(".pick-area-hidden").val().split(" ");

            if(address.length == 1){
                address.push("");
                address.push("");
            }
            if(address.length == 2){
                address.push("");
            }
            if(address[0]=="北京市"||address[0]=="上海市"||address[0]=="天津市"||address[0]=="重庆市"){
                address.splice(1,1,'');
            }

            $scope.edit.project_address = address.join(',');
        }else{//地区没变
            var address2 = $scope.edit.project_address.split("-");
            if(address2.length == 1){
                address2.push("");
                address2.push("");
            }
            if(address2.length == 2){
                if(address2[0]=="北京市"||address2[0]=="上海市"||address2[0]=="天津市"||address2[0]=="重庆市"){
                    address2.splice(1,0,'');
                }else{
                    address2.push("");
                }
            }
            if(address2.length == 3){
                if(address2[0]=="北京市"||address2[0]=="上海市"||address2[0]=="天津市"||address2[0]=="重庆市"){
                    address2.splice(1,1,'');
                }
            }
            $scope.edit.project_address = address2.join(',');
        }


        $scope.edit.project_collect_time= angular.element('.time').val();

        $scope.edit.party_a_bid_contract_sign_time= angular.element('.one-sign-time').val();
        $scope.edit.party_a_bid_contract_start_time= angular.element('.one-start-time').val();
        $scope.edit.party_a_bid_contract_end_time= angular.element('.one-end-time').val();

        $scope.edit.bid_contract_sign_time= angular.element('.two-sign-time').val();
        $scope.edit.bid_contract_start_time= angular.element('.two-start-time').val();
        $scope.edit.bid_contract_end_time= angular.element('.two-end-time').val();

        $scope.edit.owner_contract_sign_time= angular.element('.three-sign-time').val();
        $scope.edit.owner_contract_start_time= angular.element('.three-start-time').val();
        $scope.edit.owner_contract_end_time= angular.element('.three-end-time').val();

        $scope.edit.party_a_owner_contract_sign_time= angular.element('.four-sign-time').val();
        $scope.edit.party_a_owner_contract_start_time= angular.element('.four-start-time').val();
        $scope.edit.party_a_owner_contract_end_time= angular.element('.four-end-time').val();

        $scope.edit.project_start_time= angular.element('.project_start_time').val();
        $scope.edit.project_completed_time= angular.element('.project_completed_time').val();
        // $scope.edit.project_address = angular.element('.s_province').val()+','+angular.element('.s_city').val()+','+angular.element('.s_county').val();
        // if(angular.element('.s_province').val() == "省份"||angular.element('.s_city').val() =="地级市"||angular.element('.s_county').val()=="市、县级市"){
        //     toastr.error('请正确填写项目地区', '温馨提示');  return;  //如果地区格式报错,不让编辑提交
        // }
        if($scope.edit.party_a_bid_contract == '是'){
            $scope.edit.party_a_bid_contract = 1
        }else {
            $scope.edit.party_a_bid_contract = 0
        }
        if($scope.edit.bid_contract == '是'){
            $scope.edit.bid_contract = 1
        }else {
            $scope.edit.bid_contract = 0
        }
        // if($scope.edit.owner_contract == '是'){
        //     $scope.edit.owner_contract = 1
        // }else {
        //     $scope.edit.owner_contract = 0
        // }
        // if($scope.edit.party_a_owner_contract == '是'){
        //     $scope.edit.party_a_owner_contract = 1
        // }else {
        //     $scope.edit.party_a_owner_contract = 0
        // }
        if($scope.edit.site_selection == '是'){
            $scope.edit.whether_site_selection = 1
        }else {
            $scope.edit.whether_site_selection = 0
        }
        // if($scope.edit.project_name&&$scope.edit.project_type&&$scope.edit.business_type&&$scope.edit.data_source&&
        //     $scope.edit.project_collect_time&&$scope.edit.founder&&$scope.edit.important_level&&$scope.edit.project_address&&
        //     $scope.edit.project_establishment&&$scope.edit.party_a_company&&$scope.edit.bid_company&&$scope.edit.party_a_bid_contract&&
        //     $scope.edit.bid_contract){
            projectSer.projectEdit($scope.edit).then(function (response) {
                if(response.data.code == 200){
                    $state.go('root.database.projectMas.list[12]',{id:null,tonken:null});
                    toastr.success('编辑成功','温馨提示')
                }else {
                    toastr.error(response.data.msg,'温馨提示')
                }
            })
        // }else{
        //     toastr.error('请检查必填字段','温馨提示')
        // }

    };
});






