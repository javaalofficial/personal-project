const canvas = document.getElementById('Game');
/** @type {CanvasRenderingContext2D}*/
const drawing = canvas.getContext('2d');


//movement

const click = {left: false, right: false, up: false, down: false};

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') click.up = true;
    if (e.key === 'ArrowDown') click.down = true;
    if (e.key === 'ArrowRight') click.right = true;
    if (e.key === 'ArrowLeft') click.left = true;
    if (e.key === ' ') {jumlahPeluru.push( new Peluru(pemain.x + pemain.w /2 - 2.5, pemain.y))}
})
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') click.up = false;
    if (e.key === 'ArrowDown') click.down = false;
    if (e.key === 'ArrowRight') click.right = false;
    if (e.key === 'ArrowLeft') click.left = false;
})

//pemain

class Pemain {
    constructor(){
        this.w = 50;
        this.h = 50;
        this.x = canvas.width / 2 - this.w / 2;
        this.y = canvas.height - this.h;
        this.speed = 10;
        this.picture = new Image();
        this.picture.src = 'asset/PNG/playerShip1_blue.png'
    };

    // update

    terbaru(){
        if (click.up) this.y -= this.speed;
        if (click.down) this.y += this.speed;
        if (click.right) this.x += this.speed;
        if (click.left) this.x -= this.speed;

        this.clamp()
    };

    //clamp

    clamp(){
        if (this.x < 0) this.x = 0;
        if (this.x + this.w > canvas.width) this.x = canvas.width - this.w;
        if (this.y < 0) this.y = 0;
        if (this.y + this.h > canvas.height) this.y = canvas.height - this.h;
    };

    //draw

    draw() {
        drawing.drawImage(this.picture, this.x, this.y, this.w, this.h)
    }
}

//peluru

class Peluru {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this. w = 5;
        this.h = 15;
        this.speed = 15;
        this.picture = new Image()
        this.picture.src = 'asset/PNG/Lasers/laserBlue01.png'
    }
    terbaru(){
        this.y -= this.speed;
    }
    draw(){
        drawing.drawImage(this.picture, this.x, this.y, this.w, this.h)
    }
}

//musuh

class Musuh {
    constructor(x, y){
        this.h = 50;
        this.w = 50;
        this.y = -this.h;
        this.x = Math.random() * (canvas.width - this.w);
        this.speed = 10;
        this.picture = new Image();
        this.picture.src = 'asset/PNG/Enemies/enemyBlack1.png'
    }
    terbaru(){
        this.y += this.speed
        
    }
    draw(){
        drawing.drawImage(this.picture, this.x, this.y, this.w, this.h)
    }

}

function jumlahnyaMusuh() {
    if (Math.random() < 0.1)
         jumlahMusuh.push(new Musuh())

    for (let m = jumlahMusuh.length - 1; m >= 0; m--){
        jumlahMusuh[m].terbaru()

        if (jumlahMusuh[m].y > canvas.height){
            jumlahMusuh.splice(m, 1)
        }
    }

}
function musuhDraw(){
    for (let musuh of jumlahMusuh)
        musuh.draw()
}
//latar

const latar = {
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height,
    picture: new Image(),
    draw() {
    drawing.drawImage(this.picture, this.x, this.y, this.w, this.h)
    },
};

latar.picture.src = 'asset/Backgrounds/blue.png';

//instance
let jumlahPeluru = [];
let pemain = new Pemain();
let jumlahMusuh = [];
let skorPemain = 0;

//peluru

function peluruNabrak(peluru, objek) {
    return (
        peluru.x < objek.x + objek.w &&
        peluru.x + peluru.w > objek.x &&
        peluru.y < objek.y + objek.h &&
        peluru.y + peluru.h > objek.y
        
    )
}

function peluruTerbaru(){
for (let p = jumlahPeluru.length - 1; p >= 0; p--){
    let peluruBaru = jumlahPeluru[p]
    peluruBaru.terbaru()

    for (let m = jumlahMusuh.length - 1; m >= 0; m--){
        let musuh = jumlahMusuh[m]

        if (peluruNabrak(peluruBaru, musuh)){
            console.log('total skor:' + skorPemain );

            jumlahMusuh.splice(m, 1)
            jumlahPeluru.splice(p, 1)

            skorPemain += 100;

            break;
        }
    }
        if (jumlahPeluru[p] && peluruBaru.h + peluruBaru.y < 0){
        jumlahPeluru.splice(p, 1);
        }
    }
}

function peluruDraw(){
    for (let peluruIni of jumlahPeluru){
        peluruIni.draw();
    }
}

function skorDraw(){
    drawing.fillStyle = 'white';
    drawing.font = 'arial 24px';
    drawing.fillText ('skor = ' + skorPemain, 30, 10, 1000) 
}

//Asset

let assetDimuat = 0;
const jumlahAsset = 2;

function assetSiap() {
    assetDimuat++;
    if (assetDimuat === jumlahAsset) {mulaiGame()};
}

pemain.picture.onload = assetSiap;
latar.picture.onload = assetSiap;

function mulaiGame() {
    requestAnimationFrame(pengulangan)
}

//loop


function terbaruTotal(){
    jumlahnyaMusuh();
    pemain.terbaru();
    peluruTerbaru();
}

function drawTotal(){
    drawing.clearRect(0, 0, canvas.width, canvas.height);
    latar.draw();
    pemain.draw();
    peluruDraw();
    musuhDraw();
    skorDraw();
}

function pengulangan(){
    terbaruTotal();
    drawTotal();
    requestAnimationFrame(pengulangan);
}