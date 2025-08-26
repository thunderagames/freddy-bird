import { BaseScene } from "../base_scene";
import 'phaser';
import { ScoreManager } from "./score_manager";
export declare class PlayScene extends BaseScene {
    pipes: Phaser.Physics.Arcade.Group;
    pipes_speed: number;
    isPaused: boolean;
    pipeHorizontalDistance: number;
    flapVelocity: number;
    currentDifficulty: string;
    bird: any;
    pauseEvent: Phaser.Events.EventEmitter;
    initialTime: number;
    countDownText: Phaser.GameObjects.Text;
    timedEvent: Phaser.Time.TimerEvent;
    bestScoreKey: string;
    difficulties: {
        [key: string]: {
            pipeHorizontalDistanceRange: number[];
            pipeVerticalDistanceRange: number[];
        };
    };
    bkg1: Phaser.GameObjects.TileSprite;
    scoreManager: ScoreManager;
    constructor(config: any);
    init(): void;
    create(): void;
    increaseDifficulty(): string;
    update(): void;
    checkGameStatus(): void;
    recyclePipes(): void;
    gameOver(): void;
    createPause(): void;
    listenToEvents(): void;
    countDown(): void;
    handleInputs(): void;
    flap(): void;
}
//# sourceMappingURL=play_scene.d.ts.map