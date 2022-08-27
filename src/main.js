//Loumary Yonzon
//Completed 24 Agust 2022
//Using rocket patrol code to create an infinite runn style of game.
//code changed to make enemies move downwards as well as changing the way the game ends.
//Playable game based off the playtests ran



let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scene: [Menu,Play,Death]
  }
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT, mousePointer;
// set UI size
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
 