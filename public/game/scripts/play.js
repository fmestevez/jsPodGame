var playState = {

	create: function() {
        // Creates world (loads tilemap)
        this.createWorld();
        
        this.keypressEnabled = true;
        this.raceStart = false;
        this.raceFinish = false;
        
        // Create player
        this.player = game.add.sprite(50, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        
        // Add player's animations
        this.player.animations.add('run', [0, 1], 8, true);
        this.player.animations.add('walk', [0, 4, 3], 8, true);
        this.player.animations.add('jump', [2, 3], 8, true);
        this.player.frame = 0;
        
        // Enables player to have physics
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 400;
        
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        
        // Adds space key to control the aimer
        this.keys = {
            space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };
        this.keys.space.onDown.add(this.movePlayer, this);
        
        // Adds mouse click to control the aimer
        game.input.onDown.add(this.movePlayer, this);
        
        // Adds aim bar
        this.aimbar = game.add.sprite(
            game.cache.getImage('aimbar').width / 2 + 10,
            game.cache.getImage('aimbar').height / 2 + 10,
            'aimbar'
        );
        this.aimbar.anchor.setTo(0.5, 0.5);
        this.aimbar.fixedToCamera = true;

        // Adds aim pointer
        this.aimpointer = game.add.sprite(14, 20, 'aimpointer');
        this.aimpointer.anchor.setTo(0.5, 0.5);
        this.aimpointer.fixedToCamera = true;

        this.setAimpointerAnimation();
        
        this.timerText = game.add.text(game.camera.width - 100, 20, "0", {
            font: "20px 'Press Start 2P'",
            fill: "#000",
            align: "right"
        });
        this.timerText.anchor.setTo(0.5, 0.5);
        this.timerText.fixedToCamera = true;
	},

	update: function() {
        game.physics.arcade.collide(this.player, this.layer);
        
        if(this.raceStart && !this.raceFinish) {
            this.lapTime = game.time.elapsedSince(this.startTime) / 1000;
            this.timerText.setText(this.lapTime);
        }

        // Deaccelerates player every frame
        this.player.body.acceleration.x = 0;
        this.player.body.drag.x = this.player.body.velocity.x / 1.5;
        
        this.handlePlayerAnimations(this.player.body.velocity.x);
	},
    
    createWorld: function () {
        this.map = game.add.tilemap('pista1');
        this.map.addTilesetImage('pista1_tileset');
        this.layer = this.map.createLayer('pista1');
        
        // Sets collidable tiles (floor)
        this.map.setCollision([2, 5]);
        
        // Sets start and finish lines events
        this.map.setTileIndexCallback(8, this.handleStart, this);
        this.map.setTileIndexCallback(7, this.handleFinish, this);
        
        game.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.background = game.add.tileSprite(0, 0,
            game.world.bounds.width,
            game.cache.getImage('background').height,
            'background');
    },
        
    movePlayer: function () {
        if(!this.keypressEnabled) return;
        
        this.aimtween.stop();
        
        // Adds tiny animation to the aim pointer when stopped
        game.add.tween(this.aimpointer.scale).to({x: 1.2, y: 1.2}, 200)
            .to({x: 1, y: 1}, 200).start();
        
        // Depending on the position on the bar, accels [~10 -> ~100] * 200
        var pointerVal = this.aimpointer.cameraOffset.x;
        var barWidth = game.cache.getImage('aimbar').width;
        var accel = (pointerVal < barWidth / 2)? pointerVal : barWidth - pointerVal;
        this.player.body.acceleration.x = Math.abs(accel) * 200;
        
        // Disables spacebar and counts seconds to reactivate
        this.keypressEnabled = false;

        game.time.events.add(Phaser.Timer.SECOND * 2, this.reEnableAimbar, this);
    },
    
    reEnableAimbar: function () {
        if(this.raceFinish) return;
        
        this.setAimpointerAnimation();
        this.keypressEnabled = true;
    },
    
    setAimpointerAnimation: function () {
        // Adds animation to aim pointer
        this.aimpointer.cameraOffset.setTo(14, 20);
        this.aimtween = game.add.tween(this.aimpointer.cameraOffset)
            .to({x: 208}, 400, Phaser.Easing.Circular.Out,
                true, 0, Number.MAX_VALUE, true);
        this.aimtween.start();
    },
    
    handleStart: function () {
        if(this.raceStart) return;
        
        this.raceStart = true;
        this.startTime = game.time.now;
    },
    
    handleFinish: function () {
        if(this.raceFinish) return;
    
        this.raceFinish = true;
    },
    
    handlePlayerAnimations: function (playerSpeed) {
        if (playerSpeed < 10) {
            this.player.body.velocity.x = 0;
            this.player.frame = 0;  
        } else if (playerSpeed < 60) {
            this.player.animations.play('walk');
        } else {
            this.player.animations.play('run');
        }
    },
};