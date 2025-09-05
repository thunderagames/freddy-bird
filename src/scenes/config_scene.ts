import 'phaser'
import BirdGameConfig from '../core/game_config'
import { BaseScene } from './base_scene'
import { GameUserConfiguration } from '../core/game_user_configuration'
import { LangManager } from '../core/lang_manage'

export class ConfigScene extends BaseScene {
    center_screen: { x: number; y: number }
    checkbox_style = "height: 25px; width: 25px;background-color: #eee;"
    langManager: LangManager


    constructor(config: any) {
        super(BirdGameConfig.SCENE_KEYS.ConfigScene, { ...config, canGoBack: true })
    }

    create() {

        this.langManager = new LangManager(this)
        this.center_screen = BirdGameConfig.getSceneCenter(this)
        super.create();
        this.user_config = new GameUserConfiguration(this.game)
        const x_pos = this.center_screen.x
        let y_pos = 200
        const vertical_space = 80
        this.createMusicConfig(x_pos, y_pos)
        y_pos += vertical_space
        this.createLangConfig(x_pos, y_pos)

    }

    private getText(key: string) {
        return this.langManager.get_translation(BirdGameConfig.SCENE_KEYS.ConfigScene, key)
    }

    private createLangConfig(x_pos: number, y_pos: number) {
        let lang_setting = document.createElement('span');
        const lbl = document.createElement('label')
        lbl.innerText = `${this.getText('lang')}: `
        lbl.style.fontFamily = BirdGameConfig.FONTS_KEYS.menu_fnt
        lbl.setAttribute('for', 'set_lang')

        const cl = new GameUserConfiguration(this.game).get_config()[BirdGameConfig.CONFIG_KEYS.lang]
        const chk_en = document.createElement('input')
        chk_en.type = "checkbox"
        chk_en.id = "chk_en"
        chk_en.style = this.checkbox_style

        if (cl == 'en') {
            chk_en.setAttribute('checked', '')
        }

        const chk_es = document.createElement('input')
        chk_es.type = "checkbox"
        chk_es.id = "chk_es"
        chk_es.style = this.checkbox_style
        if (cl == 'es') {
            chk_es.setAttribute('checked', '')
        }


        lang_setting.append(lbl, chk_en, chk_es)

        let lang_setting_dom = this.add.dom(x_pos, y_pos)
            .createFromHTML(
                lang_setting.outerHTML
            )

        const lang_label_x = lang_setting_dom.x + 45
        const lang_label_y = lang_setting_dom.y - 30
        this.add.text(lang_label_x, lang_label_y, 'Eng Esp', {
            fontFamily: 'menu-fnt',
            fontSize: 10
        })
            .setOrigin(0, 0)
        lang_setting_dom.addListener('click')
        lang_setting_dom.getChildByID('chk_en')?.addEventListener('click', (e) => {
            const ch2 = (<any>e.target).parentElement.querySelector('#chk_es')
            ch2.checked = false
            this.user_config.set_config(BirdGameConfig.CONFIG_KEYS.lang, 'en')
        })

        lang_setting_dom.getChildByID('chk_es')?.addEventListener('click', (e) => {
            const ch1 = (<any>e.target).parentElement.querySelector('#chk_en')
            ch1.checked = false
            this.user_config.set_config(BirdGameConfig.CONFIG_KEYS.lang, 'es')
        })
    }

    private createMusicConfig(x_pos: number, y_pos: number): void {
        const isChecked = this.user_config.get_config()[BirdGameConfig.CONFIG_KEYS.music_is_enabled] ?? false

        const check = document.createElement('input')
        check.type = "checkbox"
        if (isChecked) {
            check.setAttribute('checked', '')
        }

        check.id = "enable_music"
        check.style = this.checkbox_style


        const label = document.createElement('label')
        label.style.fontFamily = BirdGameConfig.FONTS_KEYS.menu_fnt
        label.style.verticalAlign = "super"
        label.style.margin = "0 10px 0 0"
        label.setAttribute('for', 'enable_music')
        label.innerText = `${this.getText('music')}`
        const config_dom = document.createElement('label')
        config_dom.append(label, check)
        let audio_checkbox = this.add.dom(x_pos, y_pos)
            .createFromHTML(
                config_dom.innerHTML
            )
        audio_checkbox.addListener('click')
        audio_checkbox.on('click', (ev: PointerEvent, el: any) => {
            const is_checked = (<any>audio_checkbox.getChildByID('enable_music')).checked;
            this.user_config.set_config(BirdGameConfig.CONFIG_KEYS.music_is_enabled, is_checked)
        })
    }
}