'use strict';

var Bear = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bear', frame);

  // initialize your prefab here

  this.game.physics.arcade.enableBody(this);

  this.body.bounce.y = 0.2;
  this.body.gravity.y = 300;
  this.body.collideWorldBounds = true;


  this.animations.add('right', [1, 2], 10, true);
  this.animations.add('left', [1, 2], 10, true);

};

Bear.prototype = Object.create(Phaser.Sprite.prototype);
Bear.prototype.constructor = Bear;

  // RIGHT MOVEMENT
Bear.prototype.runRight = function(){
  this.body.drag.x = 0;
  this.body.velocity.x = 400;
  this.animations.play('right');
};
  // LEFT MOVEMENT
Bear.prototype.runLeft = function(){
  this.body.drag.x = 0;
  this.body.velocity.x = -400;
  this.animations.play('left');
};
// SLOW WHEN NOT PRESSED
Bear.prototype.decelerate = function(){
  this.body.drag.x = 300;
  this.animations.stop();
  this.frame = 0;
};
  //JUMPING
Bear.prototype.jump = function(){
    this.body.velocity.y = -400;
};

Bear.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Bear;
