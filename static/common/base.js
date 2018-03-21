$(document).ready(function (){
    //左边点击导航变色
    $('.secOul li').on('click',function () {
        $(this).addClass('change-svg').siblings().removeClass('change-svg');
    });
//点击中间导航下拉换向 隐藏的ol显示
    $('.secOulTwo li').on('click',function () {
        $(this).toggleClass('nav-change').siblings().removeClass('nav-change');
        $(this).children('.navOul').toggleClass('showEle').parents(this).siblings().children('.navOul').removeClass('showEle');
    });
//点击中间导航下拉换向 li中的字体变色
    $('.navOul li').click(function () {
        event.stopPropagation();
        $(this).addClass('changes-clo').siblings().removeClass('changes-clo');
    });
//点击左边导航 li背景变色
    $('.rightNav li:not(".disable")').on('click',function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.contentCenter>div:not(".list-content")').hide();
//右边主体点击导航变色
    $('.contentTitle>ul>li').on('click',function () {
        $(this).addClass('liSty').siblings().removeClass('liSty');
        var listTitle = $(this).attr("data-title");
        $(this).parents('section').find('.'+listTitle).show().siblings().hide();
    });
    /*点击勾选*/
    $(".checked-none").each(function(i){
        $(this).attr({"id":"checked"+i});
        $(this).next("label").attr("for","checked"+i);
    });


    //     /**添加WebSocket**/
    // ws = new WebSocket("ws://wl.bjike.com:6003");
    // //console.log(ws);
    // // 服务端主动推送消息时会触发这里的onmessage
    // ws.onmessage = function(e){
    //     //alert(e.data.data)
    //     //console.log(e);return false;
    //     // json数据转换成js对象
    //     var data = eval("("+e.data+")");
    //
    //     var type = data.type || '';
    //     switch(type){
    //         // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
    //         case 'init':
    //             // 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
    //             $.post('https://wl.bjike.com/redis/workerman/bind', {client_id: data.client_id,'user':'1453171283@qq.com'}, function(data){
    //                 if(data.code == 0)
    //                 {
    //                     console.log(data);
    //                    // alert(data.msg)
    //                 }
    //             }, 'json');
    //             break;
    //         // 当mvc框架调用GatewayClient发消息时直接alert出来
    //         default :
    //             console.log(data);
    //            alert(data.data);
    //     }
    // };
});

