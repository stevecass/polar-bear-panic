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
	pole = null;
};

var Bear = function(game, x, y, frame) {

    Phaser.Sprite.call(this, game, x, y, 'bear', frame);

    this.game.physics.arcade.enableBody(this);

    this.body.collideWorldBounds = true;
    this.body.gravity.y = 600;
    this.body.maxVelocity = 1000;

    this.animations.add('left', [1, 2, 3, 4, 5, 6], 15, true);
    this.animations.add('right', [1, 2, 3, 4, 5, 6], 15, true);
    this.anchor.setTo(.5);
    this.body.drag.x = 800;

};

Bear.prototype = Object.create(Phaser.Sprite.prototype);
Bear.prototype.constructor = Bear;

  // RIGHT MOVEMENT
Bear.prototype.runRight = function(){
  this.body.velocity.x = 450;
  this.scale.x = 1;
  this.animations.play('right');
};
  // LEFT MOVEMENT
Bear.prototype.runLeft = function(){
  this.body.velocity.x = -450;
  this.scale.x = -1;
  this.animations.play('left');
};
  //JUMPING
Bear.prototype.jump = function(){
    this.body.velocity.y = -600;
};

Bear.prototype.stop = function(){
    this.animations.stop();
    this.frame = 2;
};

Bear.prototype.die = function(){
	this.game.add.text(this.position.x, 300, 'YOU DIED!\n    :(', { fill: '#ffffff' });
	this.kill();
	this.game.state.start("Over");
};

Bear.prototype.win = function(){
    this.game.add.text(this.position.x, 300, 'You Made It!\n    :)', { fill: '#ffffff' });
    this.game.state.start("Over");
};

Game.prototype = {
	restartGame: function() {
		this.game.state.start('Game');
	},

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
	    this.game.physics.enable(this.bear, Phaser.Physics.ARCADE);
	    this.game.add.existing(this.bear);
	    this.game.camera.follow(this.bear);

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
	   	chaser.animations.add('chase');
	   	chaser.animations.play('chase', 7, true);
	    this.game.physics.enable(chaser, Phaser.Physics.ARCADE);
	    chaser.body.collideWorldBounds = true;

	    pole = this.add.sprite( 11715, 200, 'pole');
	    this.game.physics.enable(pole, Phaser.Physics.ARCADE);
	},

	update : function() {
		this.game.physics.arcade.collide(this.bear, layer);
	    this.game.physics.arcade.collide(this.bear, hardRain);
	    this.game.physics.arcade.collide(pole, layer);

	    chaser.body.velocity.x = 290;

        if (this.game.physics.arcade.overlap(this.bear, chaser)) {
        	this.bear.die();
        }

        if (this.game.physics.arcade.overlap(this.bear, pole)) {
        	this.bear.win();
        }

	    if (cursors.left.isDown) {
	        this.bear.runLeft();

	    } else if (cursors.right.isDown) {
	        this.bear.runRight();

	    } else {
	        this.bear.stop();
	    }

	    if (cursors.up.isDown && this.bear.body.onFloor()) {
	        this.bear.jump();
	    }

	    if (gameOver === true) {
	    	// this.game.state.start('MainMenu');
	    }
	}
};