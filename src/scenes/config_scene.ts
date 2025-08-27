import 'phaser'
import BirdGameConfig from '../core/game_config'
import { BaseScene } from './base_scene'
import { GameUserConfiguration } from '../core/game_user_configuration'

export class ConfigScene extends BaseScene {
    
    constructor(config: any) {
        super(BirdGameConfig.SCENE_KEYS.ConfigScene, { ...config, canGoBack: true })


    }

    create() {
        super.create();
        this.user_config = new GameUserConfiguration(this.game)

        const center_screen = BirdGameConfig.getSceneCenter(this)
        const isChecked = this.user_config.get_config()[BirdGameConfig.CONFIG_KEYS.music_is_enabled] ?? false

        const check = document.createElement('input')
        check.type = "checkbox"
        if (isChecked) {
            check.setAttribute('checked','')
        }

        check.id = "enable_music"
        check.style = "height: 25px; width: 25px;background-color: #eee;"


        const label = document.createElement('label')
        label.style.fontFamily = "menu-fnt"
        label.style.verticalAlign = "super"
        label.style.margin = "0 10px 0 0"
        label.setAttribute('for', 'enable_music')
        label.innerText = "Music Enabled"

        let audio_checkbox = this.add.dom(center_screen.x, center_screen.y)
            .createFromHTML(
                label.outerHTML + check.outerHTML
            )
        audio_checkbox.addListener('click')
        audio_checkbox.on('click', (ev: PointerEvent, el: any) => {
            const is_checked = (<any>audio_checkbox.getChildByID('enable_music')).checked;
            this.user_config.set_config(BirdGameConfig.CONFIG_KEYS.music_is_enabled, is_checked)
        })


    }
}