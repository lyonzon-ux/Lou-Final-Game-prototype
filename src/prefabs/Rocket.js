//rocket prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y,texture,frame){
        super(scene,x,y,texture,frame);
        this.sfxRocket = scene.sound.add('sfx_rocket');
    //add object to existing scene
    scene.add.existing(this);
    this.isFiring = true;
    this.moveSpeed = game.settings.spaceshipSpeed;
    }
    update(){
            if(keyLEFT.isDown && this.x >= borderUISize +this.width/10){
                this.x -= this.moveSpeed;
            }
            else if (keyRIGHT.isDown &&this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
    
    }
    reset(){
        this.y = game.config.height - borderUISize -borderPadding;
    }
}