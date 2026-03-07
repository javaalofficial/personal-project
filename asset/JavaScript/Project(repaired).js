const canvas = document.getElementById('Game');
/** @type {CanvasRenderingContext2D}*/
const drawing = canvas.getContext('2d');


//movement

const click = {left: false, right: false, up: false, down: false};

window.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', ' ', 'Enter'].includes(e.key)){e.preventDefault()}
    if (MAINMENU) mainMenu();
    if (e.key === 'Enter') click.enter = true;
    if (e.key === 'ArrowUp') click.up = true;
    if (e.key === 'ArrowDown') click.down = true;
    if (e.key === 'ArrowRight') click.right = true;
    if (e.key === 'ArrowLeft') click.left = true;
    if (e.key === ' ') {jumlahPeluru.push(new Peluru(pemain.x + pemain.w /2 - 2.5, pemain.y));if(GAME)Stembak()}

})
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') click.up = false;
    if (e.key === 'ArrowDown') click.down = false;
    if (e.key === 'ArrowRight') click.right = false;
    if (e.key === 'ArrowLeft') click.left = false;
    if (e.key === 'Enter') click.enter = false;
})


//---------------OBJECT

//Player

class Pemain {
    constructor(){
        this.w = 50;
        this.h = 50;
        this.x = canvas.width / 2 - this.w / 2;
        this.y = canvas.height - this.h;
        this.speed = 10;
        this.picture = new Image();
        this.picture.src = 'asset/PNG/playerShip1_blue.png';
        this.pictureDamaged1 = new Image()
        this.pictureDamaged1.src = 'asset/PNG/Damage/playerShip1_damage1.png'
        this.pictureDamaged2 = new Image()
        this.pictureDamaged2.src = 'asset/PNG/Damage/playerShip1_damage3.png'
        this.waktuKebal = 0;
        this.kondisi = 0;
        this.mutar = 0;
    };

    // update

    terbaru(){
        if (click.up) this.y -= this.speed;
        if (click.down) this.y += this.speed;
        if (click.right) this.x += this.speed;
        if (click.left) this.x -= this.speed;
        if (this.waktuKebal > 0) this.waktuKebal--;
        if (nyawa > 3) this.kondisi = 0;
        if (nyawa === 3) this.kondisi = 1;
        if (nyawa === 1) this.kondisi = 2;
        if (click.right) this.mutar = 40;
        if (click.left) this.mutar = -40
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
    // putaran(){
    // drawing.save();
    // drawing.translate(this.x,this.y)
    // this.x = drawing.rotate(this.mutar * Math.PI / 180)
    // drawing.restore()
    // }
    basic(){
        drawing.drawImage(this.picture, this.x, this.y, this.w, this.h)
    }
    damaged1(){
        drawing.drawImage(this.pictureDamaged1, this.x, this.y, this.w, this.h)
    }
    damaged2(){
        drawing.drawImage(this.pictureDamaged2, this.x, this.y, this.w, this.h)
    }

    draw() {
        if (this.waktuKebal > 0 && this.waktuKebal % 10 < 5) {
            return;
        };
        this.basic()
        if (this.kondisi === 1)
        this.damaged1()
        if (this.kondisi === 2)
        this.damaged2()

    };
};

//bullet

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
        this.x += Math.sin(Math.sin(Math.floor(Math.random() * 10 - 2) + this.y) * 2) * 5
    }
    draw(){
        drawing.drawImage(this.picture, this.x, this.y, this.w, this.h)
    }
}

//enemy

class Musuh{
    constructor(){
        this.h = 20;
        this.w = 20;
        this.y = -this.h;
        this.speed = Math.random() * 10 + 3;
        this.picture = new Image();
        this.picture.src = 'asset/PNG/Enemies/enemyBlack1.png'
        const jumlahJalur = 5;
        const lebarJalur = canvas.width / jumlahJalur
        const nomorJalur = Math.floor(Math.random() * jumlahJalur)
        this.tengahJalur = (nomorJalur * lebarJalur) + (lebarJalur/2) - this.w/2
        this.x = this.tengahJalur
    }
    terbaru(){
        this.y += this.speed
       this.x = this.tengahJalur + Math.sin(this.y * 0.05) * 100 ;
    }
    draw(){
        drawing.drawImage(this.picture, this.x, this.y, this.w, this.h)
    }
}

//Background

const latar = {

    x: 0,
    y1: 0,
    y2: -canvas.height,
    w: canvas.width,
    h: canvas.height,
    picture: new Image(),
    speed:3,

    terbaru(){
        this.y1 += this.speed
        this.y2 += this.speed

        if (this.y1 >= canvas.height)
            this.y1 = this.y2 - canvas.height

        if (this.y2 >= canvas.height)
            this.y2 = this.y1 - canvas.height
    },

    draw() {
    drawing.drawImage(this.picture, this.x, this.y1, this.w, this.h)
    drawing.drawImage(this.picture, this.x, this.y2, this.w, this.h)
    },
};

latar.picture.src = 'asset/Backgrounds/blue.png';

//-------------------------instance
let MAINMENU = true;
let GAME = false;
let nyawa = 5;
let jumlahPeluru = [];
let pemain = new Pemain();
let musuh = new Musuh();
let jumlahMusuh = [];
let skorPemain = 0;

//------------------------------- Audio

let suaraLedakan = new Audio('asset/sound/sfx_zap.ogg')
let suaraTembak = new Audio('asset/sound/sfx_laser1.ogg');
function Stembak() {
    suaraTembak.currentTime = 0
    suaraTembak.play()
}

//------------------------------- FUNCTION

//ObjectCrash

function nabrak(peluru, objek) {

    return (
        peluru.x < objek.x + objek.w &&
        peluru.x + peluru.w > objek.x &&
        peluru.y < objek.y + objek.h &&
        peluru.y + peluru.h > objek.y
       
    )
}

//enemy

function jumlahnyaMusuh() {

    if (Math.random() < 0.1)
         jumlahMusuh.push(new Musuh())

    for (let m = jumlahMusuh.length - 1; m >= 0; m--){
        let musuh = jumlahMusuh[m];
        musuh.terbaru();

        if (nabrak(pemain, musuh)){
            if (pemain.waktuKebal <= 0){
            nyawa -= 1;
            pemain.waktuKebal = 180
        }
            jumlahMusuh.splice(m, 1);
            if (nyawa <= 0){
                GAME = false;
                alert ('game over, skormu = ' + skorPemain);
                resetGame();
                GAME = true;
                return;
            }
        } else if (jumlahMusuh[m].y > canvas.height){
            jumlahMusuh.splice(m, 1)
            skorPemain += 10;            
        }  
    }
}

function musuhdraw(){

    for (let musuh of jumlahMusuh)
        musuh.draw()
}

//bullet

function peluruTerbaru(){

for (let p = jumlahPeluru.length - 1; p >= 0; p--){
    let peluruBaru = jumlahPeluru[p]
    peluruBaru.terbaru()

    for (let m = jumlahMusuh.length - 1; m >= 0; m--){
        let musuh = jumlahMusuh[m]

        if (nabrak(peluruBaru, musuh)){
            console.log('musuh Tertembak!');
            jumlahMusuh.splice(m, 1)
            jumlahPeluru.splice(p, 1)
            skorPemain += 100;
            suaraLedakan.currentTime = 0
            suaraLedakan.play()
            break;
        }
    }
        if (jumlahPeluru[p] && peluruBaru.h + peluruBaru.y < 0){
        jumlahPeluru.splice(p, 1);
        }
    }
}

function pelurudraw(){

    for (let peluruIni of jumlahPeluru){
        peluruIni.draw();
    }

}


//scor

function skordraw(){
    drawing.textAlign = 'left'
    drawing.fillStyle = 'white';
    drawing.font = '24px arial';
    drawing.fillText ('skor = ' + skorPemain, 20, 30);
    drawing.fillText ('nyawamu = ' + nyawa, 20, 60)
    drawing.fillText ('By: Java Al Khawarizmi', 20, 90)

    drawing.fillStyle = 'gray'
    drawing.font = '15px arial'
    drawing.fillText ('move = ◀🔼▶🔽 shoot = x', 20,120 )
}

//mainMenu

function mainMenu(){
    drawing.fillStyle = 'white';
    drawing.fillRect(0, canvas.height/2 - 30, canvas.width, 35)
    
    drawing.fillStyle = 'black';
    drawing.font = '30px arial'
    drawing.textAlign = 'center'
    drawing.fillText('klik enter untuk memulai!', canvas.width/2 , canvas.height/2)
    if(click.enter){
        GAME = true;
        MAINMENU = false;
    }
}

//Reset

function resetGame(){
    console.log('reset terpanggil!!!');
    drawing.clearRect(0,0, canvas.width, canvas.height)
    skorPemain = 0;
    nyawa = 5;
    jumlahPeluru = [];
    jumlahMusuh = []
    pemain.x = canvas.width / 2 - pemain.w / 2;
    pemain.y = canvas.height - pemain.h;
    click.up = false;
    click.down = false;
    click.right = false;
    click.left = false;
    MAINMENU = true;
    GAME = false;
    pemain.waktuKebal = 0
}

//Asset

let assetDimuat = 0;
const jumlahAsset = 3;

function assetSiap() {
    assetDimuat++;
    if (assetDimuat === jumlahAsset) {mulaiGame()};
}

pemain.picture.onload = assetSiap;
pemain.pictureDamaged1.onload = assetSiap;
latar.picture.onload = assetSiap;

function mulaiGame() {
    requestAnimationFrame(pengulangan)
}

function menuAktif(){
    if (MAINMENU) {
        mainMenu()
    } 
}

//loop


function terbaruTotal(){
    latar.terbaru()
if (MAINMENU){
    mainMenu()
}
else if (GAME){
    jumlahnyaMusuh();
    pemain.terbaru();
    peluruTerbaru();
}
}

function drawTotal(){

    drawing.clearRect(0, 0, canvas.width, canvas.height);
    latar.draw();
    menuAktif()
    pemain.draw();
    pelurudraw();
    musuhdraw();
    skordraw();
}

function pengulangan(){
    terbaruTotal();
    drawTotal();
    requestAnimationFrame(pengulangan);

}