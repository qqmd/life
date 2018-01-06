function hint(opt){
	$("#hintBox").remove();
	var options={
		"title":'',
		"content":'',
		"time":'',
		"ok":'',
		width:'200',
		height:'auto',
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
	console.log($content.height());
	$content.css({
		width:opt.width+"px",
		height:$content.height()+"px",
		top:"50%",
		left:"50%",
		position:"absolute",
		marginLeft:-(opt.width/2),
		marginTop:-(($content.height()+40)/2)
	})
}	
function ajax(options){
	var cache=options.cache || false;
	var async=options.async || false;
	var type=options.type || "post";
	var dataType=options.dataType || "json";
	var data=options.data || {};
	var time=options.time || 5000;
	var success=options.success?options.success:{};
	var complete=function(xhr){
        if(xhr.status==200){
        	$("#hintBox").remove();
	        if(options.success){
	        	options.success;
	        }
        }else{
        	if(xhr.statusText == 'timeout') {
				options={
					content:"网络连接超时，请重试"
				}
				hint(options);
				if(options.error) {
					options.error;
				};
				return false
			}
			if(xhr.statusText == 'abort') {
				if(options.error) {
					options.error;
				};
				return false;
			}
        	if(xhr.status>=400&&xhr.status<500){
				options={
					content:"请求失败，文件未找到"
				}
				hint(options);
				return false;
			}
			else if(xhr.status>=500&&xhr.status<600){
				options={
					content:"服务器错误，请重新请求"
				}
				hint(options);
				return false;
			}
			else{
				options={
					content:"请求失败,网络连接超时"
				}
				hint(options);
				return false;
			}
        }
	}
	$.ajax({
		url: options.url,
	    type: type,
	    data: data,
	    async:async,
	    dataType:dataType,
	    cache:cache,
	    timeout:time,
	    jsonp:'callback',
	    beforeSend: function () {
			showLoad();
	    },
	    success:success,
	    complete:complete
	});
}

function showLoad(){
	var loadIcon='<div class="spinner">'
		+'<div class="spinner-container container1">'
			+'<div class="circle1"></div>'
			+'<div class="circle2"></div>'
			+'<div class="circle3"></div>'
			+'<div class="circle4"></div>'
		+'</div>'
	  	+'<div class="spinner-container container2">'
		    +'<div class="circle1"></div>'
		    +'<div class="circle2"></div>'
		    +'<div class="circle3"></div>'
		    +'<div class="circle4"></div>'
	  	+'</div>'
	  	+'<div class="spinner-container container3">'
		    +'<div class="circle1"></div>'
		    +'<div class="circle2"></div>'
		    +'<div class="circle3"></div>'
		    +'<div class="circle4"></div>'
	  	+'</div>'
	+'</div>';
	opt={
		content:loadIcon+"正在加载中..."
	}
	hint(opt);
}
    