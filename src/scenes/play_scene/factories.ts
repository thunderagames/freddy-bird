import BirdGameConfig from "../../core/game_config"

2
export class BirdGameFactories {
    static init_play_scene(scene: Phaser.Scene) {
        let me = scene

        Phaser.GameObjects.GameObjectFactory.register('bird', function (x: number, y: number) {
            let brd = me.physics.add.sprite(BirdGameConfig.BIRD_POSITION.x, BirdGameConfig.BIRD_POSITION.y, 'bird', 0)
            brd.setOrigin(0)
                .setScale(3)
                .setFlipX(true)
            brd.setDepth(15)
            brd.setBodySize(brd.width, brd.height - 8)
            brd.body.gravity.y = 600
            brd.setCollideWorldBounds(true)
            return brd
        })
    }
}
