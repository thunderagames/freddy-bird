import { BaseScene } from "./base_scene";
export declare class PauseScene extends BaseScene {
    menu: {
        scene: string;
        text: string;
    }[];
    constructor(config: any);
    create(): void;
    setupMenuEvents(menuItem: any): void;
}
//# sourceMappingURL=pause_scene.d.ts.map