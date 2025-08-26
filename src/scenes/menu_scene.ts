import BirdGameConfig from "../core/game_config";
import { BaseScene } from "./base_scene";

export class MenuScene extends BaseScene {
    menu: { scene: string | null; text: string; }[];
    bkg1: Phaser.GameObjects.TileSprite;
    bird: Phaser.GameObjects.Sprite;
    flyingBird: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;


    constructor(config: any) {
        let scene_keys = BirdGameConfig.SCENE_KEYS
        super(scene_keys.MenuScene, config)

        this.menu = [
            { scene: scene_keys.PlayScene, text: 'Play' },
            { scene: scene_keys.ScoreScene, text: 'Score' },
            { scene: scene_keys.SaveScoreScene, text: 'Config' },
            { scene: null, text: 'Exit' }
        ]
    }

    create() {
        super.create()
        this.add.text(this.scale.width / 2, 70, 'Freddy Bird',
            {
                fontStyle: 'bold',
                fontSize: 65,
                fontFamily: 'title-fnt',
                shadow: { fill: true, offsetX: 5, offsetY: 5, color: '#000', stroke: true }
            })
            .setOrigin(0.5)
            .setDepth(10)

        this.createMenu(this.menu, this.setupMenuEvents.bind(this))
        this.sound.volume = 0.08
        
        this.sound.stopAll()
        this.sound.play('menu-song')
        this.bkg1 = this.add.tileSprite(0, this.scale.height / 5, this.scale.width, this.scale.height, 'clouds1-bkg')
            .setOrigin(0, 0)
            .setDepth(4)
        this.bkg1.setScale(1.5, 1.5)
        this.anims.create({
            key: 'eat',
            frames: this.anims.generateFrameNumbers('bird', { start: 16, end: 18 }),
            frameRate: 6,
            yoyo: true,

        });

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', { start: 9, end: 15 }),
            frameRate: 8,
            repeat: -1,
            yoyo: true
        })

        this.add.rectangle(this.scale.width / 2, this.scale.height / 2 + 60, 230, 250, 0x000, 0.3)
            .setOrigin(0.5)
            .setRounded(10)
            .setDepth(9)

        this.add.image(50, 70, 'tree').setOrigin(0).setScale(4).setDepth(5)
        this.flyingBird = this.physics.add.sprite(0, 20, 'bird')
            .setVelocityX(50)
            .setFlipX(true)
            .play('fly')
            .setAlpha(0.4)
            .setDepth(4)

        this.bird = this.add.sprite(this.scale.width - 65, 150, 'bird')
            .setScale(3)
            //.play('eat')
            .setOrigin(0.5, 1)
            .setDepth(10)

        this.add.text(this.scale.width / 2, this.scale.height - 20, 'Thundera Games 2025 ©',
            {
                fontFamily: 'title-fnt',
                fontSize: 23,
                color: '#000'
            })
            .setOrigin(0.5)
            .setDepth(10)
    }

    setupMenuEvents(menuItem: { scene: string, text: string, textGO: Phaser.GameObjects.Text }) {
        const textGO = menuItem.textGO;
        textGO.setInteractive()

        textGO.on(Phaser.Input.Events.POINTER_OVER, () => {
            textGO.setScale(1.1)
            this.bird.play('eat')
        })

        textGO.on(Phaser.Input.Events.POINTER_OUT, () => {
            textGO.setScale(1)
        })

        textGO.on(Phaser.Input.Events.POINTER_UP, () => {
            menuItem.scene && this.scene.start(menuItem.scene)
            if (menuItem.text == 'Exit') {
                this.game.destroy(true)
            }
        })
    }

    update() {
        this.bkg1.tilePositionX += 0.3

        if (this.flyingBird.x > this.scale.width + 10) {
            this.flyingBird.y = Phaser.Math.Between(20, this.scale.height / 2)
            this.flyingBird.x = -20
            this.flyingBird.setAlpha(Phaser.Math.FloatBetween(0.2, 0.8))
            this.flyingBird.setScale(Phaser.Math.FloatBetween(1, 1.5))
        }
    }
}