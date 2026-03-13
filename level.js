<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Web Level Example</title>
<style>
body { margin: 0; background: black; overflow: hidden; }
canvas { display: block; margin: auto; background: #141432; }
</style>
</head>
<body>
<canvas id="gameCanvas" width="800" height="600"></canvas>

<script>
/* ----------- SIMPLE CLASSES FOR GAME OBJECTS ----------- */

class Platform {
    constructor(x, y, width, height){
        this.x = x; this.y = y; this.width = width; this.height = height;
    }
    update(){}
    draw(ctx, offsetX){
        ctx.fillStyle = "#5555ff";
        ctx.fillRect(this.x + offsetX, this.y, this.width, this.height);
    }
}

class Enemy {
    constructor(x, y){
        this.x = x; this.y = y; this.width = 30; this.height = 30;
    }
    update(){}
    draw(ctx, offsetX){
        ctx.fillStyle = "#ff5555";
        ctx.fillRect(this.x + offsetX, this.y, this.width, this.height);
    }
}

class PowerUp {
    constructor(x, y){
        this.x = x; this.y = y; this.radius = 10; this.collected = false;
    }
    update(){}
    draw(ctx, offsetX){
        ctx.fillStyle = "#ffff55";
        ctx.beginPath();
        ctx.arc(this.x + offsetX, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
    }
}

class Flag {
    constructor(x, y){
        this.x = x; this.y = y; this.width = 20; this.height = 40;
    }
    update(){}
    draw(ctx, offsetX){
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(this.x + offsetX, this.y, this.width, this.height);
    }
}

/* ---------------- LEVEL CLASS ---------------- */

class Level {
    constructor(screenWidth, screenHeight, levelNum=1){
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.levelNum = levelNum;

        this.platforms = [];
        this.enemies = [];
        this.powerUps = [];
        this.flags = [];

        this.cameraX = 0;
        this.levelWidth = screenWidth*3;

        this.setupLevel();
    }

    setupLevel(){
        this.platforms = []; this.enemies = []; this.powerUps = []; this.flags = [];

        if(this.levelNum===1) this.setupLevel1();
        else if(this.levelNum===2) this.setupLevel2();
        else if(this.levelNum===3) this.setupLevel3Easy();
        else this.setupGeneratedLevel(this.levelNum);
    }

    setupLevel1(){
        // Screen 1
        this.platforms.push(new Platform(0,550,800,50));
        this.platforms.push(new Platform(100,450,150,20));
        this.platforms.push(new Platform(400,400,150,20));
        this.platforms.push(new Platform(200,300,150,20));

        this.enemies.push(new Enemy(300,500));
        this.enemies.push(new Enemy(600,450));

        this.powerUps.push(new PowerUp(400,360));

        // Screen 2
        this.platforms.push(new Platform(800,550,800,50));
        this.platforms.push(new Platform(900,450,150,20));
        this.platforms.push(new Platform(1100,380,150,20));
        this.platforms.push(new Platform(1300,300,150,20));
        this.platforms.push(new Platform(1500,350,150,20));

        this.enemies.push(new Enemy(1000,500));
        this.enemies.push(new Enemy(1400,400));

        this.powerUps.push(new PowerUp(1100,340));

        // Screen 3
        this.platforms.push(new Platform(1600,550,800,50));
        this.platforms.push(new Platform(1700,450,150,20));
        this.platforms.push(new Platform(1900,350,150,20));
        this.platforms.push(new Platform(2100,280,150,20));
        this.platforms.push(new Platform(2300,400,150,20));

        this.enemies.push(new Enemy(1800,500));
        this.enemies.push(new Enemy(2200,400));

        this.flags.push(new Flag(2350,480));
    }

    setupLevel2(){
        this.platforms.push(new Platform(0,550,800,50));
        this.platforms.push(new Platform(150,480,120,20));
        this.platforms.push(new Platform(350,420,120,20));
        this.platforms.push(new Platform(550,360,120,20));

        this.enemies.push(new Enemy(250,500));
        this.enemies.push(new Enemy(700,450));
        this.enemies.push(new Enemy(450,380));

        this.powerUps.push(new PowerUp(550,320));

        this.platforms.push(new Platform(800,550,800,50));
        this.platforms.push(new Platform(850,450,120,20));
        this.platforms.push(new Platform(1050,380,120,20));
        this.platforms.push(new Platform(1250,300,120,20));
        this.platforms.push(new Platform(1450,380,120,20));

        this.enemies.push(new Enemy(950,500));
        this.enemies.push(new Enemy(1150,400));
        this.enemies.push(new Enemy(1550,420));

        this.powerUps.push(new PowerUp(1250,260));

        this.platforms.push(new Platform(1600,550,800,50));
        this.platforms.push(new Platform(1650,480,120,20));
        this.platforms.push(new Platform(1850,400,120,20));
        this.platforms.push(new Platform(2050,320,120,20));
        this.platforms.push(new Platform(2250,380,120,20));

        this.enemies.push(new Enemy(1750,500));
        this.enemies.push(new Enemy(1950,420));
        this.enemies.push(new Enemy(2150,340));
        this.enemies.push(new Enemy(2350,400));

        this.powerUps.push(new PowerUp(2050,280));

        this.flags.push(new Flag(2350,480));
    }

    setupLevel3Easy(){
        let groundY=550;
        this.platforms.push(new Platform(0,groundY,this.levelWidth,50));

        const easyPlatforms=[
            [100,480,180],[320,430,180],[540,380,180],
            [860,480,180],[1080,430,180],[1300,380,180],
            [1660,480,180],[1880,430,180],[2100,380,180]
        ];

        easyPlatforms.forEach(p=>this.platforms.push(new Platform(p[0],p[1],p[2],20)));

        this.enemies.push(new Enemy(600,groundY-50));
        this.enemies.push(new Enemy(1400,groundY-50));
        this.enemies.push(new Enemy(2000,groundY-50));

        this.powerUps.push(new PowerUp(500,340));
        this.powerUps.push(new PowerUp(1200,340));
        this.powerUps.push(new PowerUp(1800,340));

        this.flags.push(new Flag(this.levelWidth-100,groundY-70));
    }

    setupGeneratedLevel(lvl){
        let groundY=550;
        this.platforms.push(new Platform(0,groundY,this.levelWidth,50));

        let numPlatforms=8+(lvl%5);
        for(let i=0;i<numPlatforms;i++){
            let widths=[80,120,150];
            let w=widths[Math.floor(Math.random()*widths.length)];
            let x=Math.random()*(this.levelWidth-200);
            let y=220+Math.random()*(groundY-120);
            this.platforms.push(new Platform(x,y,w,20));
        }

        let numEnemies=3+Math.floor(lvl/2);
        for(let i=0;i<numEnemies;i++){
            let ex=100+Math.random()*(this.levelWidth-200);
            let ey=groundY-50;
            this.enemies.push(new Enemy(ex,ey));
        }

        let numPU=Math.max(1,Math.floor(lvl/3));
        for(let i=0;i<numPU;i++){
            let px=120+Math.random()*(this.levelWidth-200);
            let py=200+Math.random()*(groundY-140);
            this.powerUps.push(new PowerUp(px,py));
        }

        this.flags.push(new Flag(this.levelWidth-50,groundY-70));
    }

    updateCamera(player){
        this.cameraX = player.x - this.screenWidth/3;
        this.cameraX = Math.max(0, Math.min(this.cameraX, this.levelWidth-this.screenWidth));
    }

    getOffset(){ return -this.cameraX; }

    update(){
        this.platforms.forEach(p=>p.update());
        this.enemies.forEach(e=>e.update());
        this.powerUps.forEach(p=>p.update());
        this.flags.forEach(f=>f.update());
    }

    draw(ctx){
        let offsetX=this.getOffset();
        this.platforms.forEach(p=>p.draw(ctx,offsetX));
        this.enemies.forEach(e=>e.draw(ctx,offsetX));
        this.powerUps.forEach(p=>p.draw(ctx,offsetX));
        this.flags.forEach(f=>f.draw(ctx,offsetX));
    }
}

/* ---------------- TEST DEMO ---------------- */

const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

const level=new Level(canvas.width,canvas.height,1);

// Dummy player for camera test
const player={x:100};

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    level.updateCamera(player);
    level.update();
    level.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();

</script>
</body>
</html>
