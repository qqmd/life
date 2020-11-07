$(function() {
	//swiper初始化
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 5
	});

	//页面初始化
	var url = 'http://59.42.254.212/thaifun/';
	var pageSize = 6;
	init();
	sessionStorage.clear();

	//点击下拉菜单
	$('#dropToggle').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active').next().toggleClass('on');
		$('body').toggleClass('scrollless');
	});

	//点击地区菜单
	$('.downMenu').on('click', 'a', function(e) {
		e.preventDefault();
		//点击效果
		if($(this).parent().hasClass('active')) {
			return;
		}
		$(this).parent().addClass('active').siblings().removeClass('active');
		$('#dropToggle span').html($(this).text());
		$('#dropToggle').removeClass('active').next().removeClass('on');

		//更新内容列表
		var cityId = $(this).attr('href');
		sessionStorage.cityId = cityId;
		var tabId = sessionStorage.tabId ? sessionStorage.tabId : 1;
		loadList(cityId, tabId, 1, pageSize);
	});

	//点击分类菜单
	$('.l-nav ul').on('click', 'a', function(e) {
		e.preventDefault();
		//点击效果
		if($(this).parent().hasClass('active')) {
			return;
		}
		$(this).parent().addClass('active').siblings().removeClass('active');

		//移动动画
		var index = $(this).parent().index() + 1;
		if(index == 4) {
			$('.swiper-wrapper').css({
				'transform': 'translate3d(-20%, 0px, 0px)',
				'transition-duration': '300ms'
			});
		} else if(index > 4) {
			$('.swiper-wrapper').css({
				'transform': 'translate3d(-40%, 0px, 0px)',
				'transition-duration': '300ms'
			});
		} else if(index < 4) {
			$('.swiper-wrapper').css({
				'transform': 'translate3d(0, 0px, 0px)',
				'transition-duration': '300ms'
			});
		}

		//更新列表
		var tabId = $(this).attr('href');
		sessionStorage.tabId = tabId;
		var cityId = sessionStorage.cityId ? sessionStorage.cityId : 1;
		loadList(cityId, tabId, 1, pageSize);
	});

	//滑动加载更多
	var hasMore = true;
	$(window).scroll(function() {
		if((parseInt($(document).scrollTop()) >= $(document).height() - $(window).height() - 20) && hasMore) {
			hasMore = false;
			loadMore();
		}
	});

	//初始化方法
	function init() {
		//加载地区
		loadCity();
		//加载列表
		loadList(1, 1, 1, pageSize);
	}

	//加载地区方法
	function loadCity() {
		$.ajax({
			type: "GET",
			url: url + 'city/getCity.action',
			success: function(data) {
				var city = data.city;
				var n = city.length;
				var htmlText = '<li class="active"><a href="' + city[0].id + '">' + city[0].name + '</a></li>';
				for(var i = 1; i < n; i++) {
					htmlText += '<li><a href="' + city[i].id + '">' + city[i].name + '</a></li>'
				}
				$(".downMenu").html(htmlText);
				$('#dropToggle span').html(city[0].name);
			}
		});

	}

	//加载列表方法
	function loadList(cityId, tabId, curPage, pageSize) { //地区、分类、页数、每页条数
		$.ajax({
			type: "GET",
			url: url + 'scene/getSceneByCityIdAndTab.action',
			data: {
				cityId: cityId,
				tabId: tabId,
				curPage: curPage,
				pageSize: pageSize
			},
			success: function(data) {
				var pageCount = data.pageCount;
				data = data.items;
				var htmlText = '';
				var n = data.length;
				if(n) {
					for(var i = 0; i < n; i++) {
						htmlText += '<li><a href="tourDetail.html?id=' +
							data[i].id +
							'"><img src="' +
							url + data[i].imgUrl +
							'"><div class="intro"><h3>' +
							(data[i].sceneName || data[i].engName) +
							'</h3><p><span>开放时间</span>' +
							(data[i].openTime || '--') +
							'</p><p><span>费用</span>' +
							(data[i].price || '--') +
							'</p><p><span>地址</span>' +
							(data[i].address || data[i].trans) +
							'</p></div></a></li>';
					}
					if(curPage >= pageCount) {
						hasMore = false;
						htmlText += '<li class="msg">没有更多内容</li>';
					} else {
						hasMore = true;
						sessionStorage.curPage = curPage + 1;
					}
				} else {
					hasMore = false;
					htmlText += '<li class="msg">没有更多内容</li>';
				}
				$(".l-content ul").html(htmlText);
			}
		});
	}

	//加载更多方法
	function loadMore() {
		var cityId = sessionStorage.cityId ? sessionStorage.cityId : 1;
		var tabId = sessionStorage.tabId ? sessionStorage.tabId : 1;
		var curPage = sessionStorage.curPage;
		$.ajax({
			type: "GET",
			url: url + 'scene/getSceneByCityIdAndTab.action',
			data: {
				cityId: cityId,
				tabId: tabId,
				curPage: curPage,
				pageSize: pageSize
			},
			success: function(data) {
				var pageCount = data.pageCount;
				data = data.items;
				var n = data.length;
				var htmlText = '';
				for(var i = 0; i < n; i++) {
					htmlText += '<li><a href="tourDetail.html?id=' +
						data[i].id +
						'"><img src="' +
						url + data[i].imgUrl +
						'"><div class="intro"><h3>' +
						(data[i].sceneName || data[i].engName) +
						'</h3><p><span>开放时间</span>' +
						(data[i].openTime || '--') +
						'</p><p><span>费用</span>' +
						(data[i].price || '--') +
						'</p><p><span>地址</span>' +
						(data[i].address || data[i].trans) +
						'</p></div></a></li>';
				}
				if(curPage >= pageCount) {
					hasMore = false;
					htmlText += '<li class="msg">没有更多内容</li>'
				} else {
					hasMore = true;
					sessionStorage.curPage++;
				}
				$(".l-content ul").append(htmlText);
			}
		});
	}

});