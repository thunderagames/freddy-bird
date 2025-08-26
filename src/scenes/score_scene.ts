import BirdGameConfig from "../core/game_config";
import { BaseScene } from "./base_scene";

class ScoreScene extends BaseScene {
    get scores(): { name: string, score: number }[] {
        return JSON.parse(localStorage.getItem('scores_list') ?? '[]')
    }
    constructor(config: any) {
        super(BirdGameConfig.SCENE_KEYS.ScoreScene, { ...config, canGoBack: true });
    }

    create() {
        super.create();
        let y = this.scale.height / 4
        this.add.text(this.scale.width / 2, y - 50, 'TOP TEN SCORES',
            { fontSize: '26px', fontFamily: 'menu-fnt' })
            .setOrigin(0.5)

        this.scores.forEach(x => {
            this.add.text(this.scale.width / 4, y, `${x.name}: ${x.score || 0}`,
                {
                    fontSize: '18px', fontFamily: 'menu-fnt', shadow:
                    {
                        offsetX: 4,
                        offsetY: 4,
                        fill: true,
                        stroke: true,
                        color: '#000', blur: 5
                    }
                })
                .setOrigin(0, 0.5)
            y += 40
        })
    }
}

export default ScoreScene;