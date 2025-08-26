export declare class ScoreManager {
    private scene;
    scoreText: Phaser.GameObjects.Text;
    bestScoreText: Phaser.GameObjects.Text;
    get score(): number;
    set score(value: number);
    get bestScore(): number;
    set bestScore(value: number);
    constructor(scene: Phaser.Scene);
    createScore(scene: Phaser.Scene): void;
    increaseScore(): void;
    saveBestScore(): void;
}
//# sourceMappingURL=score_manager.d.ts.map