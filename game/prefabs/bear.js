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
  this.body.velocity.x = 200;
};

Bear.prototype.runLeft = function(){
  this.body.velocity.x = -200;
};

Bear.prototype.jump = function(){
  this.body.velocity.y = -400;
};

Bear.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Bear;
