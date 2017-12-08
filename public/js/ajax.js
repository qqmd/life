
function ajax(url,data,type,success,dataType,async,cache,error,complate){
	var cache=cache || false;
	var async=async || false;
	var type=type || "post";
	var dataType=dataType || "json";
	var success=success || function(data){
		
	};
	var error=error || function(data){
		
	};
	var complate=complate || function(){
        if(data.readyState==4 || data.status==1){
        	$(".loading").html(data.msg);
			setTimeout(function () {
	        	$(".loading").html(" ");
	        },500);
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
	    success:success,
	    error: error,
	    complate:complate
	});
}
