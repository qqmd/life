function Barrel(ct,imgNum,height){
	this.ct=ct;
	this.imgHeight=height;
	this.imgNum=imgNum;
	this.imgWidth=parseInt(window.getComputedStyle(ct,null).getPropertyValue("width"));//获取当前元素的宽度
	this.imgArr=[];
	this.loadImg();
}
Barrel.prototype = {
	getImgUrls:function(imgNum){
		let imgUrls=[];
		let colorUrls=[1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
		
		for(let i=0;i<this.imgNum;i++){
			let imgWidth=Math.floor(Math.random()*50+50);
			let imgHeight=Math.floor(Math.random()*30+50);
			let bgColor=textColor=" ";
			for(let j=0;j<6;j++){
				bgColor+=colorUrls[Math.floor(Math.random()*16)];
				textColor+=colorUrls[Math.floor(Math.random()*16)];
			}
			let imgUrl="http://via.placeholder.com/"+imgWidth+"x"+imgHeight+"/"+bgColor+"/"+textColor;
			
			imgUrls.push(imgUrl);
		}
		return imgUrls;
	},
	loadImg:function(){
		let imgUrls=this.getImgUrls();
		let _this=this;
		for(let i=0;i<this.imgNum;i++){
			let newImg=new Image();
			newImg.src=imgUrls[i];
			newImg.onload=function(){
				let radio=this.width/this.height;
				let imgInfo={
					target:this,
					height:_this.imgHeight,
					width:_this.imgHeight*radio,
					radio:radio
				}
				_this.render(imgInfo);
			}
		}

	},
	//渲染图片队列 改变图片的比例大小，计算一行可以放置多少个图片
	render:function(imgInfo){
		// let lastImg=imgInfo.pop();
		let wholeWidth=0;
		this.imgArr.push(imgInfo);
		for(let i=0;i<this.imgArr.length;i++){
			wholeWidth+=this.imgArr[i].width;
			if(wholeWidth>this.imgWidth){
				let lastImg=this.imgArr.pop();
				wholeWidth-=lastImg.width;
				//利用面积相等原则，来计算新的高度
				let newHeight=this.imgWidth*this.imgHeight/wholeWidth;
				this.layout(newHeight);
			}
		}
		

	},
	layout:function(newHeight){
		let imgRow=document.createElement("div"); /* 行容器 */
		imgRow.classList.add("img-row");
		for(let i=0;i<this.imgArr.length;i++){
			let imgBox=document.createElement("div");
			imgBox.classList.add("img-box");
			let img=this.imgArr[i].target;
			//改变了高度之后宽度也会自己跟着改变
			img.style.height=newHeight;
			imgBox.appendChild(img);
			imgRow.appendChild(imgBox);
		}
		this.ct.appendChild(imgRow);
	}
};
let ct=document.querySelector(".ct");
let barrel=new Barrel(ct,100,100);
