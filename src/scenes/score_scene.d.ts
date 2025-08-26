import { BaseScene } from "./base_scene";
declare class ScoreScene extends BaseScene {
    get scores(): {
        name: string;
        score: number;
    }[];
    constructor(config: any);
    create(): void;
}
export default ScoreScene;
//# sourceMappingURL=score_scene.d.ts.map