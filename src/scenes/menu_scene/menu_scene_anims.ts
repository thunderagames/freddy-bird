import BirdGameConfig from "../../core/game_config";

export class MenuSceneAnims {
    scene: Phaser.Scene;
    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    loadAnimations() {
        const keys = BirdGameConfig.ANIMS_KEYS
        if (!this.scene.anims.exists(keys.eat))
            this.scene.anims.create({
                key: keys.eat,
                frames: this.scene.anims.generateFrameNumbers('bird', { start: 16, end: 18 }),
                frameRate: 6,
                yoyo: true,

            });

        if (!this.scene.anims.exists(keys.fly))
            this.scene.anims.create({
                key: keys.fly,
                frames: this.scene.anims.generateFrameNumbers('bird', { start: 9, end: 15 }),
                frameRate: 8,
                repeat: -1,
                yoyo: true
            })
    }
}