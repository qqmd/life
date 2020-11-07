var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;
var half_width = Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 4;
var vector2d = function (x, y) {
	var vec = {
		vx: x,
		vy: y,
		// 缩放
		scale: function (scale) {
			vec.vx *= scale;
			vec.vy *= scale;
		},
		//加 另一个向量
		add: function (vec2) {
			vec.vx += vec2.vx;
			vec.vy += vec2.vy;
		},
		//减 另一个向量
		sub: function (vec2) {
			vec.vx -= vec2.vx;
			vec.vy -= vec2.vy;
		},
		//相反方向
		negate: function () {
			vec.vx = -vec.vx;
			vec.vy = -vec.vy;
		},
		//向量长度
		length: function () {
			return Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
		},
		//向量长度的平方
		lengthSquared: function () {
			return vec.vx * vec.vx + vec.vy * vec.vy;
		},
		//标准化
		normalize: function () {
			var len = Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
			if (len) {
				vec.vx /= len;
				vec.vy /= len;
			}
			return len;
		},
		//旋转
		rotate: function (angle) {
			var vx = vec.vx,
				vy = vec.vy,
				cosVal = Math.cos(angle),
				sinVal = Math.sin(angle);
			vec.vx = vx * cosVal - vy * sinVal;
			vec.vy = vx * sinVal + vy * cosVal;
		},
		//调试
		toString: function () {
			return '(' + vec.vx.toFixed(3) + ',' + vec.vy.toFixed(3) + ')';
		}
	};
	return vec;
};
window.onload = function () {
	var seed = Math.random();
	console.log(seed);
	//0.8181046620237187
	//0.4237635948971803
	//0.8768990121405307
	//0.16835798247922784
	//0.0626623279016707
	//0.29683012826032473
	Math.seedrandom(seed);
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	ctx.translate(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
	Init([5, 8, 16, 20], [0.5, 0.25, 0.01], 100, Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 4, Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 24);
	Init([5, 8, 16], [0.6, 0.3], 200, Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 4 + Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 24, Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 24);
	Init([5], [1], 10, Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 4 + Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 24 + Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 24, Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 24);
	window.oldDate = Date.now();
	animationFun();
}


var update = function (s) {
	for (var i = 0; i < ballList.length; ++i) {
		ballList[i].update(s);
	}
};
var draw = function (ctx) {
	ctx.clearRect(-WINDOW_WIDTH / 2, -WINDOW_HEIGHT / 2, canvas.width, canvas.height);
	for (var i = 0; i < ballList.length; ++i) {
		ballList[i].drawFun(ctx);
	}
}
var Ball = function (x, y, speed, speed1, direction, r) {
	this.x = x;
	this.y = y;
	this.originX = x;
	this.originY = y;
	this.offsetX = 0;
	this.offsetY = 0;
	this.speed = speed;
	this.speed1 = speed1;
	this.direction = direction;
	this.direction2 = new vector2d(direction.vx, direction.vy);
	this.direction2.rotate(Math.random() * 360);
	this.r = r;
	this.color = '#2090e6';
	this.count = 0;
	this.lastTime = 0;
}
Ball.prototype.drawFun = function (ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
	ctx.fill();
};
Ball.prototype.update = function (s) {
	this.rotateFun(s);
	this.x = Math.sin(s) * this.speed * this.direction.vx + this.originX + this.offsetX;
	this.y = Math.sin(s) * this.speed * this.direction.vy + this.originY + this.offsetY;
}
Ball.prototype.nextOffset = function (s, dir) {
	var tempX = this.speed1 * s * this.direction2.vx + this.offsetX;
	var tempY = this.speed1 * s * this.direction2.vy + this.offsetY;
	var len = Math.sqrt(tempX * tempX + tempY * tempY);
	if (len <= 10) {
		return {
			x: tempX,
			y: tempY
		};
	} else {
		dir.rotate(Math.random() * 360);
		return this.nextOffset(s, dir);
	}
}
Ball.prototype.rotateFun = function (s) {

	var point = this.nextOffset(s - this.lastTime, this.direction2);
	this.lastTime = s;

	this.offsetX = point.x;
	this.offsetY = point.y;
}

var ballList = [];

function Init(rArray, rWeight, num, half_width, hou) {

	ctx.fillStyle = "#2090e6";
	lastR = {
		x: 0,
		y: 0,
		r: 0
	}
	for (var i = 0; i < num; i++) {
		var rIndex = 0;
		var rRandom = Math.random();
		if (rRandom < rWeight[2]) {
			rIndex = 3;
		} else if (rRandom >= rWeight[2] && rRandom < rWeight[1]) {
			rIndex = 2;
		} else if (rRandom >= rWeight[1] && rRandom < rWeight[0]) {
			rIndex = 1;
		} else {
			rIndex = 0;
		}
		var R = rArray[rIndex];
		var symbol = -1;
		if (Math.random() > 0.5) {
			symbol = 1;
		}
		var real_width = half_width + symbol * Math.random() * hou;
		var hudu = (2 * Math.PI / 360) * R * i;
		var X = Math.sin(hudu) * real_width;
		var Y = Math.cos(hudu) * real_width;
		X += 10 * Math.random();
		Y += 10 * Math.random();
		var dir = new vector2d((X - 0), (Y - 0));
		dir.normalize();
		var speed = 10;
		var speed1 = 5;
		var ball = new Ball(X, Y, speed, speed1, dir, R);
		ballList.push(ball);
	}
}

function animationFun(durationTime) {
	// var nowDate = Date.now();
	// var durationTime = nowDate - window.oldDate;
	// window.oldDate = nowDate;
	// console.log(durationTime);
	var duration = (durationTime ? durationTime : 0) / 1000 * 2;
	update(duration);
	draw(ctx);
	window.requestAnimationFrame(animationFun);
}