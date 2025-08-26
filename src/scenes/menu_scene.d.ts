import { BaseScene } from "./base_scene";
export declare class MenuScene extends BaseScene {
    menu: {
        scene: string | null;
        text: string;
    }[];
    bkg1: Phaser.GameObjects.TileSprite;
    bird: Phaser.GameObjects.Sprite;
    flyingBird: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    constructor(config: any);
    create(): void;
    setupMenuEvents(menuItem: {
        scene: string;
        text: string;
        textGO: Phaser.GameObjects.Text;
    }): void;
    update(): void;
}
//# sourceMappingURL=menu_scene.d.ts.map