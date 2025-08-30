import BirdGameConfig from "./game_config";
import { GameUserConfiguration } from "./game_user_configuration";

export class LangManager {
    user_config: GameUserConfiguration
    game: Phaser.Game;
    json_data: any

    constructor(scene: Phaser.Scene) {
        this.user_config = new GameUserConfiguration(scene.game)
        this.game = scene.game
    }

    get_translation(sceneKey: string, key: string): string {
        const current_lang = this.user_config.get_config()[BirdGameConfig.CONFIG_KEYS.lang]
        if (!this.json_data) {
            this.json_data = this.game.cache.json.get('translations')
        }
        let ln_json = this.json_data['translations'][current_lang]

        return ln_json[sceneKey][key]
    }
}