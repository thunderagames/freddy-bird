export default class BirdGameConfig {
    static WIDTH: number;
    static HEIGHT: number;
    static BIRD_POSITION: {
        x: number;
        y: number;
    };
    static STORAGE_KEY: string;
    static SCENE_KEYS: {
        MenuScene: string;
        PreloadScene: string;
        ScoreScene: string;
        PlayScene: string;
        PauseScene: string;
        SaveScoreScene: string;
    };
    static DIFICULTIES: {
        easy: string;
        normal: string;
        hard: string;
    };
    static createScene(scene: any): Phaser.Scene;
    static initScenes(): Phaser.Scene[];
}
//# sourceMappingURL=game_config.d.ts.map