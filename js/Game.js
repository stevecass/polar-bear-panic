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
  warmth = null;
};

var Bear = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'bear', frame);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 600;
    this.body.maxVelocity = 1000;
    this.game.camera.follow(this);
    this.animations.add('left', [1, 2, 3, 4, 5, 6], 15, true);
    this.animations.add('right', [1, 2, 3, 4, 5, 6], 15, true);
    this.anchor.setTo(.5);
    this.body.drag.x = 800;
};

Bear.prototype = Object.create(Phaser.Sprite.prototype);
Bear.prototype.constructor = Bear;

Bear.prototype.runRight = function(){
  this.body.velocity.x = 450;
  this.scale.x = 1;
  this.animations.play('right');
};

Bear.prototype.runLeft = function(){
  this.body.velocity.x = -450;
  this.scale.x = -1;
  this.animations.play('left');
};

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

	makeSnow: function(object) {
		object.makeParticles('snow');
		object.width = this.world.width;
		object.minParticleScale = 0.4;
		object.maxParticleScale = 0.8;
		object.setYSpeed(300, 500);
		object.setXSpeed(-500, -1000);
		object.minRotation = 0;
		object.maxRotation = 0;
		object.start(false, 1600, 5, 0);
	},

	makeRain: function(object) {
		this.physics.enable(object, Phaser.Physics.ARCADE)
		object.width = this.world.width;
		object.makeParticles('fish');
		object.setYSpeed(300, 500);
		object.setXSpeed(-500, -1000);
		object.minRotation = 360;
		object.maxRotation = 90;
		object.start(false, 1600, 5, 0);
	},

	chase: function(object){
		// object.animations.add('chase');
		// object.animations.play('chase', 7, true);
		this.game.physics.enable(object, Phaser.Physics.ARCADE);
		object.body.collideWorldBounds = true;
	},

  warm: function(object){
    this.game.physics.enable(object, Phaser.Physics.ARCADE);
    object.body.collideWorldBounds = true;
  },

	create: function() {

		// var playerLocations = new Firebase("https://fiery-inferno-6891.firebaseio.com");

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

    this.bear = new Bear(this.game, 900, 500);
    this.game.add.existing(this.bear);

    snow = this.add.emitter(this.world.centerX, 0, 1000);
    this.makeSnow(snow);

    hardRain = this.add.emitter(this.world.centerX, 0, 100);
    this.makeRain(hardRain);

    chaser = this.add.sprite(0, 0, 'chaser');
    this.chase(chaser);

    warmth = this.add.sprite(0,0, 'warmth');
    this.warm(warmth);

    pole = this.add.sprite( 11715, 200, 'pole');
    this.game.physics.enable(pole, Phaser.Physics.ARCADE);
	},

	update : function() {
		// this.playerLocations.set("test");
		var playerLocations = new Firebase("https://fiery-inferno-6891.firebaseio.com");
		// playerLocations.on('value', function (snapshot) {
		//   console.log(snapshot.val());
		// });

		this.game.physics.arcade.collide(this.bear, layer);
    this.game.physics.arcade.collide(this.bear, hardRain);
    this.game.physics.arcade.collide(pole, layer);

    globalWarmingSpeed = 300;

    chaser.body.velocity.x = globalWarmingSpeed;
    warmth.body.velocity.x = globalWarmingSpeed;

      if (this.game.physics.arcade.overlap(this.bear, chaser)) {
      	this.bear.die();
      }

      if (this.game.physics.arcade.overlap(this.bear, pole)) {
      	this.bear.win();
      }

    if (cursors.left.isDown) {
        this.bear.runLeft();
        // this.playerLocation.set();
        // playerLocations.set("test");

    } else if (cursors.right.isDown) {
        this.bear.runRight();
  		// this.playerLocations.set("this old man");
  		// playerLocations.set("test");

    } else {
        this.bear.stop();
        // this.playerLocation.set();
    }

    if (cursors.up.isDown && this.bear.body.onFloor()) {
        this.bear.jump();
        // this.playerLocation.set();
    }

    if (gameOver === true) {
    	// this.game.state.start('MainMenu');
    }
	}
};