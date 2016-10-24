/**
 * Created by tomson on 16/8/15.
 */
window.onload = function (){
    $.ajax({
        url:'http://rdappsrv.yunpub.cn/api/weixin/getTicket' ,
        type:'get' ,
        success:function (res){
            if (res.header.code == 200) {
                (function (){
                    wx.config({

                        debug:false , // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId:res.body.appid , // 必填，公众号的唯一标识
                        timestamp:res.body.nowTimeStr , // 必填，生成签名的时间戳
                        nonceStr:res.body.nowRandomStr , // 必填，生成签名的随机串
                        signature:res.body.signstr ,// 必填，签名，见附录1
                        jsApiList:[
                            'checkJsApi' , 'onMenuShareTimeline' ,
                            'onMenuShareAppMessage'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                })();
            }
        }
    });
}
// wx.config({
//     debug:false , // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId:'' , // 必填，公众号的唯一标识
//     timestamp: 0, // 必填，生成签名的时间戳
//     nonceStr:'' , // 必填，生成签名的随机串
//     signature:'' ,// 必填，签名，见附录1
//     jsApiList:['onMenuShareTimeline' ,
//         'onMenuShareAppMessage'
//         ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// });
var shareData = {};
shareData.title = '印刻读书';// 分享标题
shareData.link = location.href; // 分享链接
shareData.imgUrl = '';
shareData.desc = '',
    wx.ready(function (){
        initWXShare()
    });

function initWXShare(data){
    if (!!data) {
        shareData.title = typeof data.title !='undefined' ? data.title : '印刻读书';// 分享标题
        shareData.link = typeof data.link  !='undefined'? data.link : location.href;// 分享链接
        shareData.imgUrl = typeof data.imgUrl  !='undefined'? data.imgUrl : '';
        shareData.desc = typeof data.desc  !='undefined'? data.desc : '';
    }
    wx.onMenuShareTimeline({
        title:shareData.title , // 分享标题
        link:shareData.link , // 分享链接
        imgUrl:shareData.imgUrl , // 分享图标
        success:function (){
            // 用户确认分享后执行的回调函数
        } ,
        cancel:function (){
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title:shareData.title , // 分享标题
        desc:shareData.desc , // 分享描述
        link:shareData.link , // 分享链接
        imgUrl:shareData.imgUrl , // 分享图标
        success:function (){
            // 用户确认分享后执行的回调函数
        } ,
        cancel:function (){
            // 用户取消分享后执行的回调函数
        }
    });
}