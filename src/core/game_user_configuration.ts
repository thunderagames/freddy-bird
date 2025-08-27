import BirdGameConfig from "./game_config";

export class GameUserConfiguration {
    game: Phaser.Game;

    constructor(game: Phaser.Game) {
        this.game = game
    }

    private get_config_value(configKey: string): any {
        return this.game.registry.get(configKey);
    }

    get_config(): { [key: string]: any } {
        let config: { [key: string]: any } = {}

        config[BirdGameConfig.CONFIG_KEYS.music_is_enabled] = this.get_config_value(BirdGameConfig.CONFIG_KEYS.music_is_enabled);

        return config
    }


    set_config(configKey: string, value: any) {
        this.game.registry.set(configKey, value);
    }
}