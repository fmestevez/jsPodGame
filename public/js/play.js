var playState = {

	create: function() { 
        // Creates world (loads tilemap)
        this.createWorld();
        
        this.keypressEnabled = true;
        
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
        
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        
        // Adds new key to control the player
        this.keys = {
            space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };
        
        this.keys.space.onDown.add(this.movePlayer, this);
        
        // Adds aim bar and aim pointer
        this.aimbar = game.add.sprite(game.cache
            .getImage('aimbar').width /2 + 10, 
            game.cache.getImage('aimbar').height/2 + 10, 'aimbar');
        this.aimbar.anchor.setTo(0.5, 0.5);
        this.aimbar.fixedToCamera = true;
        this.aimpointer = game.add.sprite(14, 20, 'aimpointer');
        this.aimpointer.anchor.setTo(0.5, 0.5);
        this.aimpointer.fixedToCamera = true;
        this.setAimpointerAnimation();
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
        game.world.setBounds(0, 0, 6400, 320);
        this.background = game.add.tileSprite(0, 0, 
            game.world.bounds.width, 
            game.cache.getImage('background').height,
            'background');
        
        this.map = game.add.tilemap('pista1');
        this.map.addTilesetImage('pista1_tileset');
        this.layer = this.map.createLayer('pista1');
        
        this.map.setCollision(2);
        
    },
        
    movePlayer: function () {
        if(!this.keypressEnabled) return;
        
        this.player.animations.play('run');
        
        this.aimtween.stop();
        
        // Adds tiny animation to the aim pointer when stopped
        game.add.tween(this.aimpointer.scale).to({x: 1.2, y: 1.2}, 200)
        .to({x: 1, y: 1}, 200).start();
        
        // Depending on the position on the bar, accels [~10 -> ~100] * 200
        var pointerVal = this.aimpointer.cameraOffset.x;
        var barWidth = game.cache.getImage('aimbar').width;
        var accel = (pointerVal < barWidth / 2)?
            pointerVal : barWidth - pointerVal;
        this.player.body.acceleration.x = Math.abs(accel) * 200;
        
        // Disables spacebar and counts seconds to reactivate
        this.keypressEnabled = false;
        game.time.events.add(Phaser.Timer.SECOND * 2, this.reEnableAimbar, this);
    },
    
    reEnableAimbar: function () {
        this.setAimpointerAnimation();
        this.keypressEnabled = true;
    },
    
    setAimpointerAnimation: function () {
        // Adds animation to aim pointer
        this.aimpointer.cameraOffset.setTo(14, 20);
        this.aimtween = game.add.tween(this.aimpointer.cameraOffset)
        .to({x: 208}, 600, Phaser.Easing.Sinusoidal.Out, 
            true, 0, Number.MAX_VALUE, true);
        this.aimtween.start();
    },
};