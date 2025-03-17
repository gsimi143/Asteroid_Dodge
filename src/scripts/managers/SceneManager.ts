import { Application, Container, Renderer, Ticker } from "pixi.js";

export class SceneManager {
  private constructor() {
    /*this class is purely static.*/
  }

  // Safely store variables for our game
  private static app: Application;
  private static currentScene: IScene;

  // With getters but not setters, these variables become read-only
  public static get width(): number {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
  public static get height(): number {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  // Use this function ONCE to start the entire machinery
  public static async initialize(background: number) {
    // Create our pixi app
    SceneManager.app = new Application<Renderer<HTMLCanvasElement>>();

    await SceneManager.app.init({
      canvas: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      resizeTo: window,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
      hello: true,
    });

    SceneManager.app.ticker.add(SceneManager.update);
    window.addEventListener("resize", SceneManager.resize);
  }
  public static resize(): void {
    const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    const scale = Math.min(screenWidth / SceneManager.width, screenHeight / SceneManager.height);

    const enlargedWidth = Math.floor(scale * SceneManager.width);
    const enlargedHeight = Math.floor(scale * SceneManager.height);

    const horizontalMargin = (screenWidth - enlargedWidth) / 2;
    const verticalMargin = (screenHeight - enlargedHeight) / 2;

    //css trickery to set the sizes and margins
    SceneManager.app.view.style.width = `${enlargedWidth}px`;
    SceneManager.app.view.style.height = `${enlargedHeight}px`;
    SceneManager.app.view.style.marginLeft =
      SceneManager.app.view.style.marginRight = `${horizontalMargin}px`;
    SceneManager.app.view.style.marginTop =
      SceneManager.app.view.style.marginBottom = `${verticalMargin}px`;

    if (SceneManager.currentScene) {
      SceneManager.currentScene.resize(SceneManager.width, SceneManager.height);
    }
  }

  // Call this function when you want to go to a new scene
  public static changeScene(newScene: IScene): void {
    if (SceneManager.currentScene) {
      SceneManager.app.stage.removeChild(SceneManager.currentScene);
      SceneManager.currentScene.destroy();
    }
    SceneManager.currentScene = newScene;
    SceneManager.app.stage.addChild(SceneManager.currentScene);
  }

  // This update will be called by a Pixi ticker and tell the scene that a tick happened
  private static update(ticker: Ticker): void {
    if (SceneManager.currentScene) {
      SceneManager.currentScene.update(ticker);
    }
  }

  static get AppTicker() {
    return SceneManager.app.ticker;
  }
}

// This could have a lot more generic functions that you force all your scenes to have.
export interface IScene extends Container {
  update(ticker: Ticker): void;
  resize(screenWidth: number, screenHeight: number): void;
}
