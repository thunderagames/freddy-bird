import { GameUserConfiguration } from "./game_user_configuration";

export class LangManager {
    user_config: GameUserConfiguration
    game: Phaser.Game;
    json_data: any

    constructor(scene: Phaser.Scene) {
        this.user_config = new GameUserConfiguration(scene.game)
        this.game = scene.game
        // scene.events.on(Phaser.Scenes.Events.BOOT, () => {
        //     this.json_data = this.game.cache.json.get('translations')
        // })

    }

    get_translation(sceneKey: string, key: string): string {
        if (!this.json_data) {
            this.json_data = this.game.cache.json.get('translations')
        }

        return this.json_data['translations'][sceneKey][key]
    }
}