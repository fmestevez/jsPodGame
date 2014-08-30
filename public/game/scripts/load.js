var loadState = {

	preload: function () {
		// Add a loading label 
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		// Add a progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		// Load all assets
		game.load.spritesheet('mute', 'game/assets/muteButton.png', 28, 22);
        game.load.spritesheet('player', 'game/assets/player.png', 46, 64);
        game.load.tilemap('pista1', 'game/assets/pista1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('pista1_tileset', 'game/assets/pista1_tileset.png');
        game.load.image('background', 'game/assets/background.png');
        game.load.image('aimbar', 'game/assets/aimbar.png');
        game.load.image('aimpointer', 'game/assets/aimpointer.png');
		// ...
	},

	create: function() {
		game.state.start('menu');
	}
};