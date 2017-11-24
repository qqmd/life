var nameOnly_ok=false;  
/*  
 *验证用户名是否符合规范的方法   
 *1.验证用户名的输入格式是否正确和是否为空  
 *2.验证用户名输入是否唯一（ajax）  
 */  
function checkUsername(username){  
        //alert(nameOnly_ok);  
        //验证用户名的输入格式  
        var username_ok=checkField(username, $("usernameMsg"), /^[a-zA-Z0-9_]{1,20}$/, "对不起用户名不能为空！", "对不起用户名不能是字母，数字，下划线以外的数！");  
        //alert(nameOnly(username));  
        //用户名的格式正确的条件成立则验证用户名是否唯一  
        if(username_ok){  
            nameOnly(username);  
        }  
        return username_ok&&nameOnly_ok;  
    }  
//验证用户名是否唯一  
function nameOnly(username){  
              //ajaxUtils.js验证工具中的方法  
        sendAjaxRequest("get","user","method=nameOnly&username="+username.value,true,function(data){  
             if(data=="true"){  
                 $("usernameMsg").innerHTML="恭喜你！当前输入的用户名可用！"  
                     //nameOnly_ok=true;  
                     return true;  
             }else{  
                 $("usernameMsg").innerHTML="很抱歉！当前的用户名已存在！请重新输入用户名！";  
                 return false;  
             }              
        });
}     
/*  
 *用户密码验证  
 */  
function checkPassword(password){  
    var password_ok=checkField(password,$("passwordMsg"),/^[a-zA-Z0-9]{6,20}$/,"对不起密码不能为空！","对不起密码只能由字母、数字组成且必须六位及六位以上！");  
    return password_ok;  
}  