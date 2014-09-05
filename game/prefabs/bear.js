'use strict';

var Bear = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bear', frame);

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  this.body.bounce.y = 0.2;
  this.body.gravity.y = 300;
  this.body.collideWorldBounds = true;

};

Bear.prototype = Object.create(Phaser.Sprite.prototype);
Bear.prototype.constructor = Bear;

Bear.prototype.runRight = function(){
  this.body.velocity.x = 150;
};

Bear.prototype.decelerateRight = function(){
  console.log(this.body.velocity.x);
  if (this.body.velocity.x === 150){
  this.body.velocity.x = 125;
  setTimeout((function(){this.body.velocity.x = 100}).bind(this), 800);
  setTimeout((function(){this.body.velocity.x = 75}).bind(this), 1600);
  setTimeout((function(){this.body.velocity.x = 50}).bind(this), 2400);
  setTimeout((function(){this.body.velocity.x = 25}).bind(this), 3200);
  setTimeout((function(){this.body.velocity.x = 0}).bind(this), 4000);
  }
};

Bear.prototype.runLeft = function(){
  this.body.velocity.x = -150;
};

Bear.prototype.decelerateLeft = function(){
  if (this.body.velocity.x === -150){
    this.body.velocity.x = -125;
    setTimeout((function(){this.body.velocity.x = -100}).bind(this), 800);
    setTimeout((function(){this.body.velocity.x = -75}).bind(this), 1600);
    setTimeout((function(){this.body.velocity.x = -50}).bind(this), 2400);
    setTimeout((function(){this.body.velocity.x = -25}).bind(this), 3200);
    setTimeout((function(){this.body.velocity.x = 0}).bind(this), 4000);
  }
};

Bear.prototype.jump = function(){
  this.body.velocity.y = -400;
};

Bear.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Bear;
