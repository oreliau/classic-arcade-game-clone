let Keyboard = window.SimpleKeyboard.default;

// set keyboard
let myKeyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  layout: {
    default: [
        'B &#8593; A',
        '&#8592; &#8595; &#8594;'
      ],}
});

// catch keyboard arrow
function onKeyPress(button) {
    player.handleInput(button);
}
// define variable of enemies
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

//define spped of enemies
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > 510) {
        this.x = -50;
        this.speed = 100+ (Math.random() * 500);
    };

//define distance of colision and restart pos of player
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y){
        player.x = 202;
        player.y = 405;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//define variable of player
var Player = function(x, y){
    this.x = x;
    this.y = y;
    this.player = "images/char-boy.png";
};

Player.prototype.update = function(dt) {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

//define move of player with arrow on keyborad
Player.prototype.handleInput = function(keyPress) {
    if((keyPress == "left" || keyPress == '&#8592;') && this.x >0){
        this.x -= 102;
    };
    if((keyPress == "up" || keyPress == '&#8593;') && this.y >0){
        this.y -= 83;
    };
    if((keyPress == "right" || keyPress == '&#8594;') && this.x < 405){
        this.x += 102;
    };
    if((keyPress == "down" || keyPress == '&#8595;') && this.y < 405){
        this.y += 83;
    };
    //for restart
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 800);
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var enemyLocation = [63, 147, 230];

enemyLocation.forEach( function (locationY){
    var enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
})

var player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        87: 'w',
        65: 'a',
        83: 's',
        68: 'd',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});