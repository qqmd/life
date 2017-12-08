require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'jquery-1.11.3.min'
    }
});
require(['monkey','jquery'],function(mk,$) {
    mk.getHTML('.click');  
	var json = {
    	"data":[{
    		"name" : "周泽龙",
    		"age" : "22",
    		"work" : "web前端"
    	},{
    		"name" : "大表哥",
    		"age" : "24",
    		"work" : "web前端"
    	}]
    }
    mk.getJson('h1',json);
    var tel = '18810649912';
    var telRel = mk.relTel(tel);
    $('h6').click(function(){
    	mk.hint('我饿了')
    })
    var success = function(resultData){
    	//console.info(resultData)
    }
    var options = {
    	url : 'js/json.json',
    	success : success,
    	data : {
    		'name' : '龙大大',
    		'age' : '22',
    		'work' :'WEB前段'
    	}
    }
    mk.baas(options);
	var str="我 去 \n 了  ";
	str=mk.relEnter(str);
	var params = [{'ele':'#clickMe','num':3},{'ele':'#clickMe2','num':3}]
	mk.keyUp(params);
	mk.keyUpHz('.clickMex')
});