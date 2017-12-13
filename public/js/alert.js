/**
 * 常用的弹框组件
 * @author helijun
 * @return {[]} [depend jquery]
 */
;(function($){
    $.alert = function(opts){
// 1.创建一个参数对象
        var defaultOpts = {
                title: '',//标题
                content: '',//内容  文字 || html
                height: 30,//默认屏幕（父级）的50%
                width: 80,//默认屏幕（父级）的80%
                type: 'alert-default',//弹框类型
                effect: 'fadeIn',//出现效果，默认下跌落
                delayTime: 500,//效果延时时间，默认.5s
                autoClose: false,//自动关闭
                autoTime: 2000, //自动关闭时间默认2s
                autoEffect: 'default',//关闭效果
                ok: '确定',
                icon:'',
                okCallback: function(){},//确定回调
                cancel: '取消',
                cancelCallback: function(){},//取消回调
                before : function() {
                    console.log('before')
                }, 
                close: function() {
                    console.log('close')
                },
                blankclose: false//空白处点击关闭
            }
        // 遍历参数来给参数赋值
        for (i in defaultOpts) {
            if (opts[i] === undefined) {
                opts[i] = defaultOpts[i];
            }
        }

        opts.before && opts.before()
        //定义内容框
        var alertHtml = [
                '<section class="alert-main" id="alertMain">',
                    '<div class="alert-mask li-opacity" id="alertMask"></div>',
                    '<div class="alert-content '+ opts.type +'" id="alertContent">',
                    opts.content +'</div>',
                '</section>'
            ]
        $('body').append(alertHtml.join(''))
        // 定义变量
        var $alertContent = $('#alertContent'),
            $alertMain = $('#alertMain');

        $alertContent.css({
            'height': opts.height + '%',
            'top':(100-opts.height)/2+'%',
            'width': opts.width + '%',
            'left': (100 - opts.width)/2 + '%',
            'position':"absolute",
            'background':"#fff"
        })

        $('.li-opacity').css({
            '-webkit-animation-duration' : opts.delayTime/1000 + 's'
        })

        var effect = {
            'fadeIn': 'top',
            'fadeInStart': '-100%',
            'fadeInValue': (100 - opts.height)/2 + '%',
            'sideLeft': 'left',
            'sideLeftStart': '-100%',
            'sideLeftValue': (100 - opts.width)/2 + '%',
            'scale': '-webkit-transform',
            'scaleStart': 'scale(0)',
            'scaleValue': 'scale(1)',
            'info': '-webkit-transform',
            'infoStart': 'scale(1.2)',
            'infoValue': 'scale(1)'
        }

        setTimeout(function(){
            // $alertContent.css(effect[opts.effect], effect[opts.effect + 'Start']);
             $alertContent.css(effect[opts.effect],effect[opts.effect + 'Start']).addClass('alert-show')
            // console.log(effect[opts.effect + 'Start']);
            setTimeout(function(){
                $alertContent.css(effect[opts.effect],effect[opts.effect+'Value'])
                // $alertContent.css(top, "-100%");
                opts.close && opts.close()
            },5000)
        },5000)
        $(".alert-main")
            if(opts.blankclose) {
                //定一个一个自定义开关,来开关代码
                $('.alert-main :not(.alert-content)').click(function(event){
                    // alert(7);
                    $alertMain.remove()
                    opts.close && opts.close()
                    event.stopPropagation()
                    event.preventDefault()
                })
            }

            // if(opts.autoClose && opts.autoTime > 0) {
            //     setTimeout(function(){$alertMain.remove()},opts.autoTime)
            //     opts.close && opts.close()
            // }
    }
})(jQuery)
