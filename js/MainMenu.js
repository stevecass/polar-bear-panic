Bear.MainMenu = function(game) {};
Bear.MainMenu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'screen-mainmenu');
		this.startButton = this.add.button((320-146)/2, 200, 'button-start', this.startGame, this, 1, 0, 2);
	},

	startGame: function() {
		this.game.state.start('Game');
	}
};