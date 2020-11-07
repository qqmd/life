var WINDOW_WIDTH = window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight;
var radius = Math.min(WINDOW_HEIGHT, WINDOW_WIDTH);
var max_radius = WINDOW_HEIGHT + WINDOW_WIDTH;
var raf = 0;
var tweenResult = true;
var lastAllTime = 0;
var n = 1;
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
	//0.8135973190501773
	Math.seedrandom(0.8135973190501773);
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	ctx.translate(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
	// Init([5, 8, 16, 20], [0.4, 0.13, 0.05], 100, max_radius / 2, radius / 4, radius / 24, (400 + Math.random() * 20));
	Init([5, 8, 16, 20], [0.4, 0.13, 0.05], 100, max_radius / 2, radius / 4, radius / 24, (400 + Math.random() * 20));
	Init([5, 8, 5, 8], [0.6, 0.3, 0.05], 200, max_radius / 2 + radius / 24, radius / 4 + radius / 24, radius / 24, (390 + Math.random() * 30));
	Init([5, 5, 5, 5], [0.6, 0.3, 0.05], 20, max_radius / 2 + radius / 24 + radius / 24, radius / 4 + radius / 24 + radius / 24, radius / 6, (390 + Math.random() * 30));
	// Init([5, 8, 16, 20], [0.4, 0.13, 0.05], 1, radius / 4, radius / 4, radius / 24, (400 + Math.random() * 20));
	// Init([5, 8, 5, 8], [0.6, 0.3], 2, radius / 4 + radius / 24, radius / 4 + radius / 24, radius / 24, (390 + Math.random() * 30));
	tweenFun();
	flyInFun();
}
var tweenFun = function () {
	for (var i = 0; i < ballList.length; ++i) {
		new TWEEN.Tween({
				x: ballList[i].originX,
				y: ballList[i].originY
			})
			.to({
				x: ballList[i].endX,
				y: ballList[i].endY
			}, 1000)
			.delay(0)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onUpdate(function (index) {
				return function (object) {
					ballList[index].x = object.x;
					ballList[index].y = object.y;
				}
			}(i)).start();
	}
}
var tweenBack = function () {
	for (var i = 0; i < ballList.length; ++i) {
		new TWEEN.Tween({
				x: ballList[i].x,
				y: ballList[i].y
			})
			.to({
				x: ballList[i].originX,
				y: ballList[i].originY
			}, 1000)
			.delay(0)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onUpdate(function (index) {
				return function (object) {
					ballList[index].x = object.x;
					ballList[index].y = object.y;
				}
			}(i)).start();
	}
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
var Ball = function (x, y, endX, endY, speed, speed1, speed2, direction, r) {
	this.x = x;
	this.y = y;
	this.originX = x;
	this.originY = y;
	this.endX = endX;
	this.endY = endY;
	this.offsetX = 0;
	this.offsetY = 0;
	this.speed = speed;
	this.speed1 = speed1;
	this.speed2 = speed2;
	this.direction = direction;
	this.direction2 = new vector2d(direction.vx, direction.vy);
	this.direction2.rotate(Math.random() * 360);
	this.r = r;
	this.color = '#2090e6';
	this.count = 0;
	this.lastTime = 0;
	this.animationTime = 0;
	this.state = 'flyIn';
	this.allTime = (max_radius / 2 - radius / 4) / this.speed2;
}

Ball.prototype.drawFun = function (ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
	ctx.fill();
};
// 自更新方法
Ball.prototype.update = function (duration) {
	// console.log(duration);
	this.animationFun(duration);
	// switch (this.state) {
	// 	case 'flyIn':
	// 		{
	// 			break;
	// 		};
	// 	case 'animationFun':
	// 		{
	// 			this.animationFun(duration);
	// 			break;
	// 		};
	// 	case 'flyOut':
	// 		{
	// 			this.flyOut(duration);
	// 			break;
	// 		};
	// }
}

Ball.prototype.animationFun = function (s) {
	this.rotateFun(s);
	this.x = Math.sin(s) * this.speed * this.direction.vx + this.endX + this.offsetX;
	this.y = Math.sin(s) * this.speed * this.direction.vy + this.endY + this.offsetY;
	if (this.animationTime + 5 - s < 0) {
		// this.lastTime = s;
		// this.state = 'flyOut';
		n = 2;
		tweenBack();
	}
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
		dir.rotate(Math.random() * 180 + 90);
		return this.nextOffset(s, dir);
	}
}
Ball.prototype.rotateFun = function (s) {
	// console.log(s, this.lastTime);
	var point = this.nextOffset(s - this.lastTime, this.direction2);
	this.lastTime = s;
	this.offsetX = point.x;
	this.offsetY = point.y;
}
Ball.prototype.flyIn = function (s) {
	// var startPosition = {
	// 	x: this.originX,
	// 	y: this.originY
	// }
	// var endPosition = {
	// 	x: this.endX,
	// 	y: this.endY
	// }
	// var tween = new TWEEN.Tween(startPosition);
	// tween.to(endPosition, 500);
	// // tween.easing(TWEEN.Easing.Exponential.InOut);
	// TWEEN.update();
	// tween.start();
	// tween.onUpdate(function () {
	// 	console.log(6666);
	// });
	// this.x = this.speed2 * s * (-this.direction.vx) + this.originX;
	// this.y = this.speed2 * s * (-this.direction.vy) + this.originY;
	// if (s > this.allTime) {
	// 	this.originX = this.x;
	// 	this.originY = this.y;
	// 	this.lastTime = s;
	// 	this.animationTime = s;
	// 	this.state = 'animationFun';
	// 	return false;
	// }
}
// Ball.prototype.flyOut = function (s) {
// 	s -= this.lastTime;
// 	this.x = this.speed2 * s * this.direction.vx + this.originX;
// 	this.y = this.speed2 * s * this.direction.vy + this.originY;
// }
var ballList = [];

function Init(rArray, rWeight, num, half_width, end_width, thickness, speed2) {
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
		if (rIndex == 0) {

		}
		var symbol = -1;
		if (Math.random() > 0.5) {
			symbol = 1;
		}
		var real_width = half_width + symbol * Math.random() * thickness;
		var endPosition = end_width + symbol * Math.random() * thickness;
		var hudu = (2 * Math.PI / 360) * R * i;
		var X = Math.sin(hudu) * real_width;
		var Y = Math.cos(hudu) * real_width;
		var eX = Math.sin(hudu) * endPosition;
		var eY = Math.cos(hudu) * endPosition;
		X += 10 * Math.random();
		Y += 10 * Math.random();
		eX += 10 * Math.random();
		eY += 10 * Math.random();
		var dir = new vector2d((X - 0), (Y - 0));
		dir.normalize();
		var speed = 5;
		var speed1 = 20;
		this.speed2 = speed2;
		var ball = new Ball(X, Y, eX, eY, speed, speed1, speed2, dir, R);
		ballList.push(ball);
	}
}

function flyInFun(durationTime) {
	var durationTime = durationTime ? durationTime : 0;
	var duration = (durationTime ? durationTime : 0) / 1000;
	tweenResult = TWEEN.update(durationTime);
	// console.log(n);
	if (!tweenResult && n == 1) {
		update(duration);
	} else if (!tweenResult && n == 2) {
		// console.log(tweenResult, n);
		window.cancelAnimationFrame(raf);
		return false;
		// tweenFun();
		// n = 1;
	} else {
		for (var i = 0; i < ballList.length; i++) {
			ballList[i].lastTime = duration;
		}
	}
	draw(ctx);
	raf = window.requestAnimationFrame(flyInFun);
}