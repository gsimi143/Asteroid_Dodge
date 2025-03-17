import { Container, Graphics, Assets, Ticker, Text, TextStyle } from "pixi.js";
import { IScene, SceneManager } from "../managers/SceneManager";
import { Gameplay } from "./Gameplay";
import { manifest } from "../constants/assets";
import {
  loaderBarColor,
  loaderBarFillColor,
  loaderBarHeight,
  loaderBarWidthPercent,
} from "../constants/gameConstants";
import { SoundManager } from "../managers/SoundManager";

export class LoaderScene extends Container implements IScene {
  // for making our loader graphics...
  private loaderBar: Container;
  private loaderBarBoder: Graphics;
  private loaderBarFill: Graphics;
  private progressText: Text;

  constructor() {
    super();

    const loaderBarWidth = SceneManager.width * loaderBarWidthPercent;

    this.loaderBarFill = new Graphics()
      .rect(0, 0, loaderBarWidth, loaderBarHeight)
      .fill(loaderBarFillColor);
    this.loaderBarFill.scale.x = 0;

    this.loaderBarBoder = new Graphics()
      .rect(0, 0, loaderBarWidth, loaderBarHeight)
      .stroke({ width: 2, color: loaderBarColor });

    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBoder);
    this.loaderBar.position.set(
      (SceneManager.width - this.loaderBar.width) / 2,
      (SceneManager.height - this.loaderBar.height) / 2
    );

    this.addChild(this.loaderBar);

    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: 24,
      fill: "white", // Text color
      align: "center",
    });
    this.progressText = new Text("0%", style);
    this.progressText.position.set(
      this.loaderBar.position.x + loaderBarWidth / 2,
      this.loaderBar.position.y + loaderBarHeight / 2 - 12
    ); // Position text inside the bar

    this.addChild(this.progressText);
    this.initializeLoader().then(() => {
      this.gameLoaded();
    });
  }

  private async initializeLoader(): Promise<void> {
    await Assets.init({ manifest: manifest });

    const bundleIds = manifest.bundles.map((bundle) => bundle.name);

    await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
  }

  private downloadProgress(progressRatio: number): void {
    this.loaderBarFill.scale.x = progressRatio;
    this.progressText.text = `${Math.round(progressRatio * 100)}%`;
  }

  private gameLoaded(): void {
    // Change scene to the gameplay scene!
    SoundManager.playMusic(SoundManager.currentMusicName, true);
    const gameplay = new Gameplay();
    SceneManager.changeScene(gameplay);
  }

  public update(_ticker: Ticker): void {
    // To be a scene we must have the update method even if we don't use it.
  }

  public resize(_screenWidth: number, _screenHeight: number): void {
    const loaderBarWidth = _screenWidth * loaderBarWidthPercent;

    this.loaderBarBoder
      .clear()
      .rect(0, 0, loaderBarWidth, loaderBarHeight)
      .stroke({ width: 2, color: loaderBarColor });

    this.loaderBarFill.clear().rect(0, 0, loaderBarWidth, loaderBarHeight).fill(loaderBarFillColor);

    this.loaderBar.position.set(
      (_screenWidth - loaderBarWidth) / 2,
      (_screenHeight - loaderBarHeight) / 2
    );

    this.progressText.position.set(
      this.loaderBar.position.x + loaderBarWidth / 2,
      this.loaderBar.position.y + loaderBarHeight / 2 - 12
    );
  }
}
