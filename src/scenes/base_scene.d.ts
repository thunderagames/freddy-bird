import 'phaser';
export declare class BaseScene extends Phaser.Scene {
    config: any;
    screen_center: number[];
    fontSize: number;
    lineHeight: number;
    fontOptions: any;
    constructor(key: string, config: any);
    create(): void;
    createMenu(menu: any[], setupMenuEvents: any): void;
}
//# sourceMappingURL=base_scene.d.ts.map