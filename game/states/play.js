
  'use strict';

  var Bear = require('../prefabs/bear');
  var Ground = require('../prefabs/ground');
  // var game = new Phaser.Game();
  var cursors;
  var bear;

  function Play() {}
  Play.prototype = {


    create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 300;

      // SETTING BOUNDS
      this.game.world.setBounds(0, 0, 6400, 600);

      // this.game.physics.arcade.gravity.x = -200;
      this.background = this.game.add.sprite(0,0,'background');

      this.bear = new Bear(this.game, 100, this.game.height/2);

      // CREATING AND ADDING A NEW GROUND
      this.ground = new Ground(this.game, 0, 400, 800, 200);
      this.game.add.existing(this.ground);

      this.game.add.existing(this.bear);

      this.game.camera.follow(this.bear);

      this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.UP
        ]);

      var runRight = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      runRight.onDown.add(this.bear.runRight, this.bear);
      runRight.onUp.add(this.bear.decelerateRight, this.bear)

      // this.input.onDown.add(this.bear.runRight, this.bear);

      var runLeft = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      runLeft.onDown.add(this.bear.runLeft, this.bear);
      runLeft.onUp.add(this.bear.decelerateLeft, this.bear);

      // this.input.onDown.add(this.bear.runLeft, this.bear);


      var jump = this.input.keyboard.addKey(Phaser.Keyboard.UP);
      jump.onDown.add(this.bear.jump, this.bear);

      this.input.onDown.add(this.bear.jump, this.bear);

     },

    update: function() {
      this.game.physics.arcade.collide(this.bear, this.ground, this.deathHandler, null, this);
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
