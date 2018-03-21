var app = angular.module('siteAddCtrlModel', ['toastr']);
app.controller('siteAddCtrl', function($scope,siteSer,$state,toastr){
    $(".pick-area6").pickArea();//初始化三级联动
    $scope.siteAddFun = function () {
        $scope.add.admission_time = angular.element('.admission-time').val();
        $scope.add.finished_time = angular.element('.finish-time').val();
        $scope.add.open_time = angular.element('.open-time').val();
        $scope.add.verification_time = angular.element('.ver-time').val();
        $scope.add.start_verification_time = angular.element('.start-time').val();
        $scope.add.end_verification_time = angular.element('.end-time').val();
        // $scope.add.site_region = angular.element('.s_province').val()+','+angular.element('.s_city').val()+','+angular.element('.s_county').val();
        // if(angular.element('.s_province').val() == "省份"||angular.element('.s_city').val() =="地级市"||angular.element('.s_county').val()=="市、县级市"){
        //     toastr.error('请正确填写项目地区', '温馨提示'); return;
        // }
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
        $scope.add.site_region = address.join(',');
        siteSer.siteAdd($scope.add).then(function (response) {
            if(response.data.code == 200){
            $state.go('root.database.site.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






