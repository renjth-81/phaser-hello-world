var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.crossOrigin = 'anonymous';
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var platforms;
var player;
var cursors;
var stars;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // background sprite is sky
    game.add.sprite(0, 0, 'sky');

    // group all ledges under one object  - platforms
    platforms = game.add.group();

    // enable physics for all objects created under platforms group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge1 = platforms.create(400, 470, 'ground');

    ledge1.body.immovable = true;

    var ledge2 = platforms.create(-150, 250, 'ground');

    ledge2.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 450;
    player.body.acceleration.y = 460;

    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();

    // create stars
    stars = game.add.group();
    stars.enableBody = true;

    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 0.6;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

    }
}

function update() {
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    // check if stars collide with platforms
    game.physics.arcade.collide(stars,platforms);

    // if player collides with stars, call collectStar function
    game.physics.arcade.overlap(player,stars,collectStar,null,this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -250;

        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 250;

        player.animations.play('right');
    }
    else {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }

}

function collectStar (player,star){
    // remove star from screen
    star.kill();
}