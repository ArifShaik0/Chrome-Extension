class SpaceShooter {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.score = 0;
    this.lives = 3;
    this.gameRunning = true;
    
    this.player = {
      x: this.canvas.width / 2 - 15,
      y: this.canvas.height - 50,
      width: 30,
      height: 30,
      speed: 5
    };
    
    this.bullets = [];
    this.enemies = [];
    this.stars = [];
    
    this.keys = {};
    this.lastEnemySpawn = 0;
    this.enemySpawnRate = 1000;
    
    this.init();
  }
  
  init() {
    this.createStars();
    this.bindEvents();
    this.gameLoop();
  }
  
  createStars() {
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        speed: Math.random() * 2 + 1
      });
    }
  }
  
  bindEvents() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'Space') {
        e.preventDefault();
        this.shoot();
      }
    });
    
    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }
  
  shoot() {
    this.bullets.push({
      x: this.player.x + this.player.width / 2 - 2,
      y: this.player.y,
      width: 4,
      height: 10,
      speed: 7
    });
  }
  
  spawnEnemy() {
    this.enemies.push({
      x: Math.random() * (this.canvas.width - 30),
      y: -30,
      width: 30,
      height: 30,
      speed: Math.random() * 3 + 2
    });
  }
  
  update() {
    if (!this.gameRunning) return;
    
    // Move player
    if (this.keys['ArrowLeft'] && this.player.x > 0) {
      this.player.x -= this.player.speed;
    }
    if (this.keys['ArrowRight'] && this.player.x < this.canvas.width - this.player.width) {
      this.player.x += this.player.speed;
    }
    if (this.keys['ArrowUp'] && this.player.y > 0) {
      this.player.y -= this.player.speed;
    }
    if (this.keys['ArrowDown'] && this.player.y < this.canvas.height - this.player.height) {
      this.player.y += this.player.speed;
    }
    
    // Update stars
    this.stars.forEach(star => {
      star.y += star.speed;
      if (star.y > this.canvas.height) {
        star.y = 0;
        star.x = Math.random() * this.canvas.width;
      }
    });
    
    // Update bullets
    this.bullets = this.bullets.filter(bullet => {
      bullet.y -= bullet.speed;
      return bullet.y > 0;
    });
    
    // Spawn enemies
    const now = Date.now();
    if (now - this.lastEnemySpawn > this.enemySpawnRate) {
      this.spawnEnemy();
      this.lastEnemySpawn = now;
      this.enemySpawnRate = Math.max(500, this.enemySpawnRate - 10);
    }
    
    // Update enemies
    this.enemies = this.enemies.filter(enemy => {
      enemy.y += enemy.speed;
      return enemy.y < this.canvas.height + 30;
    });
    
    // Check collisions
    this.checkCollisions();
    
    // Update UI
    document.getElementById('score').textContent = this.score;
    document.getElementById('lives').textContent = this.lives;
  }
  
  checkCollisions() {
    // Bullet-enemy collisions
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        if (this.isColliding(this.bullets[i], this.enemies[j])) {
          this.bullets.splice(i, 1);
          this.enemies.splice(j, 1);
          this.score += 10;
          break;
        }
      }
    }
    
    // Player-enemy collisions
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      if (this.isColliding(this.player, this.enemies[i])) {
        this.enemies.splice(i, 1);
        this.lives--;
        if (this.lives <= 0) {
          this.gameOver();
        }
      }
    }
  }
  
  isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }
  
  draw() {
    // Clear canvas
    this.ctx.fillStyle = 'rgba(0, 4, 40, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw stars
    this.ctx.fillStyle = 'white';
    this.stars.forEach(star => {
      this.ctx.fillRect(star.x, star.y, 1, 1);
    });
    
    // Draw player
    this.ctx.fillStyle = '#00ff00';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    
    // Draw bullets
    this.ctx.fillStyle = '#ffff00';
    this.bullets.forEach(bullet => {
      this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    // Draw enemies
    this.ctx.fillStyle = '#ff0000';
    this.enemies.forEach(enemy => {
      this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
  }
  
  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
  
  gameOver() {
    this.gameRunning = false;
    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('gameOver').style.display = 'block';
  }
  
  restart() {
    this.score = 0;
    this.lives = 3;
    this.gameRunning = true;
    this.bullets = [];
    this.enemies = [];
    this.player.x = this.canvas.width / 2 - 15;
    this.player.y = this.canvas.height - 50;
    this.lastEnemySpawn = 0;
    this.enemySpawnRate = 1000;
    document.getElementById('gameOver').style.display = 'none';
  }
}

let game;

// Start the game when popup opens
document.addEventListener('DOMContentLoaded', () => {
  game = new SpaceShooter();
  
  // Add event listener for restart button
  document.getElementById('restartBtn').addEventListener('click', () => {
    game.restart();
  });
});