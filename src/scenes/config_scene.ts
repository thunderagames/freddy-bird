import 'phaser'
import BirdGameConfig from '../core/game_config'
import { BaseScene } from './base_scene'
import { GameUserConfiguration } from '../core/game_user_configuration'

export class ConfigScene extends BaseScene {
    center_screen: { x: number; y: number }
    checkbox_style = "height: 25px; width: 25px;background-color: #eee;"
    constructor(config: any) {
        super(BirdGameConfig.SCENE_KEYS.ConfigScene, { ...config, canGoBack: true })


    }

    create() {
        this.center_screen = BirdGameConfig.getSceneCenter(this)
        super.create();
        this.user_config = new GameUserConfiguration(this.game)
        this.createMusicConfig()

        let lang_setting = document.createElement('span');
        const lbl = document.createElement('label')
        lbl.innerText = "Language: "
        lbl.style.fontFamily = "menu-fnt"
        lbl.setAttribute('for', 'set_lang')

        const chk_en = document.createElement('input')
        chk_en.type = "checkbox"
        chk_en.id = "chk_en"
        chk_en.style = this.checkbox_style

        const chk_es = document.createElement('input')
        chk_es.type = "checkbox"
        chk_es.id = "chk_es"
        chk_es.style = this.checkbox_style


        lang_setting.append(lbl, chk_en, chk_es)

        let lang_setting_dom = this.add.dom(this.center_screen.x, this.center_screen.y)
            .createFromHTML(
                lang_setting.outerHTML
            )
    }

    private createMusicConfig(): void {
        const isChecked = this.user_config.get_config()[BirdGameConfig.CONFIG_KEYS.music_is_enabled] ?? false

        const check = document.createElement('input')
        check.type = "checkbox"
        if (isChecked) {
            check.setAttribute('checked', '')
        }

        check.id = "enable_music"
        check.style = this.checkbox_style


        const label = document.createElement('label')
        label.style.fontFamily = "menu-fnt"
        label.style.verticalAlign = "super"
        label.style.margin = "0 10px 0 0"
        label.setAttribute('for', 'enable_music')
        label.innerText = "Music Enabled: "

        let audio_checkbox = this.add.dom(this.center_screen.x, this.center_screen.y / 2)
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