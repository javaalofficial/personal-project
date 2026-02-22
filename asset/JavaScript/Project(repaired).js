const canvas = document.getElementById('Game');
const drawing = canvas.getContext('2d');

//movement

const click = {left: false, right: false, up: false, down: false};

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') click.up = true;
    if (e.key === 'ArrowDown') click.down = true;
    if (e.key === 'ArrowRight') click.right = true;
    if (e.key === 'ArrowLeft') click.left = true;
})
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') click.up = false;
    if (e.key === 'ArrowDown') click.down = false;
    if (e.key === 'ArrowRight') click.right = false;
    if (e.key === 'ArrowLeft') click.left = false;
})

//pemain

class Pemain {
    constructor(call){
        this.w = 50;
        this.h = 50;
        this.x = canvas.width / 2 - this.w / 2;
        this.y = canvas.height - this.h;
        this.speed = 5;
        this.direction = 1;
        this.picture = new Image();
        this.picture.src = 'asset/PNG/playerShip1_blue.png'
        this.picture.onload = call;
    };

// update

    terbaru(){
        if (click.up) this.y -= (this.speed*this.direction);
        if (click.down) this.y += (this.speed*this.direction);
        if (click.right) this.x += (this.speed*this.direction);
        if (click.left) this.x -= (this.speed*this.direction);

        this.clamp()
    };

    clamp(){
        if (this.x < 0) this.x = 0;
        if (this.x + this.w > canvas.width) this.x = canvas.width - this.w;
        if (this.y < 0) this.y = 0;
        if (this.y + this.h > canvas.height) this.y = canvas.height - this.h;
    };

    draw() {
        drawing.drawImage(this.picture, this.x, this.y, this.w, this.h)
    }
}

//latar

const latar = {
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height,
    load(){
    this.picture = new Image();

    this.picture.src = 'asset/Backgrounds/blue.png'
        this.picture.onload = () => {
        pengulangan();
    };
    },
    draw() {
        drawing.drawImage(this.picture, this.x, this.y, this.w, this.h);
    }
}

let ulang = false;

function pengulangan(){
    if (!ulang) ulang = true;
    drawing.clearRect(0, 0, canvas.width, canvas.height);
    latar.load();  
    pemain.terbaru();
    pemain.draw();
    requestAnimationFrame(pengulangan);
}

let pemain = new Pemain(pengulangan);
