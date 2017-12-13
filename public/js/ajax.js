function hint(opt){
	var options={
		"title":'',
		"content":'',
		"time":'',
		"ok":'',
		width:'200',
		height:'50',
		onCallback:function(){},//确认回调
		cancel:'取消',
		cancelCallback:function(){},//取消回调
		close:function(){
			console.log("close");
		}
	}
	for(i in options){
		if(opt[i]==undefined){
			opt[i]=options[i];
		}
	}
	var hintHtml="<div id='hintBox'>"
					+"<h4 class='hintTitle'>"+opt.title+"</h4>"
					+"<span class='close'>"+opt.ok+"</span>"
					+"<div class='hintContent'>"+opt.content+"</div>"
				+"</div>";
	$("body").append(hintHtml);
	var $content=$("#hintBox");
	console.log(opt.width);
	$content.css({
		width:opt.width+"px",
		height:opt.height+"px",
		top:"50%",
		left:"50%",
		position:"absolute",
		marginLeft:-(opt.width/2),
		marginTop:-(opt.height/2),
	})

}	
options={
	content:"请求失败服务器未找到",
}
hint(options);
// var hint = function(text, time) {
// 		text = text || '出错了';
// 		time = time || 1000;
// 		if($('.hintBox').length == 0) {
// 			var div = '<div class="hintBox">' + text + '</div>';
// 			$('body').append(div);
// 			$('.hintBox').css({
// 				'position': 'fixed',
// 				'top': '50%',
// 				'left': '50%',
// 				'padding': '10px 18px',
// 				'background': 'rgba(0,0,0,0.6)',
// 				'font-size': '16px',
// 				'font-family': '微软雅黑',
// 				'color': '#fff',
// 				'display': 'none'
// 			}).fadeIn()
// 			setTimeout(function() {
// 				$('.hintBox').fadeOut(300, function() {
// 					$(this).remove()
// 				})
// 			}, time)
// 		} else {
// 			return false;
// 		}
// 	}
function ajax(options){
	var cache=options.cache || false;
	var async=options.async || false;
	var type=options.type || "post";
	var dataType=options.dataType || "json";
	var data=options.data || {};
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
			options={
				content:"请求失败，请求未找到"
			}
			hint(options);
		}
		else if(data.status==503){
			options={
				content:"请求失败，请求未找到"
			}
			hint(options);
		}
		else{
			options={
				content:"请求失败,网络连接超时"
				icon:
			}
			hint(options);
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
	    	options={
	    		content:正在加载中...,
	    		icon:"loading"
	    	}
	    },
	    complate:complate
	});
}
