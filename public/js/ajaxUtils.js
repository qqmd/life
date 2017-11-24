//创建XMLHttpRequest对象异步发送请求  
function createAjax(){  
     var req;  
     //考虑浏览器的兼容性   
   if(window.XMLHttpRequest){  
       req=new XMLHttpRequest();  
     }else{  
       req=new ActiveXObject("Msxml2.XMLHTTP");  
     }  
     return req;  
}  
//使用json格式发送请求的  
function sendAjaxRequest(method,url,param,asyn,handle200,loading,handle404,handle500){  
   //创建XMLHttpRequest对象  
   var req=createAjax();  
   req.onreadystatechange=function(){  
      if(4==req.readyState){  
          if(200==req.status){  
              if(handle200){  
                  var data=req.responseText;  
                  handle200(data);  
              }  
          }else if(404==req.status){  
              if(handle404){  
                  handle404();  
              }  
          }else if(500==req.status){  
              if(handle500){  
                  handle500();  
              }  
          }  
      }else{  
          if(loading){  
              loading();  
          }  
      }  
   }  
     
   if("get"==method.toLowerCase()){  
       var s=(param==null)? "" :"?"+param;  
       req.open(method,url+s,asyn);  
       req.send(null);  
   }else if("post"==method.toLowerCase()){  
       req.open(method,url,asyn);  
       req.setRequestHeader("Content-Type","application/x-www-form-urlendcode");  
       req.send(param);  
   }  
}  
//受用xml格式发送请求  
function sendAjaxReqGetXML(method,url,param,asyn,handle200,loading,handle404,handle500){  
    var req=createAjax();  
    req.onreadystatechange=function(){  
        if(4==req.readyState){  
            if(200==req.status){  
                if(handle200){  
                    var xmlDoc=req.responseXML;  
                    if(xmlDoc==null){  
                        var result=req.responseText;  
                        xmlDoc=new ActiveXObject("MicroSoft.XMLDOM")  
                        xmlDoc.loadXML(result);  
                    }  
                    handle200(xmlDoc);  
                }  
            }else if(404==req.status){  
                if(handle404){  
                    handle404();  
                }  
            }else if(500==req.status){  
                if(handle500){  
                    handle500();  
                }  
            }  
              
        }  
    }  
     if("get"==method.toLowerCase()){  
           var s=(param==null)? "" :"?"+param;  
           req.open(method,url+s,asyn);  
           req.send(null);  
       }else if("post"==method.toLowerCase()){  
           req.open(method,url,asyn);  
           req.setRequestHeader("Content-Type","application/x-www-form-urlendcode");  
           req.send(param);  
       }  
}  