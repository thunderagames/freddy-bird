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

    constructor() {
        super(BirdGameConfig.SCENE_KEYS.SaveScoreScene)
    }

    create() {
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
            this.scene.stop(BirdGameConfig.SCENE_KEYS.SaveScoreScene);
            this.game.scene.start(BirdGameConfig.SCENE_KEYS.ScoreScene)

        })
    }

}