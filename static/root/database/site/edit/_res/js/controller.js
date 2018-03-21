var app = angular.module('siteEditModel', ['toastr']);
app.controller('siteEditCtrl', function($scope, siteSer,$stateParams,$state,toastr,){
    var data = {
        id:$stateParams.id,
        token:$stateParams.tonken,
    };
    siteSer.siteDetail(data).then(function (response) {
        if(response.data.code == 200){
            $scope.edit = response.data.data;
            // $scope.areaData = $scope.edit.site_region.split('-');
            // if($scope.areaData[0] == ''){
            //     $scope.areaData =["省份","地级市","市、县级市"]
            // }
            // _init_area($scope.areaData);
            $scope.csData = $scope.edit.site_region.split('-');
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
    $scope.siteEditFun = function () {
        $scope.edit.admission_time = angular.element('.admission-time').val();
        $scope.edit.finished_time = angular.element('.finish-time').val();
        $scope.edit.open_time = angular.element('.open-time').val();
        $scope.edit.verification_time = angular.element('.ver-time').val();
        $scope.edit.start_verification_time = angular.element('.start-time').val();
        $scope.edit.end_verification_time = angular.element('.end-time').val();
        // $scope.edit.site_region = angular.element('.s_province').val()+','+angular.element('.s_city').val()+','+angular.element('.s_county').val();
        // if(angular.element('.s_province').val() == "省份"||angular.element('.s_city').val() =="地级市"||angular.element('.s_county').val()=="市、县级市"){
        //     toastr.error('请正确填写项目地区', '温馨提示'); return;
        // }
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

            $scope.edit.site_region = address.join(',');
        }else {//地区没变
            var address2 = $scope.edit.site_region.split("-");
            if(address2.length == 1){
                address2.push("");
                address2.push("");
            }
            if(address2.length == 2){
                if(address2[0] == "北京市" || address2[0] == "上海市" || address2[0] == "天津市" || address2[0] == "重庆市"){
                    address2.splice(1, 0, '');
                } else {
                    address2.push("");
                }
            }
            if(address2.length == 3){
                if(address2[0] == "北京市" || address2[0] == "上海市" || address2[0] == "天津市" || address2[0] == "重庆市"){
                    address2.splice(1, 1, '');
                }
            }
            $scope.edit.site_region = address2.join(',');
        }
        //是否选址
        if($scope.edit.whether_address == '是'){
            $scope.edit.whether_address = 1
        }else {
            $scope.edit.whether_address = 0
        }
        //是否入场
        if($scope.edit.whether_admission == '是'){
            $scope.edit.whether_admission = 1
        }else {
            $scope.edit.whether_admission = 0
        }
        //是否完工
        if($scope.edit.whether_finished == '是'){
            $scope.edit.whether_finished = 1
        }else {
            $scope.edit.whether_finished = 0
        }
        //是否开通
        if($scope.edit.whether_open == '是'){
            $scope.edit.whether_open = 1
        }else {
            $scope.edit.whether_open = 0
        }
        //单验证是否通过
        if($scope.edit.whether_verification == '是'){
            $scope.edit.whether_verification = 1
        }else {
            $scope.edit.whether_verification = 0
        }
        //是否初验
        if($scope.edit.whether_start_verification == '是'){
            $scope.edit.whether_start_verification = 1
        }else {
            $scope.edit.whether_start_verification = 0
        }
        //是否终验
        if($scope.edit.whether_end_verification == '是'){
            $scope.edit.whether_end_verification = 1
        }else {
            $scope.edit.whether_end_verification = 0
        }
        siteSer.siteEdit($scope.edit).then(function (response) {
            if(response.data.code == 200){
                $state.go('root.database.site.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






