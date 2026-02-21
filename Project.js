const canvas = document.getElementById('Game')
const menggambar = canvas.getContext('2d')

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

const pemain = {
    x: 100,
    y: 100,
    w: 100,
    h: 100,
    gambar: new Image(),
    load() {
        this.gambar.src = 'asset/PNG/playerShip1_blue.png';
        this.gambar.onload = () => {
            ulangin();
        };
    },
    gambarin(){
        menggambar.drawImage(this.gambar, this.x, this.y, this.w, this.h);
}
};

function terbaru (){
    if (keyboard.up) pemain.y -= 1;
    if (keyboard.down) pemain.y += 1;
    if (keyboard.right) pemain.x += 1;
    if (keyboard.left) pemain.x -= 1;
    
}

function hapusLagi (){
    menggambar.clearRect(0,0, canvas.width, canvas.height)
    pemain.gambarin()
}

function ulangin (){
    terbaru()
    hapusLagi()
    requestAnimationFrame(ulangin)
}

pemain.load()


