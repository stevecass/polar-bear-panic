Bear.Game = function(game) {
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

Bear.Game.prototype = {
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

	    bear = this.add.sprite(500, 500, 'bear', 2);
	    this.physics.enable(bear, Phaser.Physics.ARCADE);
	    bear.body.collideWorldBounds = true;
	    bear.body.gravity.y = 600;
	    bear.body.maxVelocity = 1000;
	    this.camera.follow(bear);
	    bear.animations.add('left', [0, 1], 10, true);
	    bear.animations.add('right', [0, 1], 10, true);
	    bear.anchor.setTo(.5);

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
	    game.physics.enable(chaser, Phaser.Physics.ARCADE);
	    chaser.body.collideWorldBounds = true;


	},
	update : function() {
		this.game.physics.arcade.collide(bear, layer);
	    this.game.physics.arcade.collide(bear, hardRain);

	    bear.body.drag.x = 800;

	    chaser.body.velocity.x = 100;

        if (game.physics.arcade.overlap(bear, chaser)) {
            console.log("Overlapping");
            game.add.text(bear.position.x, 300, 'YOU DIED!\n    :(', { fill: '#ffffff' });
            bear.kill();
        };

	    if (cursors.left.isDown) {

	        bear.scale.x = -1;
	        bear.body.velocity.x = -500;
	        bear.animations.play('left');

	    } else if (cursors.right.isDown) {

	        bear.scale.x = 1;
	        bear.body.velocity.x = 500;
	        bear.animations.play('right');

	    } else {

	        bear.animations.stop;
	        bear.frame = 2;
	    }

	    if (cursors.up.isDown && bear.body.onFloor()) {

	        bear.body.velocity.y = -600;

	    }
	    if (gameOver === true) {
	    	// this.game.state.start('MainMenu');
	    }
	}
};