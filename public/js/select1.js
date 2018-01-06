(function($){
	$.fn.combobox=function(options){
		// 1.判断类型
		if(typeof(options)==String){
			return method(options)
		}
		// 2.合并options
		var options=$.extend({},$.fn.combobox.defaults,options || {});

		
		// 3.初始值定义
		target=$(this);
		target.attr('valueField', options.valueField);
		target.attr('textField', options.textField);
		target.empty();
		var option = $('<option></option>');
	    option.attr('value', '');
	    option.text(options.placehoder);
	    target.append(option);

		if(options.data){
			init(target,options.data);
		}
		else{
			// $.each(data,function(i,val){
			// 	console.log(data);
			// })
			options.onBeforeLoad.call(target, options.param);
			if(!options.url) return false;
			$.getJSON(options.url,options.param,function(data){
				$.each(data,function(i,val){
					target.append('<option value="'+val[options.valueField]+'">'+val[options.textField]+'</option>');
				})
			})
		}
		function init(target,data){
			$.each(data,function(i,val){
				var option=$('<option></option>');
				option.attr('value',val[options.valueField]);
				option.text(val[options.textField]);
				target.append(option);
			});
			options.onSuccess.call(target);

		}
		
		target.unbind("change");
	    target.change(function (e) {
	      if (options.onChange)
	        return options.onChange(target.val());
	    });

	    // 如果传过来的是字符串
	    function method(){

	    }
	}
	$.fn.combobox.defaults = {
		url: null,
		valueField: 'value',
		param: null,
		textField: 'text',
		placehoder: '请选择',
		param: null,
		data:null,
		onBeforeLoad: function(param){
			console.log("刚开始加载");
		},
		onChange: function (value) { },
		onSuccess:function(){
			console.log("加载完成");
		}
	}
})(jQuery)
// 等同于上面
// var fn = function($){

// };
// fn(jQuery);