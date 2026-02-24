const canvas = document.getElementById('Game');
const drawing = canvas.getContext('2d');

//movement

const click = {left: false, right: false, up: false, down: false};

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') click.up = true;
    if (e.key === 'ArrowDown') click.down = true;
    if (e.key === 'ArrowRight') click.right = true;
    if (e.key === 'ArrowLeft') click.left = true;
    if (e.key === ' ') {jumlahPeluru.push( new Peluru(pemain.x + pemain.w /2 - peluru.w /2, pemain.y))}
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
        this.speed = 5;
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
        this.h = 10;
        this.speed = 8;
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
let peluru = new Peluru;
let jumlahPeluru = [];
let pemain = new Pemain();

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
for (let i = jumlahPeluru.length - 1; i >= 0; i--){
            jumlahPeluru[i].terbaru();
        };
        if (peluru.h + peluru.y > 0){
        jumlahPeluru.splice(i, 1);
        }
    }
function peluruDraw(){
    for (let peluruIni of jumlahPeluru){
        peluruIni.draw();
    }
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
    pemain.terbaru();
    peluruTerbaru();
    // peluruNabrak();
}

function drawTotal(){
    drawing.clearRect(0, 0, canvas.width, canvas.height);
    latar.draw();
    pemain.draw();
    peluruDraw();
}

function pengulangan(){
    terbaruTotal();
    drawTotal();
    // drawing.clearRect(0, 0, canvas.width, canvas.height);
    // latar.draw();
    // pemain.terbaru();
    // pemain.draw();

    // for (let i = jumlahPeluru.length - 1; i >= 0; i--) {
    //     const peluru = jumlahPeluru[i];
    
    // peluru.terbaru();
    // peluru.draw();

    // if (peluru.y < 0) {
    //     jumlahPeluru.splice(i, 1);
    // }
    // }

    requestAnimationFrame(pengulangan);
}