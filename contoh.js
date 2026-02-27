const canvas = document.getElementById("Game")
const ctx = canvas.getContext("2d")

let gameState = "playing"
let score = 0

const keyboard = { up:false, down:false, left:false, right:false }

window.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") keyboard.up = true
  if (e.key === "ArrowDown") keyboard.down = true
  if (e.key === "ArrowLeft") keyboard.left = true
  if (e.key === "ArrowRight") keyboard.right = true
  if (e.key === "Enter" && gameState === "gameover") resetGame()
})

window.addEventListener("keyup", e => {
  if (e.key === "ArrowUp") keyboard.up = false
  if (e.key === "ArrowDown") keyboard.down = false
  if (e.key === "ArrowLeft") keyboard.left = false
  if (e.key === "ArrowRight") keyboard.right = false
})

/* ================= PLAYER ================= */

class Player {
  constructor() {
    this.w = 50
    this.h = 50
    this.x = canvas.width / 2 - this.w / 2
    this.y = canvas.height - 80
    this.speed = 6
  }

  update() {
    if (keyboard.up) this.y -= this.speed
    if (keyboard.down) this.y += this.speed
    if (keyboard.left) this.x -= this.speed
    if (keyboard.right) this.x += this.speed

    this.clamp()
  }

  clamp() {
    this.x = Math.max(0, Math.min(this.x, canvas.width - this.w))
    this.y = Math.max(0, Math.min(this.y, canvas.height - this.h))
  }

  draw() {
    ctx.fillStyle = "cyan"
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}

/* ================= ENEMY ================= */

class Enemy {
  constructor(x, speed) {
    this.w = 40
    this.h = 40
    this.x = x
    this.y = -40
    this.speed = speed
  }

  update() {
    this.y += this.speed
  }

  draw() {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}

/* ================= SYSTEM ================= */

let player = new Player()
let enemies = []

function spawnEnemy() {
  const x = Math.random() * (canvas.width - 40)
  const speed = 3 + Math.random() * 2
  enemies.push(new Enemy(x, speed))
}

function isColliding(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  )
}

function update() {
  player.update()

  // loop mundur supaya splice aman
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update()

    // kalau musuh lewat bawah
    if (enemies[i].y > canvas.height) {
      score++
      enemies.splice(i, 1)
      spawnEnemy()
      continue
    }

    // collision
    if (isColliding(player, enemies[i])) {
      gameState = "gameover"
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  player.draw()
  enemies.forEach(e => e.draw())

  ctx.fillStyle = "white"
  ctx.font = "20px Arial"
  ctx.fillText("Score: " + score, 10, 30)

  if (gameState === "gameover") {
    ctx.fillStyle = "yellow"
    ctx.font = "40px Arial"
    ctx.fillText("GAME OVER", canvas.width / 2 - 130, canvas.height / 2)
    ctx.font = "20px Arial"
    ctx.fillText("Press Enter to Restart", canvas.width / 2 - 110, canvas.height / 2 + 40)
  }
}

function resetGame() {
  score = 0
  enemies = []
  player = new Player()
  spawnEnemy()
  gameState = "playing"
}

function loop() {
  if (gameState === "playing") {
    update()
  }
  draw()
  requestAnimationFrame(loop)
}

/* ================= START ================= */

spawnEnemy()
loop()