Game = function(game) {
	cursors = null;
	sky = null;
	map = null;
	layer = null;
	snow = null;
	bear = null;
	hardRain = null;
	iceberg = null;
	gameOver = false;
	chaser = null;
};

var Bear = function(game, x, y, frame) {

    Phaser.Sprite.call(this, game, x, y, 'bear', 2);

    this.game.physics.arcade.enableBody(this);

    this.body.collideWorldBounds = true;
    this.body.gravity.y = 600;
    this.body.maxVelocity = 1000;

    this.animations.add('left', [0, 1], 10, true);
    this.animations.add('right', [0, 1], 10, true);
    this.anchor.setTo(.5);
    this.body.drag.x = 800;

};

Bear.prototype = Object.create(Phaser.Sprite.prototype);
Bear.prototype.constructor = Bear;

  // RIGHT MOVEMENT
Bear.prototype.runRight = function(){
  this.body.drag.x = 200;
  this.body.velocity.x = 400;
  this.scale.x = 1;
  this.animations.play('right');
};
  // LEFT MOVEMENT
Bear.prototype.runLeft = function(){
  this.body.drag.x = 200;
  this.body.velocity.x = -400;
  this.scale.x = -1;
  this.animations.play('left');
};
  //JUMPING
Bear.prototype.jump = function(){
    this.body.velocity.y = -600;
};

Bear.prototype.stop = function(){
    this.body.drag.x = 200;
    this.animations.stop();
    this.frame = 2;
};

Game.prototype = {

	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	    this.game.physics.arcade.gravity.y = 300;

	    cursors = this.input.keyboard.createCursorKeys();

	    sky = this.add.image(0, 0, 'sky');
	    sky.fixedToCamera = true;


	    map = this.game.add.tilemap('map');
	    map.addTilesetImage('kenney');
	    layer = map.createLayer('Tile Layer 1');
	    this.physics.enable(layer, Phaser.Physics.ARCADE);
	    map.setCollisionBetween(1, 100000, true, 'Tile Layer 1');
	    layer.resizeWorld();

	    snow = this.add.emitter(this.world.centerX, 0, 1000);
	    snow.width = this.world.width;
	    snow.makeParticles('snow');
	    snow.minParticleScale = 0.4;
	    snow.maxParticleScale = 0.8;
	    snow.setYSpeed(300, 500);
	    snow.setXSpeed(-500, -1000);
	    snow.minRotation = 0;
	    snow.maxRotation = 0;
	    snow.start(false, 1600, 5, 0);

	    this.bear = new Bear(this.game, 500, 500);
	    // this.bear = this.add.sprite(500, 500, 'bear', 2);
	    this.physics.enable(this.bear, Phaser.Physics.ARCADE);
	    this.bear.body.collideWorldBounds = true;
	    this.bear.body.gravity.y = 600;
	    this.bear.body.maxVelocity = 1000;
	    this.camera.follow(this.bear);
	    this.bear.animations.add('left', [0, 1], 10, true);
	    this.bear.animations.add('right', [0, 1], 10, true);
	    this.bear.anchor.setTo(.5);

	    hardRain = this.add.emitter(this.world.centerX, 0, 100);
	    this.physics.enable(hardRain, Phaser.Physics.ARCADE)
	    hardRain.width = this.world.width;
	    hardRain.makeParticles('fish');
	    hardRain.setYSpeed(300, 500);
	    hardRain.setXSpeed(-500, -1000);
	    hardRain.minRotation = 360;
	    hardRain.maxRotation = 90;
	    hardRain.start(false, 1600, 5, 0);

	    chaser = this.add.sprite(0, 0, 'chaser');
	    this.game.physics.enable(chaser, Phaser.Physics.ARCADE);
	    chaser.body.collideWorldBounds = true;


	},

	update : function() {

			this.game.physics.arcade.collide(this.bear, layer);
	    this.game.physics.arcade.collide(this.bear, hardRain);

	    chaser.body.velocity.x = 100;

        if (this.game.physics.arcade.overlap(this.bear, chaser)) {
            console.log("Overlapping");
            this.game.add.text(this.bear.position.x, 300, 'YOU DIED!\n    :(', { fill: '#ffffff' });
            this.bear.kill();
        };

	    if (cursors.left.isDown) {

	        this.bear.scale.x = -1;
	        this.bear.body.velocity.x = -500;
	        this.bear.animations.play('left');

	    } else if (cursors.right.isDown) {

	        this.bear.scale.x = 1;
	        this.bear.body.velocity.x = 500;
	        this.bear.animations.play('right');

	    } else {

	        this.bear.animations.stop;
	        this.bear.frame = 2;
	    }

	    if (cursors.up.isDown && this.bear.body.onFloor()) {

	        this.bear.body.velocity.y = -600;

	    }
	    // if (gameOver === true) {
	    // 	// this.game.state.start('MainMenu');
	    // }
	}

};