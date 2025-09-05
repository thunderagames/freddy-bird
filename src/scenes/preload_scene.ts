import 'phaser'
import BirdGameConfig from '../core/game_config'
import { GameUserConfiguration } from '../core/game_user_configuration'

export class PreloadScene extends Phaser.Scene {
    user_configuration: GameUserConfiguration

    constructor() {
        super(BirdGameConfig.SCENE_KEYS.PreloadScene)
    }

    preload() {
        const fkeys = BirdGameConfig.FONTS_KEYS
        let fnts = [
            { alias: fkeys.title_fnt, file: 'title-fnt.ttf' },
            { alias: fkeys.score_fnt, file: 'score.ttf' },
        ]
        fnts.forEach(f => {
            let fnt = new FontFace(f.alias, `url(assets/${f.file}`)
            fnt.load().then((lf: any) => {
                document.fonts.add(lf)
            });
        })

        const imgKeys = BirdGameConfig.IMAGE_KEYS


        this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading...', { fontFamily: 'menu-fnt' })
            .setOrigin(0.5)
        this.load.image(imgKeys.sky, 'assets/sky.png')
        this.load.spritesheet(imgKeys.bird, 'assets/birdSprite.png', {
            frameWidth: 16, frameHeight: 16
        })
        this.load.image(imgKeys.pipe, 'assets/pipe.png')
        this.load.image(imgKeys.pause, 'assets/pause.png')
        this.load.image(imgKeys.back, 'assets/back.png')
        this.load.image(imgKeys['clouds1-bkg'], 'assets/clouds1.png')
        this.load.image(imgKeys['clouds2-bkg'], 'assets/clouds2.png')
        this.load.image(imgKeys.tree, 'assets/tree4.png')
        this.load.image(imgKeys.star, 'assets/star.png')
        this.load.json(BirdGameConfig.JSON_KEYS.translations, 'assets/translations.json')
        this.load.json(BirdGameConfig.JSON_KEYS.default_config, 'assets/default_config.json')

        this.load.audio(BirdGameConfig.SOUND_KEYS.MainTheme, 'assets/RoadhouseBlues_out.ogg')

        this.load.on(Phaser.Loader.Events.COMPLETE, () => {
            this.scene.start(BirdGameConfig.SCENE_KEYS.MenuScene)
        })

    }

    create() {
        this.user_configuration = new GameUserConfiguration(this.game)
        const default_config = this.cache.json.get(BirdGameConfig.JSON_KEYS.default_config)
        //console.log(default_config)
        this.user_configuration.set_config(BirdGameConfig.CONFIG_KEYS.music_is_enabled, default_config.music_is_enabled)
        this.user_configuration.set_config(BirdGameConfig.CONFIG_KEYS.lang, default_config.lang)

        this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading...')
    }

}