var app = angular.module('unitAddCtrlModel', ['toastr']);
app.controller('unitAddCtrl', function($scope,unitSer,$state,toastr){
    $(".pick-area6").pickArea();//初始化三级联动
    $scope.addFun = function () {
        $scope.add.company_establish_time= angular.element('.time').val();
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
        $scope.add.address = address.join(',');
        unitSer.unitAdd($scope.add).then(function (response) {
            if(response.data.code == 200){
            $state.go('root.database.unitInfo.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };





});






