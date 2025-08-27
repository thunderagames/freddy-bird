import BirdGameConfig from "../core/game_config";
import { ScoreManager } from "./play_scene/score_manager";

export class SaveScoreScene extends Phaser.Scene {

    private _scores: { name: string, score: number }[] = []

    get scores(): { name: string, score: number }[] {
        return JSON.parse(localStorage.getItem('scores_list') ?? '[]')
    }

    set scores(value: { name: string, score: number }[]) {
        localStorage.setItem('scores_list', JSON.stringify(value))
    }

    get currentScore(): number {
        return this.game.registry.get('score')
    }

    constructor() {
        super(BirdGameConfig.SCENE_KEYS.SaveScoreScene)
    }

    create() {


        if (this.currentScore == 0) {
            this.resetGame(BirdGameConfig.SCENE_KEYS.MenuScene)
            return
        }

        let _sc = [...this.scores]
        //if the score array has less tha 10 socres, save it
        if (_sc.length < 10) {
            this.createForm()
        } else {
            //validate if the new score is greater than any of the existent 10, and replace it
            _sc.sort((a, b) => a.score - b.score)
            const min_score = _sc[0]
            if ((min_score?.score ?? 0) < this.currentScore) {
                _sc.splice(0, 1)
                this.scores = _sc
                this.createForm()
            } else {
                this.resetGame(BirdGameConfig.SCENE_KEYS.MenuScene)
                return
            }
        }
    }

    private createForm() {
        this.add.text(this.scale.width / 2, this.scale.height / 4, 'Save Score',
            {
                fontFamily: 'title-fnt',
                fontSize: '32px'
            })
            .setOrigin(0.5)

        this.add.rectangle(this.scale.width / 2, this.scale.height / 4 + 60, 250, 180, 0x000, 0.4).setOrigin(0.5).setDepth(9)

        let inpt = this.add.dom(this.scale.width / 2, this.scale.height / 4 + 50).createFromHTML(
            '<input type="text" id="name" style="font-family:title-fnt; font-size:24px;" placeholder="...player name" />')
            .setOrigin(0.5)
            .setDepth(10)

        let btn = this.add.dom(this.scale.width / 2, this.scale.height / 4 + 100).createFromHTML(
            '<button type="button" style="font-family:title-fnt; font-size:18px;">SAVE</button>')
            .setOrigin(0.5)
            .setDepth(10)

        btn.addListener('click')
        btn.on('click', () => {
            let val = this.scores;
            val.push({ name: (<any>inpt.getChildByID("name")).value, score: this.game.registry.get('score') })
            this.scores = val;
            this.resetGame(BirdGameConfig.SCENE_KEYS.ScoreScene)
        })
    }

    private resetGame(nextSceneKey: string): void {
        this.scene.stop(BirdGameConfig.SCENE_KEYS.SaveScoreScene);
        this.scene.stop(BirdGameConfig.SCENE_KEYS.PlayScene);
        this.game.scene.start(nextSceneKey)
    }

}