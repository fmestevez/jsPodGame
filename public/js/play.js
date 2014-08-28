var playState = {

	create: function() { 
        // Creates world (loads tilemap)
        this.createWorld();
        
        // Create player
        this.player = game.add.sprite(50, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        
        // Add player's animations
        this.player.animations.add('run', [0, 1], 8, true);
        this.player.animations.add('jump', [2, 3], 8, true);
        this.player.frame = 0;
        
        // Enables player to have physics
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 400;
        
        // Adds new key to control the player
        this.keys = {
            space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };
        
        this.keys.space.onDown.add(this.movePlayer, this);
	},

	update: function() {
        game.physics.arcade.collide(this.player, this.layer);

        // Deaccelerates player every frame
        this.player.body.acceleration.x = 0;
        this.player.body.drag.x = this.player.body.velocity.x / 1.5;
        
        if (this.player.body.velocity.x < 10) {
            this.player.frame = 0;  
        };
	},
    
    createWorld: function () {
        this.background = game.add.tileSprite(0, 1, 
            game.stage.bounds.width, 
            game.cache.getImage('background').height,
            'background');
        
        this.map = game.add.tilemap('pista1');
        this.map.addTilesetImage('pista1_tileset');
        this.layer = this.map.createLayer('pista1');
        
        //this.layer.resizeWorld();
        // TODO: check if above line is necessary
        this.map.setCollision(2);
        game.world.setBounds(0, 0, 1280, 320);
    },
    
    movePlayer: function () {
        this.player.animations.play('run');

        // This value should be replaced with the value fetched from the aimbar
        this.player.body.acceleration.x = 5000;
    },
};