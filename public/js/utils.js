function $(e){
	return document.getElementById(e);
}
/** 
 * 验证表单域的值是否符合指定的格式 
 * fieldObj是传入的表单对象  比如：username表单中传入的this对象 
 * msgOb是指表单后面的span对象  用来显示验证的具体情况包括js和Ajax验证 
 * re表示正则表达式     
 * nullMsg输入如果为空的消息 
 * errorMsg输入信息错误的消息 
*/  
function checkField(fieldObj,msgObj,re,nullMsg,errorMsg){
	console.log("4趣凤凤");  
	msgObj.innerHTML="";  
	var v=fieldObj.value.replace(/(^\s+)|(\s+$)/g,"");    //replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
	// console.log(v);
	// console.log(fieldObj.value);
	var flag=true;  
	if(v.length==0){  
	    msgObj.innerHTML=nullMsg;  
	    flag=false;  
	}else{  
	    if(!re.test(v)){  
	        msgObj.innerHTML=errorMsg;  
	        flag=false;  
	    }  
	}  
	return flag;  
}  