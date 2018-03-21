var app = angular.module('ownerEditModel', ['toastr']);
app.controller('ownerEditCtrl', function($scope, ownerSer,$stateParams,$state,toastr,$http){
    var data = {
        id:$stateParams.id,
        token:$stateParams.tonken,
    };
    $scope.add = {};
    ownerSer.ownerDetail(data).then(function (response) {
        if(response.data.code == 200){
            $scope.edit = response.data.data;
            $scope.edit.prove_url = JSON.parse($scope.edit.prove_url);
            for(var i = 0;i<$scope.edit.prove_url.length;i++){
                $scope.files.push({
                    name: $scope.edit.prove_url[i].substring($scope.edit.prove_url[i].lastIndexOf('/') + 1).toLowerCase(),
                    type:  $scope.edit.prove_url[i].substring($scope.edit.prove_url[i].lastIndexOf('.') + 1).toLowerCase(),
                    url: "https://wl.bjike.com" + $scope.edit.prove_url[i]
                });
            }

            $scope.csData = $scope.edit.region.split('-');
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
    $scope.files = [];
    $scope.affirmFile = [];
    var oldFiles = [];
    //删除文件
    $scope.del = function (index) {
        $scope.files.splice(index, 1);
        if (!$scope.files.length) {
            $scope.isUp = true;
        }
    };
    $scope.fileNameChanged = function () {
        $scope.$apply(function () {//触发angular脏检测
            $scope.isUp = false;
            var elFiles = document.getElementById('uploadFile').files;
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
            var obj = document.getElementById('uploadFile');
            obj.outerHTML = obj.outerHTML;
        });
    };
    $scope.urlAll = "";
    $scope.updataSel = function () {
        var fd = new FormData();
        var _files = $scope.files;
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
            $http({
                method: 'POST',
                url: '/owner/upload',
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
                    var obj = document.getElementById('uploadFile');
                    obj.outerHTML = obj.outerHTML;//将input file的选择的文件清空
                    for (var i = 0; i < _files.length; i++) {//向已经确认里面推送
                        $scope.affirmFile.push(_files[i]);
                    }
                    $scope.urlAll += response.data.data+",";
                    $scope.edit.prove_url =JSON.stringify($scope.urlAll) ;
                    $('#changeText').text('已成功上传');
                    toastr.success("文件上传成功", '温馨提示');
                    // $scope.files = [];//预览的数组
                    $scope.isUp = true;//按钮提示
                } else {
                    toastr.error(response.data.msg, '温馨提示');
                }
            });
        }else{
            toastr.info('请选择上传的附件','温馨提示');
        }
    };
    $scope.ownerEditFun = function () {
        // $scope.edit.region = angular.element('.s_province').val()+','+angular.element('.s_city').val()+','+angular.element('.s_county').val();
        // if(angular.element('.s_province').val() == "省份"||angular.element('.s_city').val() =="地级市"||angular.element('.s_county').val()=="市、县级市"){
        //     toastr.error('请正确填写项目地区', '温馨提示'); return;
        // }
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

            $scope.edit.region = address.join(',');
        }else{//地区没变
            var address2 = $scope.edit.region.split("-");
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
            $scope.edit.region = address2.join(',');
        }
     if($scope.edit.identity_prove == '有'){
         $scope.edit.identity_prove = '1'
     }else {
         $scope.edit.identity_prove = '0'
     }
        if($scope.edit.ground == '有'){
            $scope.edit.ground = '1'
        }else {
            $scope.edit.ground = '0'
        }
        ownerSer.ownerEdit($scope.edit).then(function (response) {
            if(response.data.code == 200){
                $state.go('root.database.owner.list[12]');
                toastr.success('编辑成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    };
});






