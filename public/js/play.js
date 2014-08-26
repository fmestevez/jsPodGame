var playState = {

	create: function() { 
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('run', [0, 1], 8, true);
        this.player.animations.add('jump', [2, 3], 8, true);
        game.physics.arcade.enable(this.player);
	},

	update: function() {
        this.player.animations.play('run');
	},
};