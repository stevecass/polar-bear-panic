var Bear = {};
Bear.Preloader = function(game) {};

Bear.Preloader.prototype = {
	preload:function() {
		this.game.load.image('sky', 'assets/sky2.png');
    	this.game.load.image('kenney', 'assets/kenney.png');
    	this.game.load.tilemap('map', 'assets/block_platform_snow.json', null, Phaser.Tilemap.TILED_JSON);
    	this.game.load.spritesheet('snow', 'assets/snow.png', 17, 17);
    	this.game.load.spritesheet('bear', 'assets/bear.png', 90, 50, 3);
    	this.game.load.spritesheet('fish', 'assets/fish.png', 25, 45);
    	// this.game.load.spritesheet('iceberg', 'assets/iceberg.png', 110, 76);
    	this.game.load.spritesheet('chaser', 'assets/chaser.png', 200, 600);

	},

	create: function() {
		this.game.state.start('MainMenu');
	}
};