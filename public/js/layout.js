function Barrel(ct,imgNum,height){
	this.ct=ct;
	this.imgHeight=height;
	this.imgNum=imgNum;
	this.imgWidth=parseInt(window.getComputedStyle(ct,null).getPropertyValue("width"));//获取当前元素的宽度
	this.loadImg();
}
Barrel.prototype = {
	getImgUrls:function(){
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

	}
};
let ct=document.querySelector(".ct");
let barrel=new Barrel(ct,100,100);
