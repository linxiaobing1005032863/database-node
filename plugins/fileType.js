module.exports = function () {
    var count = arguments[0];
    var $self = arguments[1];
    var bool = arguments[2];
    var fileName = bool? count: count.path.substring(count.path.lastIndexOf('/')+1);
    switch(count.split('.')[count.split('.').length-1].toLocaleUpperCase()){
        case "PNG":
            $self.set('content-type', 'image/png;charset=utf-8');
            // $self.set('Content-Disposition', 'attachment;  filename='+encodeURI(fileName));   //后台没有解码使用encodeURI解码
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);    //这是后台解好码的,
            break;
        case "TXT":
            $self.set('Content-Type', 'text/plain;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "UNKNOW":
            $self.set('content-type', 'application/msword;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "DOC":
            $self.set('content-type', 'application/msword;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "DOCX":
            $self.set('content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "XLSX":
            $self.set('content-type', 'application/vnd.ms-excel;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "XLS":
            $self.set('content-type', 'application/vnd.ms-excel;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "PDF":
            $self.set('content-type', 'application/pdf;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "JPG":
            $self.set('content-type', 'application/x-jpg;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "JPEG":
            $self.set('content-type', 'image/jpeg;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "ZIP":
            $self.set('content-type', 'application/x-zip-compressed;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "RAR":
            $self.set('content-type', 'application/octet-stream;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "ODT":
            $self.set('content-type', 'application/vnd.oasis.opendocument.text;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "GIF":
            $self.set('content-type', 'image/gif;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "BMP":
            $self.set('content-type', 'application/x-bmp;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
        case "SWF":
            $self.set('content-type', 'application/x-shockwave-flash;charset=utf-8');
            $self.set('Content-Disposition', 'attachment;  filename='+fileName);
            break;
    }
};