var app = angular.module('ownerAddModel', ['toastr']);
app.controller('ownerAddCtrl', function($scope,ownerSer,$state,toastr,$stateParams,$http){
    $scope.files = [];
    $scope.affirmFile = [];
    $scope.add = {};
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
                    type: file.type,
                });
            }
            var obj = document.getElementById('uploadFile');
            obj.outerHTML = obj.outerHTML;
        });
    };
    $scope.urlAll = [];
    $scope.updataSel = function () {
        var fd = new FormData();
        var _files = $scope.files;
        for (var i = 0; i < oldFiles.length; i++) {
            var f = oldFiles[i];
            for (var b = 0; b < _files.length; b++) {
                var c = 0;
                if (f.name == _files[b].name) {
                    c++;
                    fd.append('files', f);
                    // console.log(fd)
                    break;
                }
            }
        }

        // console.log(_files)
        // console.log($scope.files)

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
                // console.log(response.data)
                if (response.data.code == 200) {
                    var obj = document.getElementById('uploadFile');
                    obj.outerHTML = obj.outerHTML;//将input file的选择的文件清空
                    // var aaa = response.data.data;

                    for (var i = 0; i < _files.length; i++) {//向已经确认里面推送
                        $scope.affirmFile.push(_files[i]);
                        $scope.files[_files.length-1].url = "https://wl.bjike.com" + response.data.data;
                        $scope.files[i].type =  $scope.files[i].type.substring($scope.files[i].type.lastIndexOf('/') + 1).toLowerCase();

                    }

                    $scope.urlAll.push(response.data.data);
                    $scope.add.prove_url =JSON.stringify($scope.urlAll) ;
                    console.log($scope.add.prove_url)
                    // $('#changeText').text('已上传');
                    toastr.success("文件上传成功", '温馨提示');
                    // $scope.files = [];//预览的数组

                    $scope.isUp = true;//按钮提示
                    console.log($scope.files)
                } else {
                    toastr.error(response.data.msg, '温馨提示');
                }
            });
        }else{
            toastr.info('请选择上传的附件','温馨提示');
        }
    };
    $(".pick-area6").pickArea();//初始化三级联动
    $scope.ownerAddFun = function () {
        // $scope.add.region = angular.element('.s_province').val()+','+angular.element('.s_city').val()+','+angular.element('.s_county').val();
        // if(angular.element('.s_province').val() == "省份"||angular.element('.s_city').val() =="地级市"||angular.element('.s_county').val()=="市、县级市"){
        //     toastr.error('请正确填写项目地区', '温馨提示'); return;
        // }

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
        $scope.add.region = address.join(',');
        ownerSer.ownerAdd($scope.add).then(function (response) {
            if(response.data.code == 200){
            $state.go('root.database.owner.list[12]');
            toastr.success('添加成功','温馨提示')
            }else {
                toastr.error(response.data.msg,'温馨提示')
            }
        })
    }
});






