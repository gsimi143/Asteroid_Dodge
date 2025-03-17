import { Container, Sprite, Text, Ticker } from "pixi.js";
import { IScene, SceneManager } from "../managers/SceneManager";
import { asteroidCount } from "../constants/gameConstants";

export class Gameplay extends Container implements IScene {
  private spaceship!: Sprite;
  private asteroids: Sprite[] = [];
  private scoreText!: Text;
  private score: number = 0;
  private isGameOver: boolean = false;

  constructor() {
    super();
    this.setupGame();
  }
  resize(screenWidth: number, screenHeight: number): void {
    throw new Error("Method not implemented.");
  }

  private setupGame() {
    this.createSpaceship();
    this.spawnAsteroid();
    this.createScoreText();
    window.addEventListener("keydown", (e) => this.handleInput(e));
  }

  private createSpaceship() {
    this.spaceship = Sprite.from("spaceship");
    this.spaceship.scale.set(0.1, 0.1);
    this.spaceship.anchor.set(0.5);
    this.spaceship.x = SceneManager.width / 2;
    this.spaceship.y = SceneManager.height - this.spaceship.height / 2;
    this.addChild(this.spaceship);
  }

  private createScoreText() {
    this.scoreText = new Text("Score: 0", { fontSize: 24, fill: 0xffffff });
    this.scoreText.x = 10;
    this.scoreText.y = 10;
    this.addChild(this.scoreText);
  }

  private handleInput(event: KeyboardEvent) {
    if (this.isGameOver && event.key === "r") {
      this.restartGame();
    } else if (!this.isGameOver && event.key === "ArrowLeft") {
      this.spaceship.x -= (this.spaceship.x < -20) ? - SceneManager.width + 60 : 50;
    } else if (!this.isGameOver && event.key === "ArrowRight") {
      this.spaceship.x += (this.spaceship.x > SceneManager.width) ? -(SceneManager.width + 60) : 50;
    }
  }

  private spawnAsteroid() {
    for (let i = 0; i < asteroidCount; i++) {
      const asteroid = Sprite.from(`ast${Math.floor(Math.random() * 4) + 1}`);
      const scalingFactorW = 100 / asteroid.width;
      const scalingFactorH = 100 / asteroid.width;
      const scale = Math.min(scalingFactorH, scalingFactorW);
      asteroid.scale.set(scale, scale);
      asteroid.anchor.set(0.5);
      asteroid.x = Math.random() * SceneManager.width;
      asteroid.y = -Math.random() * SceneManager.height;
      this.asteroids.push(asteroid);
      this.addChild(asteroid);
    }
  }

  update(ticker: Ticker) {
    if (this.isGameOver) return;
    this.score += ticker.deltaTime;
    this.scoreText.text = `Score: ${Math.floor(this.score)}`;
    this.asteroids.forEach((asteroid) => {
      asteroid.y += 5 * ticker.deltaTime;
      if (asteroid.y > SceneManager.height) {
        asteroid.y = -50;
        asteroid.x = Math.random() * SceneManager.width;
      }
      if (this.checkCollision(asteroid, this.spaceship)) {
        this.spaceship.rotation += 0.2;
        asteroid.rotation += 0.2;
        this.gameOver();
      }
    });
  }

  private checkCollision(obj1: Sprite, obj2: Sprite): boolean {
    const hit = obj1.x + obj1.width * 0.35 > obj2.x - obj2.width * 0.35 &&
      obj1.x - obj1.width * 0.35 < obj2.x + obj2.width * 0.35 &&
      obj1.y + obj1.height * 0.35 > obj2.y - obj2.height * 0.35 &&
      obj1.y - obj1.height * 0.35 < obj2.y + obj2.height * 0.35;
    return hit;
  }

  private gameOver() {
    this.isGameOver = true;
    this.scoreText.text = `Game Over! Score: ${Math.floor(this.score)}\nPress 'R' to Restart`;
  }

  private restartGame() {
    this.isGameOver = false;
    this.score = 0;
    this.spaceship.rotation = 0;
    this.spaceship.x = SceneManager.width / 2;
    this.asteroids.forEach((asteroid) => {
      asteroid.x = Math.random() * SceneManager.width;
      asteroid.y = -Math.random() * SceneManager.height;
    });
    this.scoreText.text = "Score: 0";
  }

}
