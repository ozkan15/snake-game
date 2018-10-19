

		var btn = document.getElementById("btn");
		var mycanvas = document.getElementById("game-canvas");
		var ctx = mycanvas.getContext("2d");
		var snakeSize = 10;
		var direction = "right";
		var score = 0;

		document.onkeydown = function(event){
			keyCode = window.event.keyCode;

			switch(keyCode){
				case 37:
				if(direction  != "right"){
					direction = 'left';
					console.log(direction);
				}	
					break;
				case 38:
					if(direction  != "down"){
					direction = 'up';
					console.log(direction);
				}	
					break;
				case 39:
				if(direction  != "left"){
					direction = 'right';
					console.log(direction);
				}	
					break;
				case 40:
				if(direction  != "up"){
					direction = 'down';
					console.log(direction);
				}	
					break;
			}
		}


		var play_ground = (function(){


			var create_food = function(){
			foodX = Math.floor(Math.random()*40);
			foodY = Math.floor(Math.random()*40);
			};
			var draw_food = function(){
				ctx.fillStyle = "red";
				ctx.fillRect(foodX*snakeSize,foodY*snakeSize,snakeSize,snakeSize);
			};
			
			var show_score =function(){
				ctx.fillStyle = "black";
				ctx.font="10px Verdana";
				ctx.fillText("Your Score: "+score,180,390);
			};

			var create_snake= function(){
			snake_length = 5;
			snake=[];
			for(var i=snake_length;i>0;i--){
				snake.push({x:i,y:0});
				}
			}

			var draw_snake = function(x,y){
			ctx.fillStyle = "green";
			ctx.fillRect(x*snakeSize,y*snakeSize,snakeSize,snakeSize);
			}

			var snake_action = function(){
				snakeY = snake[0].y;
				snakeX = snake[0].x;
				refresh_background();
				show_score();
				draw_food();
				
				turn_snake();
				move_snake();
				
				
				for(var i =0; i<snake.length;i++){
					draw_snake(snake[i].x,snake[i].y);
				}


			};

			var refresh_background = function(){
				ctx.fillStyle = "lightgray";
				ctx.fillRect(0,0,400,400);
			}
			var turn_snake = function(){
				switch(direction){
					case 'left':
						snakeX--;
						break;
					case 'right':
						snakeX++;
						break;
					case 'up':
						snakeY--;
						break;
					case "down":
						snakeY++;
						break;
				}
			};

			var move_snake = function(){

				if(snakeX != -1 && snakeX != 40 && snakeY != -1 && snakeY != 40 && !self_collusion()){
					
					if(snakeX == foodX && snakeY == foodY){
						snake.unshift({x:snakeX,y:snakeY});
						score++;
						create_food();
					}
					else{
						tail = snake.pop();
						tail.x = snakeX;
						tail.y = snakeY;
						snake.unshift(tail);
					}
				}
				else{
					clearInterval(gameloop);
					alert("Your Score: " + score);
				}
				


			};	
			
			var self_collusion = function(){
				for (var i = 0; i < snake.length; i++) {
					if(snakeX == snake[i].x && snakeY == snake[i].y)
						return true;
				}
				return false;
			}		


			

			var init =function(){
				create_food();
				create_snake();
				gameloop = setInterval(snake_action,100);
				
			}
			return {init:init};

		})();


		btn.onclick = function(){play_ground.init();};


			

