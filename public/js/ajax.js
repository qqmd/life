function hint(options){
	var options={
		"text":text,
		"content":content,
		"time":time,
		ok:'确认',
		onCallback:function(){},//确认回调
		cancel:'取消',
		cancelCallback:function(){},//取消回调
		
	}
	
}
var hint = function(text, time) {
		text = text || '出错了';
		time = time || 1000;
		if($('.hintBox').length == 0) {
			var div = '<div class="hintBox">' + text + '</div>';
			$('body').append(div);
			$('.hintBox').css({
				'position': 'fixed',
				'top': '50%',
				'left': '50%',
				'padding': '10px 18px',
				'background': 'rgba(0,0,0,0.6)',
				'font-size': '16px',
				'font-family': '微软雅黑',
				'color': '#fff',
				'display': 'none'
			}).fadeIn()
			setTimeout(function() {
				$('.hintBox').fadeOut(300, function() {
					$(this).remove()
				})
			}, time)
		} else {
			return false;
		}
	}
function ajax(options){
	var cache=options.cache || false;
	var async=options.async || false;
	var type=options.type || "post";
	var dataType=options.dataType || "json";
	var data=options.data || {};
	// var success=options.success || function(data){
		
	// };
	var complete=function(){
        if(data.readyState==4 || data.status==1){
        	$(".loading").html(data.msg);
			setTimeout(function () {
	        	$(".loading").html(" ");
	        },500);
	        if(options.success){
	        	options.success;
	        }
	       	
        }
		if(data.status==404){
			$(".loading").html("请求失败，请求未找到");
		}
		else if(data.status==503){
			$(".loading").html("请求失败，服务器内部错误");
		}
		else{
			$(".loading").html("请求失败,网络连接超时");
		}
	}
	$.ajax({
		url: url,
	    type: type,
	    data: data,
	    async:async,
	    dataType:dataType,
	    cache:cache,
	    beforeSend: function () {
	       	$("body").append("<div class='loading'></div>");
	       	$(".loading").css({"position":"absolute","top":"50%","left":"0","text-align":"center","display":"block","width":"100%"});
	       	$(".loading").html("正在加载中...");
	    },
	    complate:complate
	});
}
