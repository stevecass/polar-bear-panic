MainMenu = function(game) {};
MainMenu.prototype = {
	create: function() {
		this.add.sprite(80, 100, 'screenMainmenu');
		this.startButton = this.add.button(230, 230, 'singlePlayer', this.startGame, this, 1, 0, 2);
		this.multiPlayer = this.add.button(230, 300, 'multiPlayer', this.startMultiplayer, this, 1, 0, 2);
		this.instructions = this.add.button(230, 370, 'instructions', this.startInstructions, this, 1, 0, 2);
	},

	startGame: function() {
		this.game.state.start('Game');
	}
};