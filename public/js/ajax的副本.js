
// url,data,type,success,dataType,async,cache,error,complate
function ajax(options){
	var cache=options.cache || false;
	var async=options.async || false;
	var type=options.type || "post";
	var dataType=options.dataType || "json";
	var timeout= options.timeout || 30000,
	var success=options.success || function(data){
		
	};
	var complate=complate || function(data){
        if(data.readyState==4 && data.status==200){
			//请求已完成
        	$(".loading").html(data.msg);
			setTimeout(function () {
	        	$(".loading").html(" ");
			},500);
			options.success.call(this);
		}
		else{
			if(data.status=404 && data.status<500){
				$(".loading").html("网络请求失败，请求未找到");
			}
			else if(data.status==503){
				$(".loading").html("请求失败，服务器内部错误");
			}
		}
		if(data.status==404 && data.status < 500){
			$(".loading").html("");
		}
		else if(data.status==503){
			$(".loading").html("");
		}
		else{
			$(".loading").html("请求失败,网络连接超时");
		}
	}
	$.ajax({
		"url": url,
	    "type": type,
	    "data": data,
	    "async":async,
	    "dataType":dataType,
		"cache":cache,
		"timeout":timeout,
	    beforeSend: function () {
	       	$("body").append("<div class='loading'></div>");
	       	$(".loading").css({"position":"absolute","top":"50%","left":"0","text-align":"center","display":"block","width":"100%"});
	       	$(".loading").html("正在加载中...");
	    },
	    success:success,
	    error: error,
	    complate:complate
	});
}
