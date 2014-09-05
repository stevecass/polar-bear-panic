
  'use strict';

  var Bear = require('../prefabs/bear');
  // var game = new Phaser.Game();
  var cursors;
  var bear;

  function Play() {}
  Play.prototype = {


    create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 300;
      this.game.physics.arcade.gravity.x = -200;
      this.background = this.game.add.sprite(0,0,'background');

      this.bear = new Bear(this.game, 100, this.game.height/2);

      this.game.add.existing(this.bear);

      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      var runKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
          runKey.onDown.add(this.bear.run, this.bear);

      this.input.onDown.add(this.bear.run, this.bear);

     },

    update: function() {


    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
