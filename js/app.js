// 这是我们的玩家要躲避的敌人 
var Enemy = function(coordinate) {
    // 这要应用到每个敌人的实例的变量
    this.x = -50;
    this.y = coordinate;
    this.width = 83;
    this.height = 101;
    this.speed = Math.random()*250 + 150;
    this.sprite = 'images/enemy-bug.png';
};
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    if(this.x <= 505){
        this.x +=this.speed * dt;//表示以相同速度进行
    }else{
        this.x = -50;        
    }
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.checkForCollision = function(){
    if(this.x < (player.x + player.width) && (this.x + this.width) > player.x && this.y < (player.y + player.heigh) && (this.y + this.height) > player.y){
        alert("oh!no!Game over!");
        player.resetPlayer();
    }
}
var Player = function(){
    this.x = 200;
    this.y = 410;
    this.width = 83;
    this.height = 83;
    this.sprite ='images/char-princess-girl.png'; 
}
Player.prototype.update = function(){
    if(this.y < 55){
        alert("YOU WIN!!");
        this.resetPlayer();
    }

}
Player.prototype.resetPlayer = function(){
    this.x = 200;
    this.y = 410;
}
Player.prototype.handleInput = function(allowedKeys){
    switch(allowedKeys){
        case 'left':
            if(this.x >= 0){ 
                this.x -= 101;
            }; break;
        case 'right': 
            if(this.x <= 303){
                this.x +=100; 
            };break;
        case 'up': 
            if(this.y >= 55){    
                this.y -=83; 
            };break;
        case 'down':
            if(this.y <= 404){
                this.y +=83; 
            };break;
    }
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

var allEnemies = [new Enemy(101),new Enemy(200),new Enemy(220)];
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
