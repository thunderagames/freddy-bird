import BirdGameConfig from "../core/game_config";
import { BaseScene } from "./base_scene";
export class PauseScene extends BaseScene {
    menu: { scene: string; text: string; }[];

    constructor(config: any) {
        super(BirdGameConfig.SCENE_KEYS.PauseScene, config);

        this.menu = [
            { scene: BirdGameConfig.SCENE_KEYS.PlayScene, text: 'Continue' },
            { scene: BirdGameConfig.SCENE_KEYS.MenuScene, text: 'Exit' },
        ]
    }

    create() {
        super.create();
        this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    }

    setupMenuEvents(menuItem: any) {
        const textGO = menuItem.textGO;
        textGO.setInteractive();

        textGO.on(Phaser.Input.Events.POINTER_OVER, () => {
            textGO.setStyle({ fill: '#ff0' });
        })

        textGO.on(Phaser.Input.Events.POINTER_OUT, () => {
            textGO.setStyle({ fill: '#fff' });
        })

        textGO.on(Phaser.Input.Events.POINTER_UP, () => {
            if (menuItem.scene && menuItem.text === 'Continue') {
                // Shutting down the Pause Scene and resuming the Play Scene
                this.scene.stop();
                this.scene.resume(menuItem.scene);
            } else {
                // Shutting PlayScene, PauseScene and running Menu
                this.scene.stop(BirdGameConfig.SCENE_KEYS.PlayScene);
                this.scene.start(menuItem.scene);
            }
        })
    }
}
