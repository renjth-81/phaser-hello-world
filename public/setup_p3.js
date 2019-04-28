var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
    /*
    ,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
    */
};

var game = new Phaser.Game(config);

function preload() {
    /*
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    */

    this.load.image('dude', ['assets/character.png', 'assets/character_n.png']);

}

function create() {
    /*
    var sky = this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    */
    var dude = this.add.image(400, 300, 'dude');
    var light = this.lights.addLight(500, 250, 200);
    //this.lights.enable().setAmbientColor(0xffff7f);
    this.lights.enable().setAmbientColor(0xffffff);

    dude.setPipeline('Light2D');

    this.input.on('pointermove', function (pointer) {
        light.x = pointer.x;
        light.y = pointer.y;
    });
}

function update() {
}