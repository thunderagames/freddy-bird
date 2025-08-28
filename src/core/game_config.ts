import { SaveScoreScene } from "../scenes/save_score_scene"
import { MenuScene } from "../scenes/menu_scene/menu_scene"
import { PauseScene } from "../scenes/pause_scene"
import { PlayScene } from "../scenes/play_scene/play_scene"
import { PreloadScene } from "../scenes/preload_scene"
import ScoreScene from "../scenes/score_scene"
import { ConfigScene } from "../scenes/config_scene"

export default class BirdGameConfig {
    static WIDTH = 400
    static HEIGHT = 600
    static BIRD_POSITION = { x: BirdGameConfig.WIDTH * 0.1, y: BirdGameConfig.HEIGHT / 2 }
    static STORAGE_KEY = 'bestScoreKey'

    static CONFIG_KEYS = {
        'music_is_enabled': 'music_is_enabled',
        'lang': 'lang'
    }

    static LANGUAGES = {
        'en': 'en',
        'es': 'es'
    }

    static TRANSLATION_KEYS = {
        "MenuScene": {
            'play': 'play',
            'score': 'score',
            'configuration': 'configuration',
            'game_title': 'game_title',
            'footer': 'footer'
        }
    }

    static FONTS_KEYS = {
        'title_fnt': 'title-fnt',
        'score_fnt': 'score-fnt'
    }

    static JSON_KEYS = {
        'translations': 'translations'
    }

    static SCENE_KEYS = {
        'MenuScene': 'MenuScene',
        'PreloadScene': 'PreloadScene',
        'ScoreScene': 'ScoreScene',
        'PlayScene': 'PlayScene',
        'PauseScene': 'PauseScene',
        'SaveScoreScene': 'SaveScoreScene',
        'ConfigScene': 'ConfigScene'
    }

    static SOUND_KEYS = {
        'MainTheme': 'menu-song',

    }

    static ANIMS_KEYS = {
        'fly': 'fly',
        'eat': 'eat'
    }

    static IMAGE_KEYS = {
        'pipe': 'pipe',
        'pause': 'pause',
        'back': 'back',
        'clouds1-bkg': 'clouds1-bkg',
        'clouds2-bkg': 'clouds2-bkg',
        'tree': 'tree',
        'bird': 'bird',
        'sky': 'sky'
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
        let Scenes = [PreloadScene, MenuScene, PlayScene, PauseScene, ScoreScene, SaveScoreScene, ConfigScene]
        return Scenes.map(BirdGameConfig.createScene)
    }

    static getSceneCenter(scene: Phaser.Scene) {
        const x = scene.game.scale.width / 2
        const y = scene.game.scale.height / 2

        return { x, y }
    }
}