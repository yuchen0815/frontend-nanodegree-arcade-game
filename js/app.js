//定义一些魔法数字
var HANDLE_WIDTH = 101;
var HANDLE_HEIGHT = 83;
var PLAYER_WIDTH = 200;
var PLAYER_HEIGHT = 410;
// 这是我们的玩家要躲避的敌人 
var Enemy = function(coordinate) {
    // 这要应用到每个敌人的实例的变量
    this.x = -50;
    this.y = coordinate;
    this.width = HANDLE_HEIGHT;
    this.height = HANDLE_WIDTH;
    this.speed = Math.random()*250 + 150;
    this.sprite = 'images/enemy-bug.png';
};
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    if(this.x <= 505){
        this.x +=this.speed * dt;//表示以相同速度进行
    }else{
        this.x = -HANDLE_WIDTH;        
    }
    this.checkForCollision();
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkForCollision = function(){
    if(this.x < (player.x + player.width) && (this.x + this.width) > player.x && this.y < (player.y + player.height) && (this.y + this.height) > player.y){
        alert("oh!no!Game over!");
        player.resetPlayer();
    }
}
var Player = function(){
    this.x = PLAYER_WIDTH;
    this.y = PLAYER_HEIGHT;
    this.width = HANDLE_HEIGHT;
    this.height = HANDLE_HEIGHT;
    this.sprite ='images/char-princess-girl.png'; 
}
Player.prototype.update = function(){
    if(this.y < 55){
        alert("YOU WIN!!");
        this.resetPlayer();
    }

}
Player.prototype.resetPlayer = function(){
    this.x = PLAYER_WIDTH;
    this.y = PLAYER_HEIGHT;
}
Player.prototype.handleInput = function(allowedKeys){
    switch(allowedKeys){
        case 'left':
            if(this.x >= 0){ 
                this.x -= HANDLE_WIDTH;
            }break;
        case 'right': 
            if(this.x <= 303){
                this.x += HANDLE_WIDTH; 
            }break;
        case 'up': 
            if(this.y >= 55){    
                this.y -= HANDLE_HEIGHT; 
            }break;
        case 'down':
            if(this.y <= 404){
                this.y += HANDLE_HEIGHT; 
            }break;
    }
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

var allEnemies = [new Enemy(HANDLE_WIDTH),new Enemy(PLAYER_WIDTH),new Enemy(220)];
var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
