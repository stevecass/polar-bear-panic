'use strict';

var Bear = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bear', frame);

  // initialize your prefab here
  
};

Bear.prototype = Object.create(Phaser.Sprite.prototype);
Bear.prototype.constructor = Bear;

Bear.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Bear;
