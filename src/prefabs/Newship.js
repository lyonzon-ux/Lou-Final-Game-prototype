class Newship extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y,texture,frame,pointValue){
        super(scene,x,y,texture,frame)
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }
    update(){
        this.y += this.moveSpeed;
        if(this.y  >= 640 - this.height){
            this.y = 0;
        }
    }
    reset(){
        this.y = 0;
    }
}