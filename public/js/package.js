(function(){
	var parseHtml=(function(){
		var div=document.createElement('div');
		function parsHtml(html){
			console.log(html);
			var res=[];
			div.innerHtml=html;
			for(var i=0;i<div.childNodes.length;i++){
				res.push(div.childNodes[i]);
			}
			div.innerHtml=" ";
			return res;
		}
		// parseHtml="zhaneg";

		return parseHtml;
	})();
	// var html="<span>这是我的内容，嗯呢呢</span>";
	// console.log(parseHtml(html));
})()
// (function(window,undefined){
//     var arr = [],
//         push = arr.push,
//         slice = arr.slice;
//     //首先要做的就是封装一个parseHtml函数
//     //要注意的是，parthHtml要放在一个自调用函数内
//     var parseHtml = (function(){
//         //做一个模板
//         var div = document.createElement('div');
//         //这个函数是用来创建标签
//         function parseHtml(html){
//             var res = [];
//             //这边是将具有html语义的字符串放在模板div中,div里面的就有这些标签了s
//             div.innerHTML = html;
//             //这个时候div里有标签元素,循环遍历div里面的元素
//             for(var i = 0;i < div.childNodes.length;i++){
//                 //这边是将div模板里面的元素一一放到res数组里,因为这边的div.childNodes[i]是单个元素,可以直接push进数组
//                 res.push(div.childNodes[i]);
//             }
//             //完成之后,将div里面的元素清除掉,方便下一次使用
//             div.innerHTML = '';
//             //将这个数组返回
//             return res;
//         }
//         return parseHtml;
//     })();
//     //封装insertBefore方法
//     function prependChild(parent,element){//传入的元素是父元素,要插入的元素
//         var first = parent.firstChild;//将父元素中的第一个元素取出来
//         parent.insertBefore(element,first);//使用insertBefore方法将element插入到父元素的第一个子元素的前面
//     }
//     //封装cc函数
//     function cc(html){
//         //这边返回的是cc原型对象里面的一个方法创建出来的实例
//         return new cc.fn.init(html);
//     }
//     //这边是为了后面书写方便
//     cc.fn = cc.prototype = {
//         constructor : cc,
//         length : 0,
//         //这两个属性要加到原型上
//         selector: '',//这两个属性在init所创建的实例之中还会用到,所以要加到这个原型上面
//         type : 'cc',
//         init : function(html){//这个函数的作用就是:1.创建实例;2.在这个函数里面对所传入的参数进行一个判断
//             this.events = {};
//             if(html == ''){//这边判断传入的参数是不是一个空字符串
//                 return;//如果传入的是一个空字符串，那么就直接返回this，注意，这边虽然没写返回this,但是他是默认的
//             }else if(cc.isString(html)){//这边是当传入的html是字符串的时候
//                 if(/^</.test(html)){//这边的html是标签组成的字符串
//                     push.apply(this,parseHtml(html));
//                 }else{//这边的html是选择器字符串
//                     //这边的this指的是通过：cc.prototype.init这个函数创建出来的实例
//                     push.apply(this,select(html));
//                     //将这个实例的selector设置成html
//                     this.selector = html;
//                 }
//             }else if(html && html.type === 'cc'){//这边是当传入的html是一个cc对象的时候
//                 push.apply(this,html);
//                 this.selector = html.selector;
//                 this.events = html.events;
//             }else if(html && html.nodeType){//这边是当传入的是一个dom对象的时候，因为dom对象都有nodeType属性
//                 this[0] = html;
//                 this.length = 1;
//             }else if(typeof html === 'function'){//这边是当传入的是一个函数的时候，进入里面
//                 var oldfunc = onload;//将原来onload里面的函数取出来
//                 if(typeof oldfunc === 'function'){
//                     onload = function(){
//                         oldfunc();
//                         html();
//                     }
//                 }else{
//                     onload = html;
//                 }
//             }
//         }
//     };
//     //将封装好的select方法放到这里面
//     var select = (function () {
//       //这是一个异常与捕获的代码，它表示的意思是：如果push方法出现了错误那么就需要重写push方法
//       try {
//           //这边是自己模拟一个场景，来使用系统的push方法，如果可以实现的话就证明系统支持push方法
//           //这种方法是系统能力检测中的方法功能检测
//           var div = document.createElement( 'div' );
//           div.innerHTML = '<p></p>';
//           var arr = [];
//           push.apply( arr, div.getElementsByTagName( 'p' ));
//       } catch ( e ) {
//           //这边是当try里面的push方法不执行的时候，会进入这里面
//           //在这里面将push重新定义了一下，将其变为一个对象，这个对象里面有一个push方法
//           var push = {
//             //将apply变成了push对象里面的一个方法
//             apply: function ( array1, array2 ) {
//               for ( var i = 0; i < array2.length; i++ ) {
//                 //注意这边的赋值
//                 array1[ array1.length++ ] = array2[ i ]; 
//               }
//             }
//           };
//       }
//       // 正则表达式
//       //这句正则表达式是为了匹配系统中是否有自带的方法
//       var rnative = /\{\s*\[native/;
//       var rtrim = /^\s+|\s+$/g;
//       //这个是为了匹配出          Id         类名     通配符 标签名
//       //                          1           2         3       4
//       var rbaseselector = /^(?:\#([\w\-]+)|\.([\w\-]+)|(\*)|(\w+))$/;
//       // 基本函数, support 对象, 验证 qsa 与 byclass
//       var support = {};
//       //基本函数里面的一个属性，实质上是为了看一下系统中是否有该方法（使用正则来判断）
//       support.qsa = rnative.test( document.querySelectorAll + '' );
//       //同上
//       support.getElementsByClassName = rnative.test( document.getElementsByClassName + '' );
//       support.trim = rnative.test( String.prototype.trim + '' );
//       support.indexOf = rnative.test( Array.prototype.indexOf + '' );
//       // 基本方法
//       //封装了getElementsByClassName函数，这是为了解决兼容问题
//       //传入两个参数，一个是className,另一个是node-->这个node指的是从页面上的node元素开始查找这个className
//       function getByClassName ( className, node ) {
//           //如果没有传入node的话就给它一个默认值:document
//           node = node || document;
//           //声明一些变量
//           var allElem, res = [], i;
//           //首先做判断，如果系统有这个方法会使用系统的
//           if ( support.getElementsByClassName ) {
//               //直接使用定义的push方法
//               return push.apply(res,node.getElementsByClassName( className ));
//           } else {
//               allElem = node.getElementsByTagName( '*' );
//               for ( i = 0; i < allElem.length; i++ ) {
//                 if ( allElem[ i ].className === className ) {
//                   res.push( allElem[ i ] );
//                 }
//               }
//               return res;
//           }
//       }
//       // 自定义实现 trim 方法,该方法是将字符串中的指定的东西去掉
//       var myTrim = function ( str ) {
//            // 表示两端去空格, 然后返回去除空格的结果
//            if ( support.trim ) {
//                return str.trim();
//            } else {
//                // 自定义实现
//           //这边是将rtrim转换成空字符串，即将空格去掉了
//                return str.replace( rtrim, '' );
//            }
//       }
//       //这边封装的是indexOf方法，传入三个参数，数组，要搜索的东西，要搜索的东西在数组里面的开始索引（从第几个开始找）
//       var myIndexOf = function ( array, search, startIndex ) {
//           //首先将索引赋值，如果传入了索引，那么就让开始的索引等于它，如果没有传入那么就让它从零开始找
//           startIndex = startIndex || 0;
//           //这边还是先判断系统有没有这种方法
//           if ( support.indexOf ) {
//             //这里表示系统有这种方法，那么就直接使用就OK了，将结果返回
//             return array.indexOf( search, startIndex );
//           } else {
//             //如果没有的话，我们就自己动手封装一个
//             //对这个数组进行一个遍历，遍历的初始值就是从startIndex开始
//             for ( var i = startIndex; i < array.length; i++ ) {
//               //判断一下，如果数组里面有值与要查询的值相等，那么就返回这个索引值
//               if ( array[ i ] === search ) {
//                 return i;
//               }
//             }
//             //当遍历完成之后，如果还是没有找到的话，就返回-1
//             return -1;
//           }
//       }
//       //封装一个去重的函数，传入的参数是一个数组
//       var unique = function ( array ) {
//           //声明一个空数组，用于接收去重之后的元素
//           var resArray = [], i = 0;
//           //对传入的数组进行一个遍历
//           for ( ; i < array.length; i++ ) {
//             //做一个判断，如果说resArray里面没有arr里面的元素，则将arr里面的元素放到resArray里面
//             //注意，这边使用的是之前封装好的myIndexOf方法
//             if ( myIndexOf( resArray, array[ i ] ) == -1 ) {
//               //使用的是前面封装好的push方法
//               resArray.push( array[ i ] );
//             }
//           }
//           //将这个数组返回
//           return resArray;
//       } 
//       //这边封装的是四种基本选择器，ID选择器，类选择器，通配符选择器，标签选择器
//       function basicSelect ( selector, node ) {
//           //这边的node指的是要在哪一个下面去寻找selector
//           node = node || document;
//           var m, res;
//           if ( m = rbaseselector.exec( selector ) ) {
//             if ( m[ 1 ] ) { // id选择器
//               res = document.getElementById( m[ 1 ] );
//               if ( res ) {//如果res不是一个空的话，进入
//                 return [ res ];
//               } else {//当res为空的话返回一个空数组
//                 return [];
//               }
//             } else if ( m[ 2 ] ) {  // class选择器
//               return getByClassName( m[ 2 ], node );
//             } else if ( m[ 3 ] ) {//通配符选择器
//               return node.getElementsByTagName( m[ 3 ] );
//             } else if ( m[ 4 ] ) {//标签选择器
//               return node.getElementsByTagName( m[ 4 ] );
//             }
//           }
//           return [];
//       }
//       //封装一个组合选择器，这里面的标签使用逗号隔开的
//       function select ( selector, results ) {
//             results = results || [];
//           var m, temp, selectors, i, subselector;
//           //这边是如果传入的selector不是一个字符串的话，那么返回空数组
//           if ( typeof selector != 'string' ) return results;
//           // 表明参数都没有问题, 接下来就是如何选择
//           // 首先判断 qsa 是否可用
//           // 然后再 一步步的 自己实现
//           if ( support.qsa ) {//如果系统有querySelectorAll方法，那么就使用
//             push.apply( results, document.querySelectorAll( selector ) );
//           } else {
//             // 不存在再来考虑自己实现
//             //首先将传入的参数以逗号隔开，放到一个数组里面
//             selectors = selector.split( ',' );
//             // 循环遍历这个数组
//             for ( i = 0; i < selectors.length; i++ ) {
//               //在这个循环里面对数组里面的每一个元素进行一个去除空格的操作，保证数据是我们想要的形式
//               subselector = myTrim( selectors[ i ] );
//               // 接下来就是 处理 subselector，使用正则进行判断
//               if ( rbaseselector.test( subselector ) ) {
//                 // 基本选择器
//                 //如果匹配到了就将匹配到的传入到基本的四种选择器函数只中，返回一个数组，将这个数组进行一个push
//                 push.apply( results, basicSelect( subselector ) );
//               } else {
//                 //如果匹配不到那么就使用 select2 函数
//                 select2( subselector, results );
//               }
//             }
//           }
//           // 返回 result注意，这个数组要进行一个去重操作
//           return unique( results );
//       }
//       //封装一个后代选择器的函数，传入两个参数
//       function select2 ( selector, results ) {
//           results = results || [];
//           //将这个参数以逗号隔开
//           var selectors = selector.split( ' ' );
//           //声明一个数组，这个数组用于存放元素，以及一个node数组，这个数组用于存放从哪一个元素开始找
//           var arr = [], node = [ document ];
//           for ( var j = 0; j < selectors.length; j++ ) {
//             for ( var i = 0; i < node.length; i++ ) {
//               //因为这边寻找的是后代选择器，所以只要找到最后面的并将其返回就可以了
//               push.apply( arr, basicSelect( selectors[ j ], node[ i ] ));
//             } 
//             //在结束的时候将arr里面的值全部给node，要注意此时node里面的值的作用是什么
//             node = arr;
//             //将arr清空
//             arr = [];
//           }
//           //在最后将最后一次获取到的node值赋给results
//           //这里面的值是最后一次获取到的元素，也就是说是要获取的子代元素中的的最后一个元素
//           push.apply( results, node );
//           return results;
//       }
//       return select;
//     })();
//     //让init这个方法的原型与cc这个构造函数的原型相等，这样init的原型里面就有init的方法
//     cc.fn.init.prototype = cc.fn;
//     //给cc以及cc原型添加一个混入的方法
//     cc.extend = cc.fn.extend = function extend(obj){
//         for(var k in obj){
//             this[k] = obj[k];
//         }
//     }
//     //给cc混入方法,这些方法都是静态方法
//     cc.extend({
//         //给cc混入一个isString方法
//         isString : function(html){
//             return typeof html === "string";
//         },
//         //给cc混入一个each方法
//         each : function(arr,fnc){
//             var i;
//             if(arr instanceof Array || arr.length >= 0){
//                 for(i = 0; i < arr.length; i ++){
//                     fnc.call(arr[i],i,arr[i]);
//                 }
//             }else {
//                 for( i in arr){
//                     fnc.call(arr[i],i,arr[i]);
//                 }
//             }
//             return arr;
//         },
//         map : function(arr,fnc){
//             var i,tmp,res=[];
//             if(arr instanceof Array || arr.length >= 0){
//                 for(i =0;i<arr.length;i++){
//                     //这边的tmp的值是这边fnc的返回值，如果说fnc这个函数里面没有返回值的话(return)，那么tmp就是undefined
//                     tmp = fnc(arr[i],i);
//                     if(tmp != null){
//                         res.push(tmp);
//                     }
//                 }
//             }else{
//                 for(i in arr){
//                     tmp = fnc(arr[i],i);
//                     if(tmp != null){
//                         res.push(tmp);
//                     }
//                 }
//             }
//             return res;
//         },
//         //获取到样式
//         getStyle : function(dom,styleName){
//             if(dom.currentStyle){
//                 return dom.currentStyle[styleName];
//             }else{
//                 return window.getComputedStyle(dom)[styleName];
//             }
//         },
//         getText : function(dom,list){
//             var node = dom.childNodes;
//             for(var i = 0;i < node.length;i ++){
//                 if(node[i].nodeType == 3){
//                     list.push(node[i].nodeValue);
//                 }
//                 if(node[i].nodeType == 1){
//                     cc.getText(node[i],list);
//                 }
//             }
//         }
//     });
//     //核心方法
//     cc.fn.extend({
//         //将调用该方法的对象变成数组模式
//         toArray : function(){
//             //法一:
//             /*var res = [];
//             for(var i = 0;i < this.length; i ++){
//                 res.push(this[i]);
//             }
//             return res;*/
//             //法二:
//             //这句话的意思是：this.slice(0);--->this指的是实例对象，调用slice将其从一个伪数组变成一个数组
//             return slice.call(this , 0);
//         },
//         //get方法是通过索引值来返回调用该方法的对象/数组里面的对应的值
//         get : function(index){
//             if(index === undefined){
//                 return this.toArray();
//             }
//             return this[index];
//         },
//         //这边的eq返回的是dom对象,这是与get方法的区别,简单地说就是eq返回的是一个init对象,而get返回的是一个元素
//         eq : function(num){
//             var dom;
//             if(num >= 0){
//                 dom = this.get(num);
//             }else{
//                 dom = this.get(this.length + num);
//             }
//             return cc(dom);
//         },
//         each : function(fnc){
//             return cc.each(this,fnc);
//         },
//         map : function(fnc){
//             return cc.map(this,fnc);
//         }
//     });
//     //对DOM的操作方法
//     cc.fn.extend({
//         //给cc的原型混入一个appendTo方法,注意这边的原型是与init的原型是一至的
//         //首先要明白,appendTo方法是将appendT之前的元素添加到appendTo的括号里
//         appendTo : function(selector){
//             //首先声明一个ccObj对象，这个对象是和this一样，是init的实例对象
//             //当我们将selector传入其中时，它会解析出来传入的是一个什么样的参数
//             //这边的selector参数，其实就是appendTo括号里面的内容
//             var ccObj = this.constructor(selector);
//             //这边声明一个新的init的实例对象,这是为了仿照jQuery里面链式原理的写法
//             //这边执行完该方法之后，返回的是一个dom对象
//             var newObj = this.constructor();
//             //这边循环遍历this，这个this指的就是appendTo前面的内容
//             for(var i = 0;i < this.length;i ++){
//                 //这边循环遍历的是解析了传入参数selector之后得到的一个对象ccObj
//                 for(var j = 0;j < ccObj.length;j ++){
//                     //声明一个变量temp
//                     var temp;
//                     if(j == ccObj.length-1){//当j循环到最后一个的时候,进入这个循环
//                         //将this[i]赋值给temp
//                         temp = this[i];
//                     }else{
//                         //这种情况就是当j值还没有到最后一个的时候
//                         temp = this[i].cloneNode(true);
//                     }
//                     //将temp里面的值，放到之前创建的newobj中，这是为了仿照jQuery里面的链式结构
//                     push.call(newObj , temp);
//                     //将temp添加到ccObj中，temp里面存放的是this伪数组里面的值
//                     ccObj[j].appendChild(temp);
//                 }
//             }
//             //这个是:即使完成了这个appendTo操作，返回值依旧是一个cc对象
//             return newObj;
//         },
//         //首先要明确的是:append方法是将append括号里面的加到append前面的元素中
//         append: function(selector){
//             //还是一样,先声明一个cc对象,这个对象里面是将传入的参数进行解析
//             var ccObj = this.constructor(selector);
//             //这个循环的是创建的cc对象
//             for(var i = 0;i < ccObj.length;i ++){
//                 //这个循环的是this这个伪数组
//                 for(var j = 0;j < this.length;j ++){
//                     var temp;
//                     if(j == this.length-1){//这边的做法可以参照appendTo的方法封装
//                         temp = ccObj[i];
//                         this[j].appendChild(temp);
//                     }else{
//                         temp = ccObj[i].cloneNode(true);
//                         this[j].appendChild(temp);
//                     }
//                 }
//             }
//             return this;
//         },
//         prependTo : function(selector){
//             var ccObj = this.constructor(selector);
//             var newObj = this.constructor();
//             for(var i = 0;i< this.length;i ++){
//                 for(var j = 0;j < ccObj.length;j ++){
//                     var temp;
//                     if(j == ccObj.length-1){
//                         temp = this[i];
//                     }else{
//                         temp = this[i].cloneNode(true);
//                     }
//                     push.call(newObj,temp);
//                     prependChild(ccObj[j],temp);
//                 }
//             }
//             return newObj;
//         },
//         prepend : function(selector){
//             var ccObj = this.constructor(selector);
//             for(var i = 0;i < ccObj.length;i ++){
//                 for(var j = 0;j < this.length;j ++){
//                     var temp;
//                     if(j == this.length-1){
//                         temp = ccObj[i];
//                         prependChild(this[j],temp);
//                     }else{
//                         temp = ccObj[i].cloneNode(true);
//                         prependChild(this[j],temp);
//                     }
//                 }
//             }
//             return this;
//         }
//     });
//     //事件处理模块
//     cc.fn.extend({
//         on : function(type,fn){
//             if(!this.events[type]){//当this中的events属性里面没有type的时候,进入这个里面
//                 this.events[type] = [];//给它提供一个空数组
//                 //当cc对象中的元素被点击的时候我们应该把数组中保存的函数拿出来一一执行
//                  //我们应该为cc对象中的元素添加事件处理函数
//                 var iObj = this;//将this赋值给iObj,此时iObj就表示创建出来的实例对象
//                 //这边的this指的是实例对象
//                 this.each(function(){//调用这个实例的each方法
//                     var fnc = function(e){//fnc执行的时机是type事件执行的时候,在这个时候跟着传入一个e,这个e是事件参数    
//                         for(var i = 0;i < iObj.events[type].length;i ++){
//                             //iObj.events[type][i]指的是:找到iObj对象->events属性->type数组->第i个函数,将之执行
//                             //iObj.events[type][i]指的是:函数
//                             //在执行的时候,这边的this指的是执行点击的这个dom元素
//                             iObj.events[type][i].call(this,e);//这边将e传入到这个执行的函数中
//                         }
//                     }
//                     //如果系统支持addEventListener方法就用它添加事件处理函数f，否则使用attachEvent
//                     //事件参数e是从哪里来的？就是从事件绑定的函数来的
//                     //我们通过addEventListener绑定事件的处理函数为f，那么f就带有了事件参数e
//                     if(this.addEventListener){
//                         this.addEventListener(type,fnc);
//                     }else{
//                         this.attachEvent('on' + type,fnc);
//                     }
//                 });
//             }
//             this.events[type].push(fn);
//             return this;
//         },
//         off : function(type,fn){
//             var arr = this.events[type];
//             if(arr){
//                 for(var i = arr.length;i >= 0;i --){
//                     if(arr[i] == fn){
//                         arr.splice(i,1);
//                     }
//                 }
//             }
//             return this;
//         }
//     });
//     //其他事件
//     //其他事件的添加是将这些字符串用split方法分隔
//     var arr = 
//     ("blur focus focusin focusout load resize scroll unload click dblclick " +
//       "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
//       "change select submit keydown keypress keyup error contextmenu").split(' '); 
//       //调用cc的each方法，这个方法里面传入的一个参数是数组,一个参数是函数fnc
//     cc.each(arr,function(i,v){
//         //在这个fnc中,
//         cc.fn[v] = function(fn){
//             this.on(v,fn);
//             return this;
//         }
//     });
//     cc.fn.extend({
//         hover : function(fn1,fn2){
//             this.mouseover(fn1);
//             this.mouseout(fn2);
//             return this;
//         },
//         toggle : function(){
//             var i = 0;
//             var args = arguments;
//             this.on('click' , function(e){
//                 args[i % args.length].call(this , e);
//                 i ++;
//             });
//         }
//     });
//     //样式操作
//     cc.fn.extend({
//         css : function(option){
//             var args = arguments,
//                 argsLength = arguments.length;
//             if(argsLength == 2){
//                 if(cc.isString(args[0]) && cc.isString(args[1])){
//                     return this.each(function(){
//                         this.style[args[0]] = args[1];
//                     })
//                 }
//             }
//             if(argsLength == 1){
//                 if(cc.isString(option)){
//                     return this[0].style[option] || cc.getStyle(this[0],option)
//                 }
//                 if(typeof option === 'object'){
//                     return this.each(function(){
//                         for(var k in option){
//                             this.style[k] = option[k];
//                         }
//                     })
//                 }
//             }
//         },
//         addClass : function(name){
//             return this.each(function(){
//                 var classText = this.className;
//                 if(classText){
//                     if((' ' + classText +' ').indexOf(' ' + name + ' ') ==-1){
//                         this.className += ' ' + name;//这边是将这个name添加到dom的className中
//                     }
//                 }else{
//                     this.className = name;
//                 }
//             })
//         },
//         removeClass : function(name){
//             return this.each(function(){
//                 var classText = this.className;
//                 if(classText){
//                     var arr = classText.split(' ');
//                     for(var i = arr.length;i >= 0;i --){
//                         if(arr[i] == name){
//                             arr.splice(i,1);
//                         }
//                     }
//                     this.className = arr.join(' ');
//                 }
//             })
//         },
//         hasClass : function(name){
//             //法一
//             /*var boolean;
//             this.each(function(){
//                 var classText = this.className;
//                 if(classText){
//                     var arr = classText.split(' ');
//                     for(var i = 0;i < arr.length;i ++){
//                         if(arr[i] == name){
//                             boolean = true;
//                             return;
//                         }
//                     }
//                     boolean = false;
//                     return;
//                 }
//                 boolean = false;
//                 return;
//             });
//             return boolean;*/
//             //法二
//             for(var i = 0;i < this.length;i ++){
//                 if((' ' + this[i].className + ' ').indexOf(' ' + name + ' ') != -1){
//                     return true;
//                 }
//             }
//             return false;
//         },
//         toggleClass : function(name){
//             if(this.hasClass(name)){
//                 this.removeClass(name);
//             }else{
//                 this.addClass(name);
//             }
//         }
//     });
//     //属性操作
//     cc.fn.extend({
//         attr: function(name,value){
//             //第一种情况:有value值以及value值为空时
//             if(value || value == ''){
//                 //这时要传入的name以及value都要是字符串
//                 if(cc.isString(name) && cc.isString(value)){
//                     this.each(function(){
//                         this.setAttribute(name,value);//设置属性
//                     })
//                 }
//             }else{//这种情况是当只传了name且name为字符串
//                 if(cc.isString(name)){
//                     //这个时候是获取该属性
//                     return this[0].getAttribute(name);
//                 }
//             }
//             //这个是当以上两种都不符合时:
//             return this;
//         },
//         prop : function(name,value){
//             if(value || value == ''){
//                 if(cc.isString(name) && cc.isString(value)){
//                     this.each(function(){
//                         this[name] = value;
//                     })
//                 }else{
//                     if(cc.isString(name)){
//                         return this[name];
//                     }
//                 }
//             }
//             return this;
//         },
//         val : function(value){
//             return this.attr('value',value);
//         },
//         html : function(html){
//             return this.prop('innerHTML',html);
//         },
//         text : function(){
//             var res = [];
//             cc.getText(this[0],res);
//             return res.join(' ');
//         }
//     });
//     //给cc原型添加anmite属性
//     cc.fn.extend({
//         animate : function(property,time,fn,easing){
//             var iObj = this
//                 flag = false;
//             this.each(function(){
//                 move(this,property,time,fn,easing);
//             });
//             return this;
//             function move(node,property,time,fn,easing){//需要传入的参数有:元素,元素要移动的距离,动画执行的时长
//                 var start = {};
//                 for(var k in property){
//                     start[k] = parseInt(cc.getStyle(node,k));
//                 }
//                 var    startTime = + new Date;//开始的时间
//                 iObj.timer = setInterval(function(){//设置定时器
//                     var currentTime = + new Date,//当前时间
//                         deltaTime = currentTime - startTime;//当前时间与开始事件的差值,这个差值可以得到的是已经过去了多久
//                     if(deltaTime >= time){//这边如果差值大于规定的时长之后,进入这个判断里面
//                         clearInterval(iObj.timer);//这时候要清除计时器
//                         deltaTime = time;//将差值赋值为要求的时长
//                         flag = true;
//                     }
//                     easing = easing || 'change';
//                     for(var k in property){
//                         node.style[k] = start[k] 
//                                       + g(deltaTime,time,start[k],parseInt(property[k]),easing) 
//                                       + 'px';
//                     }
//                     if(flag && fn){
//                         fn.call(iObj);
//                         return;
//                     }
//                 },20);
//             };
//             function g(deltaTime,time,start,end,easing){
//                 if(easing == 'line'){
//                     return ((end - start)/time)*deltaTime;
//                 }else if(easing == 'change'){
//                     var distance = end - start;//需要移动的距离
//                     //法一:
//                     //return distance*Math.sin(daleTime*Math.PI/2/time);
//                     //法二:
//                     return distance*(Math.log(deltaTime + 1) / Math.log(time + 1));
//                 }
//             }
//         },
//         timer : null,
//         stop : function(){
//             clearInterval(this.timer);
//             this.timer = null;
//         }
//     })
//     //在桌面上可以使用I以及cc来调用沙箱内部的cc函数
//     window.C = window.cc = cc;
// })(window);