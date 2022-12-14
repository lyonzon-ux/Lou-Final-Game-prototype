class Death extends Phaser.Scene {
    constructor() {
        super("deathScene");
    }
     preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('starfield', './assets/background.png');

      }

    create(){
      this.starfield = this.add.tileSprite(0, 0, 480, 640, 'starfield').setOrigin(0, 0);       
      let deathConfig = {
            fontFamily: 'Georgia',
            fontSize: '20px',
            backgroundColor: '#42b281',
            color: '#0e0a1c',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
          }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'You Died', deathConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Try Again?', deathConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', deathConfig).setOrigin(0.5);

        deathConfig.backgroundColor = '#42b249'
        deathConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/1.75 + borderUISize + borderPadding, 'Remember avoid the BIRDS but collect the FLOWERS!', deathConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,

          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 5
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}
