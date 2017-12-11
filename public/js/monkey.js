define(['jquery'], function($) {
	var getHTML = function(ele) {
		$(ele).click(function() {
			console.info($(this).html())
		})
	};
	var getJson = function(ele, resultData) {
		$(ele).click(function() {
			var data = resultData["data"]
			var arr = [];
			for(var i = 0; i < data.length; i++) {
				arr.push({
					"Name": data[i].name,
					"age": data[i].age,
					"work": data[i].work
				})

			}
			arr = JSON.stringify(arr);
			console.info(arr)
		})
	};
	var relTel = function(value) {
		var rel = /^1\d{10}$/;
		if(rel.test(value)) {
			return true;
		} else {
			return false
		}
	}
	var relPhone = function(value) {
		var re = /^0\d{2,3}-?\d{7,8}$/;
		if(re.test(str)) {
			return true;
		} else {
			return false;
		}
	}
	var relEnter = function(value) {
		if(/[\r\n]/g.test(value)||/[ ]/g.test(value)) {
			value = value.replace(/[\r\n]/g,"").replace(/[ ]/g,"");
		}
		return value;
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
	
	var baas = function(options) {
		$.ajax({
			"type": options.type ? options.type : 'get',
			"async": options.async ? options.async : false,
			"dataType": "json",
			"url": options.url,
			"timeout": options.timeout ? options.timeout : 30000,
			"data": options.data ? options.data : null,
			/*"beforeSend":function(xhr){
				if (options.before) {
					options.before.call(this, xhr);
				} else {
				}
			},	*/
			complete: function(xhr) {
				if(xhr.readyState == 4 && xhr.status == 200) {

					if(options.success) {
						options.success.call(this, xhr.responseJSON);
					};
				} else {
					if(xhr.statusText == 'timeout') {
						var text = "网络链接超时，请重试"
						hint(text)
						if(options.error) {
							options.error.call(this, text, xhr);
						} else {}
						return false
					}
					if(xhr.statusText == 'abort') {
						if(options.error) {
							options.error.call(this, text, xhr);
						} else {}
						return false
					}
					//报错根据不同返回值，返回不同的提示
					if(xhr.readyState == 0) {
						var text = "请检查您的网络设置"
						hint(text)
					}
					if(xhr.status >= 400 && xhr.status < 500) {
						var text = "网络请求出现异常，请联系管理员"
						hint(text)
					}
					if(500 <= xhr.status && xhr.status < 600) {
						if(xhr.status == 500) {
							var text = "返回数据出错，请联系管理员"
							hint(text)
						} else if(xhr.status == 502) {
							var text = "返回状态出错，请联系管理员"
							hint(text)
						} else {
							var text = "返回出错，请联系管理员"
							hint(text)
						}
					}
					if(options.error) {
						options.error.call(this, text, xhr);
					} else {}
				}
				return false;
			}
		});
	};
	
	var keyUp = function(options){
		for(var i=0;i<options.length;i++){
			num = options[i].num || 999999999999;
			$(options[i]).unbind(('keyUp'));
			$(options[i].ele).bind('keyup',function(){
				$(this).val($(this).val().replace(/\D/g,''))
				if($(this).val().length>num){
					var str=$(this).val().split("");
					var arr=[];
					for(var i=0;i<num;i++){
						arr.push(str[i])
					}
					$(this).val(arr.join(""))
				}
			})
		}
	};
	
	var keyUpHz = function(el){
		$(el).keyup(function(){
			$(this).val($(this).val().replace(/[^\u4E00-\u9FA5]/g,''));
		})
	}
	
	return {
		getHTML: getHTML,
		getJson: getJson,
		relTel: relTel,
		relPhone: relPhone,
		relEnter: relEnter,
		hint : hint,
		baas : baas,
		keyUp : keyUp,
		keyUpHz : keyUpHz
	};
});