var app = angular.module('unitUploadModel', ['toastr']);
app.controller('unitUploadCtrl', function($scope,unitSer,$state,toastr,$stateParams,$http){
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
                url: '/unit/modelUpload',
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
                    toastr.success("文件上传成功", '温馨提示');
                    $scope.files = [];//预览的数组
                    $scope.isUp = true;//按钮提示
                    $state.go('root.database.unitInfo.list[12]')
                } else {
                    toastr.error(response.data.msg, '温馨提示');
                }
            });
        }else{
            toastr.info('请选择上传的附件','温馨提示');
        }
    };
});





