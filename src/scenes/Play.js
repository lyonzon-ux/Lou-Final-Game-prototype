class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('rocket', './assets/player.png');
        this.load.image('spaceship', './assets/obstacle.png');
        this.load.image('newship', './assets/collect.png');
        this.load.image('starfield', './assets/background.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create(){
        this.starfield = this.add.tileSprite(0, 0, 480, 640, 'starfield').setOrigin(0, 0);        
        //green bar
        
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x262626).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0, 0);
        this.ship01 = new Spaceship(this, borderUISize*8, 0, 'spaceship', 0, -1,2).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, borderUISize*2, 0, 'spaceship', 0, -1,3).setOrigin(0,0);
        this.ship03 = new Spaceship(this, borderUISize*5, 0, 'spaceship', 0, -1,4).setOrigin(0,0);
        this.ship04 = new Newship(this, borderUISize*5.5, 0, 'newship', 0, 1).setOrigin(0,0);
        this.add.rectangle(0,borderUISize+borderPadding, game.config.width, borderUISize * 2, 0x6b6868).setOrigin(0,0);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);0
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.p1time = game.settings.gameTimer;
        this.p1Score = 5;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
          this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
          scoreConfig.fixedWidth = 0;
          this.gameOver = false;
        }
    update(){
      if (this.p1Score <= 0){
        // this.scene.stop("playScene");
        this.scene.start('deathScene');
      }
        this.starfield.tilePositionY -= 4;
        if (!this.gameOver) {
        this.p1Rocket.update();
        this.ship01.update();               // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();
        this.ship04.update();
        }
        
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            game.settings.gameTimer -= 2000;   
          }
          if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            game.settings.gameTimer -= 2000;
          }
          if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            game.settings.gameTimer -= 2000;
          }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }

       
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); 
        ship.reset();                         // reset ship position
          ship.alpha = 1;            // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes                         
          boom.destroy();                       // remove explosion sprite
        });   
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;       
        this.sound.play('sfx_explosion');       
        

    }
  }
