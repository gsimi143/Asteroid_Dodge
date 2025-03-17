import { sound } from "@pixi/sound";
import { Assets } from "pixi.js";
import { DatGuiManager } from "./DatGuiManager";

export class SoundManager {
  private constructor() { }

  public static isSFXPlaying: boolean = true;
  public static isMusicPlaying: boolean = true;
  public static currentMusicName: string = "gameplayMusic";

  public static initialize() {
    this.isMusicPlaying = true;
    this.isSFXPlaying = true;
    SoundManager.addSoundControls();
  }

  public static playMusic(name: string, loop: boolean = true): void {
    if (SoundManager.isMusicPlaying) {
      const asset = Assets.get(name);
      if (asset) {
        this.currentMusicName = name;
        sound.play(name, { loop });
      } else {
        console.error(`Asset ${name} is not loaded.`);
      }
    }
  }

  public static stopMusic(name: string): void {
    sound.stop(name);
  }

  public static playSFX(name: string): void {
    if (SoundManager.isSFXPlaying) {
      const asset = Assets.get(name);
      if (asset) {
        sound.play(name);
      } else {
        console.error(`Asset ${name} is not loaded.`);
      }
    }
  }

  private static addSoundControls(): void {
    if (!DatGuiManager.GUI) {
      console.error(
        "DatGuiManager has not been initialized. Call DatGuiManager.initialize() first."
      );
      return;
    }
    const soundFolder = DatGuiManager.addFolder("Sound Controls");
    if (soundFolder) {
      soundFolder
        .add(SoundManager, "isMusicPlaying")
        .name("Stop Music")
        .onChange((value: boolean) => {
          if (!value) {
            SoundManager.stopMusic(this.currentMusicName);
          } else {
            SoundManager.playMusic(this.currentMusicName, true);
          }
        });
      soundFolder
        .add(SoundManager, "isSFXPlaying")
        .name("Stop SFX")
        .onChange((value: boolean) => {
        });
    } else {
      console.error("Failed to create 'Sound Controls' folder. Dat.GUI is not initialized.");
    }
  }
}
