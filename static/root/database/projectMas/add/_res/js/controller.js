var app = angular.module('addCtrlM', ['toastr']);
app.controller('addCtrl', function($scope,projectSer,$state,toastr,$stateParams,$http){
  $scope.ads = false;
  //显示隐藏相对应的东西
    //上传文件
    $scope.files = [];
    $scope.affirmFile = [];
    var oldFiles = [];
    $scope.fileNameChanged = function (className,idName,fileIdName) {
        fileName(className,idName,fileIdName)
    };
    function fileName(className,idName,fileIdName) {
        console.log(idName);
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
                        $scope.add.party_a_bid_contract_url= response.data.data;
                    }
                    if(idNames =='#changeTextOne'){
                        $scope.add.bid_contract_url= response.data.data;
                    }
                    // if(idNames =='#changeTextTwo'){
                    //     $scope.add.owner_contract_url= response.data.data;
                    // }
                    // if(idNames =='#changeTextThree'){
                    //     $scope.add.party_a_owner_contract_url= response.data.data;
                    // }
                    if(idNames =='#changeTextFour'){
                        $scope.add.site_selection_url= response.data.data;
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
    $(".pick-area6").pickArea();//初始化三级联动
    //添加提交
    $scope.projectAddFun = function () {

        // console.log($(".pick-area-hidden").val())//获取地区的值
        var address = $(".pick-area-hidden").val().split(" ");
        if(address.length == 1){
            address.push("");
            address.push("");

        }
        if(address.length == 2){
            address.push("");

        }
        if(address[0]=="北京市"||address[0]=="上海市"||address[0]=="天津市"||address[0]=="重庆市"){
            address[1] = "";
        }
        if(!$scope.add){
            $scope.add = {};
        }
        $scope.add.project_address = address.join(',');

        $scope.add.project_collect_time= angular.element('.time').val();

        $scope.add.party_a_bid_contract_sign_time= angular.element('.one-sign-time').val();
        $scope.add.party_a_bid_contract_start_time= angular.element('.one-start-time').val();
        $scope.add.party_a_bid_contract_end_time= angular.element('.one-end-time').val();

        $scope.add.bid_contract_sign_time= angular.element('.two-sign-time').val();
        $scope.add.bid_contract_start_time= angular.element('.two-start-time').val();
        $scope.add.bid_contract_end_time= angular.element('.two-end-time').val();

        $scope.add.owner_contract_sign_time= angular.element('.three-sign-time').val();
        $scope.add.owner_contract_start_time= angular.element('.three-start-time').val();
        $scope.add.owner_contract_end_time= angular.element('.three-end-time').val();

        $scope.add.party_a_owner_contract_sign_time= angular.element('.four-sign-time').val();
        $scope.add.party_a_owner_contract_start_time= angular.element('.four-start-time').val();
        $scope.add.party_a_owner_contract_end_time= angular.element('.four-end-time').val();

        $scope.add.project_start_time= angular.element('.project_start_time').val();
        $scope.add.project_completed_time= angular.element('.project_completed_time').val();
        // $scope.add.project_address = angular.element('.s_province').val()+','+angular.element('.s_city').val()+','+angular.element('.s_county').val();
        // if(angular.element('.s_province').val() == "省份"||angular.element('.s_city').val() =="地级市"||angular.element('.s_county').val()=="市、县级市"){
        //     toastr.error('请正确填写项目地区', '温馨提示'); return;
        // }
        if($scope.add.party_a_bid_contract == '是'){
            $scope.add.party_a_bid_contract = 1
        }else {
            $scope.add.party_a_bid_contract = 0
        }
        if($scope.add.bid_contract == '是'){
            $scope.add.bid_contract = 1
        }else {
            $scope.add.bid_contract = 0
        }
        // if($scope.add.whether_owner_contract == '是'){
        //     $scope.add.whether_owner_contract = 1
        // }else {
        //     $scope.add.whether_owner_contract = 0
        // }
        // if($scope.add.whether_party_a_owner_contract == '是'){
        //     $scope.add.whether_party_a_owner_contract = 1
        // }else {
        //     $scope.add.whether_party_a_owner_contract = 0
        // }
        if($scope.add.whether_site_selection == '是'){
            $scope.add.whether_site_selection = 1
        }else {
            $scope.add.whether_site_selection = 0
        };
        console.log($scope.add)
        // if($scope.add.project_name&&$scope.add.project_type&&$scope.add.business_type&&$scope.add.data_source&&
        //     $scope.add.project_collect_time&&$scope.add.founder&&$scope.add.important_level&&$scope.add.project_address&&
        //     $scope.add.project_establishment&&$scope.add.party_a_company&&$scope.add.bid_company&&$scope.add.party_a_bid_contract&&
        //     $scope.add.bid_contract){
            projectSer.projectAdd($scope.add).then(function (response) {
                if(response.data.code == 200){
                    $state.go('root.database.projectMas.list[12]');
                    toastr.success('添加成功','温馨提示')
                }else {
                    toastr.error(response.data.msg,'温馨提示')
                }
            })
        // }else{
        //     toastr.error('请检查必填字段','温馨提示')
        // }

    };
});






