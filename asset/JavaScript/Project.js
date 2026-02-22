const canvas = document.getElementById('Game')
const menggambar = canvas.getContext('2d')

//gerak dasar pemain

const keyboard = { up: false, down: false, right: false, left: false, shoot: false, dodge: false};

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp')  keyboard.up = true;
    if (e.key === 'ArrowDown') keyboard.down = true;
    if (e.key === 'ArrowRight') keyboard.right = true;
    if (e.key === 'ArrowLeft') keyboard.left = true;
    if (e.key === ' ') keyboard.shoot = true;
    if (e.key === 'Alt') keyboard.dodge = true; 
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp')  keyboard.up = false;
    if (e.key === 'ArrowDown') keyboard.down = false;
    if (e.key === 'ArrowRight') keyboard.right = false;
    if (e.key === 'ArrowLeft') keyboard.left = false;
    if (e.key === ' ') keyboard.shoot = false;
    if (e.key === 'Alt') keyboard.dodge = false; 
});

// obyek

const latar = {
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height,
    gambar: new Image(),
    load() {
        this.gambar.src = 'asset/Backgrounds/black.png';
        this.gambar.onload = () => {
            ulangin();
        };
    },
    gambarin(){
        menggambar.drawImage(this.gambar, this.x, this.y, this.w, this.h);
}
};

const pemain = {
    x: 100,
    y: 100,
    w: 50,
    h: 50,
    gambar: new Image(),
    load() {
        this.gambar.src = 'asset/PNG/playerShip1_blue.png';
        this.gambar.onload = () => {
            ulangin();
        };
    },
    gambarin(){
        menggambar.drawImage(this.gambar, this.x, this.y, this.w, this.h);
    },
    clamp(){
        if (this.x < 0) this.x = 0;
        if (this.x + this.w > canvas.width) this.x = canvas.width - this.w;
        if (this.y < 0) this.y = 0;
        if (this.y + this.w > canvas.height) this.y = canvas.height - this.w;
    }

};

//update

function terbaru (){
    if (keyboard.up) pemain.y -= 10;
    if (keyboard.down) pemain.y += 10;
    if (keyboard.right) pemain.x += 10;
    if (keyboard.left) pemain.x -= 10;

    pemain.clamp()
}


// loop

function hapusLagi (){
    menggambar.clearRect(0,0, canvas.width, canvas.height)
    latar.gambarin()
    pemain.gambarin()
}

function ulangin (){
    terbaru()
    hapusLagi()
    requestAnimationFrame(ulangin)
}

//menjalankan object

pemain.load()
latar.load()


