
//存在的问题
/*
 1.当方向是向右的时候,不能左滑动,同理
 2.蛇本身的碰撞检测问题以及蛇与四边碰撞检测问题
 * 
 * */


var canvas=document.getElementById("canvas");
var w=document.body.clientWidth;
var h=document.body.clientHeight;
canvas.width=w;
canvas.height=h;
var cxt=canvas.getContext("2d");
cxt.lineJoin='round';
cxt.lineCap='round';
var text=document.querySelector(".text")
var num=0
var pos={
	x:0,
	y:0
}
var posEnd={
	x:0,
	y:0
}
var direction='right'
//蛇头
var snakeHead={
	x:0,
	y:0,
	w:20,
	h:20,
	color:'red'
}
drawSnake(snakeHead)

canvas.addEventListener("touchstart",touchstart,false)
canvas.addEventListener("touchmove",touchmove,false)
canvas.addEventListener("touchend",touchend,false)
//创造随机数
function random(min,max){
	return Math.round(Math.random()*(max-min)+min)
}

var fps=0;
var snakeBodys=[];

//创造食物类
function snakeFood(){
	this.x,this.y,this.color,this.r=10,this.set()
}
snakeFood.prototype.set=function(){
	this.x=random(0,w);
	this.y=random(0,h);
	this.color="rgb("+random(100,255)+","+random(100,255)+","+random(100,255)+")";
}
var foods=[]
for (var i=0;i<15;i++) {
	var food=new snakeFood()
	foods.push(food)
}
//绘制食物
function foodArc(obj){
	cxt.beginPath();
	cxt.fillStyle=obj.color;
	cxt.arc(obj.x,obj.y,obj.r,0,Math.PI*2,false);
	cxt.closePath();
	cxt.fill();
}
//碰撞检测
function collision(obj1,obj2){
	var obj11=obj1.x;
	var	obj1r=obj1.x+obj1.w;
	var	obj1t=obj1.y;
	var	obj1b=obj1.y+obj1.h;
	
	
	var	obj21=obj2.x;
	var	obj2r=obj2.x+20;
	var	obj2t=obj2.y;
	var	obj2b=obj2.y+20;
	
	if( obj1b<obj2t || obj11>obj2r || obj1t>obj2b || obj1r<obj21){ 
		//没碰上
		return false
	}else{
		return true
	}
}

//运动函数
function animate(){
	fps++;
	if(fps % 15 === 0){
		cxt.clearRect(0,0,w,h)
		var snakeBody={
			x:snakeHead.x,
			y:snakeHead.y,
			w:snakeHead.w,
			h:snakeHead.h,
			color:'#000'
		}
		if(snakeBodys.length>=4){
			snakeBodys.shift()
		}
		snakeBodys.push(snakeBody)
		
		switch(direction){
			case 'right' :
				snakeHead.x+=20
			break;
			case 'left' :
				snakeHead.x-=20
			break;
			case 'top' :
				snakeHead.y-=20
			break;
			case 'bottom' :
				snakeHead.y+=20
			break;
		}
		drawSnake(snakeHead)
		
		for (var i=0;i<snakeBodys.length;i++) {
			var snakeB=snakeBodys[i];
			drawSnake(snakeB)
		}
		for(var i=0;i<foods.length;i++){
			var food=foods[i]
			foodArc(food)
			if(collision(snakeHead,food)){
//				snakeBody.color=food.color;
				snakeBodys.push(snakeBody);
				food.set();
				num++;
				text.innerHTML='您目前积分是'+num
				console.log('碰上')
			}
		}
		
	}
	
	requestAnimationFrame(animate)
}
animate()
//画蛇
function drawSnake(obj){
	cxt.beginPath()
	cxt.fillStyle=obj.color;
	cxt.rect(obj.x,obj.y,obj.w,obj.h)
	cxt.closePath()
	cxt.fill()
}
function touchstart(e){
	e.preventDefault()
	var e=e.touches[0];
	pos={
		x:parseInt(e.pageX),
		y:parseInt(e.pageY)
	}
}
function touchmove(e){
	e.preventDefault()
	var e=e.touches[0];
	posEnd={
		x:parseInt(e.pageX),
		y:parseInt(e.pageY)
	}
}
//滑动方向判断
function touchend(e){
	var abs=Math.abs(posEnd.x-pos.x)-Math.abs(posEnd.y-pos.y)
	var absX=posEnd.x-pos.x;
	var absY=posEnd.y-pos.y;
	if(absX > 0 && abs > 0){
		direction='right'
		console.log("向右")
	}else if(absX < 0 && abs > 0){
		direction='left'
		console.log("向左")
	}else if(absY > 0 && abs < 0){
		direction='bottom'
		console.log("向下")
	}else if(absY < 0 && abs < 0){
		direction='top'
		console.log("向上")
	}	
}



































