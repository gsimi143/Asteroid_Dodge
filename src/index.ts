import { backgroundColor } from "./scripts/constants/gameConstants";
import { DatGuiManager } from "./scripts/managers/DatGuiManager";
import { SceneManager } from "./scripts/managers/SceneManager";
import { LoaderScene } from "./scripts/Scene/LoaderScene";
import { SoundManager } from "./scripts/managers/SoundManager";

SceneManager.initialize(backgroundColor);
DatGuiManager.initialize();
SoundManager.initialize();
const load: LoaderScene = new LoaderScene();
SceneManager.changeScene(load);
