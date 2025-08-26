import { SaveScoreScene } from "../scenes/save_score_scene"
import { MenuScene } from "../scenes/menu_scene"
import { PauseScene } from "../scenes/pause_scene"
import { PlayScene } from "../scenes/play_scene/play_scene"
import { PreloadScene } from "../scenes/preload_scene"
import ScoreScene from "../scenes/score_scene"

export default class BirdGameConfig {
    static WIDTH = 400
    static HEIGHT = 600
    static BIRD_POSITION = { x: BirdGameConfig.WIDTH * 0.1, y: BirdGameConfig.HEIGHT / 2 }
    static STORAGE_KEY = 'bestScoreKey'

    static SCENE_KEYS = {
        'MenuScene': 'MenuScene',
        'PreloadScene': 'PreloadScene',
        'ScoreScene': 'ScoreScene',
        'PlayScene': 'PlayScene',
        'PauseScene': 'PauseScene',
        'SaveScoreScene': 'SaveScoreScene'
    }

    static DIFICULTIES = {
        'easy': 'easy',
        'normal': 'normal',
        'hard': 'hard'
    }

    static createScene(scene: any): Phaser.Scene {
        return new scene({
            width: BirdGameConfig.WIDTH,
            height: BirdGameConfig.HEIGHT
        })
    }

    static initScenes() {
        let Scenes = [PreloadScene, MenuScene, PlayScene, PauseScene, ScoreScene, SaveScoreScene]
        return Scenes.map(BirdGameConfig.createScene)
    }
}