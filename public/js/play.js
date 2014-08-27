var playState = {

	create: function() { 
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('run', [0, 1], 8, true);
        this.player.animations.add('jump', [2, 3], 8, true);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 400;
        
        this.createWorld();
	},

	update: function() {
        game.physics.arcade.collide(this.player, this.layer);
        this.player.animations.play('run');
	},
    
    createWorld: function () {
        this.map = game.add.tilemap('pista1');
        this.map.addTilesetImage('pista1_tileset');
        this.layer = this.map.createLayer('pista1');
        //this.layer.resizeWorld();
        // TODO: ver si hace falta esto para los tilemaps
        this.map.setCollision(2);
        game.world.setBounds(0, 0, 1280, 320);
    },
};