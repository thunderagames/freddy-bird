import 'phaser'
import BirdGameConfig from '../core/game_config';
import { GameUserConfiguration } from '../core/game_user_configuration';

export class BaseScene extends Phaser.Scene {
    config: any;
    screen_center: number[] = []
    fontSize = 34;
    lineHeight = 55;
    fontOptions: any = {}
    user_config: { [key: string]: any; };

    constructor(key: string, config: any) {
        super(key)
        this.config = config;
        this.screen_center = [config.width / 2, config.height / 2];
        this.fontOptions = { fontSize: `${this.fontSize}px`, fontFamily: 'menu-fnt', shadow: { color: '#000', offsetX: 3, offsetY: 4, fill: true, blur: 0.5 } } as Phaser.Types.GameObjects.Text.TextStyle;
    }

    create() {
        this.user_config = new GameUserConfiguration(this.game).get_config()

        // if (!user_config.get_config()[BirdGameConfig.CONFIG_KEYS.music_is_enabled]){
        //     this.sound.stopAll()
        // }

        this.add.image(0, 0, 'sky').setOrigin(0)
        if (this.config?.canGoBack ?? false) {
            const backButton = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
                .setOrigin(1)
                .setScale(2)
                .setInteractive()

            backButton.on(Phaser.Input.Events.POINTER_UP, () => {
                this.scene.start(BirdGameConfig.SCENE_KEYS.MenuScene)
                this.scene.stop(BirdGameConfig.SCENE_KEYS.PlayScene)
            })
        }
    }

    update() {
        if (this.sound.isPlaying(undefined) && !this.user_config[BirdGameConfig.CONFIG_KEYS.music_is_enabled]) {
            this.sound.stopAll()
        }
    }

    createMenu(menu: any[], setupMenuEvents: any) {
        let lastMenuPositionY = 0
        menu.forEach((menuItem: any) => {
            const menuPosition = [(this.screen_center[0] ?? 0), (this.screen_center[1] ?? 0) + lastMenuPositionY]
            menuItem.textGO = this.add.text((menuPosition[0] ?? 0), (menuPosition[1] ?? 0), menuItem.text, this.fontOptions)
                .setOrigin(0.5, 1)
                .setDepth(10)
            lastMenuPositionY += this.lineHeight
            setupMenuEvents(menuItem)

        })
    }
}