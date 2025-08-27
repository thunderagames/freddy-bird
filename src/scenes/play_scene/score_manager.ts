import BirdGameConfig from "../../core/game_config";

export class ScoreManager {
    private scene: Phaser.Scene;
    scoreText: Phaser.GameObjects.Text;
    bestScoreText: Phaser.GameObjects.Text;

    get score(): number {
        return this.scene.game.registry.get('score')
    }

    set score(value: number) {
        this.scene.game.registry.set('score', value)
    }

    get bestScore(): number {
        return parseInt(localStorage.getItem(BirdGameConfig.STORAGE_KEY) ?? '0');
    }

    set bestScore(value: number) {
        localStorage.setItem(BirdGameConfig.STORAGE_KEY, String(value));
    }
    

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    createScore(scene: Phaser.Scene) {
        this.score = 0
        this.scoreText =
            this.scene.add.text(16, 16, ` Score: ${0} `,
                {
                    fontSize: '55px',
                    color: '#000',
                    fontFamily: 'score-fnt'
                })
                .setDepth(8);
                
        this.bestScoreText =
            this.scene.add.text(16, 80, `Best score: ${this.bestScore || 0}`,
                {
                    fontSize: '18px',
                    color: '#000',

                })
                .setDepth(8);;
    }

    increaseScore() {
        this.score++;
        this.scoreText.setText(` Score: ${this.score} `)
    }

    saveBestScore() {
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.bestScoreText.setText(`Best score: ${this.bestScore || 0}`)
        }
    }

}