import BirdGameConfig from "../../core/game_config";
import { LangManager } from "../../core/lang_manage";
import { BaseScene } from "../base_scene";
import { MenuSceneAnims } from "./menu_scene_anims";

export class MenuScene extends BaseScene {
    menu: { scene: string | null; text: string; }[];
    bkg1: Phaser.GameObjects.TileSprite;
    bird: Phaser.GameObjects.Sprite;
    flyingBird: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    langManager: LangManager
    animations: MenuSceneAnims
    txtKeys = BirdGameConfig.TRANSLATION_KEYS.MenuScene

    constructor(config: any) {

        super(BirdGameConfig.SCENE_KEYS.MenuScene, config)
    }

    private getTxt(key: string): string {
        return this.langManager.get_translation(
            BirdGameConfig.SCENE_KEYS.MenuScene,
            key
        )
    }

    init() {
        let scene_keys = BirdGameConfig.SCENE_KEYS
        //init the lang manager to get the texts for the scene
        this.langManager = new LangManager(this)

        //init the menu array to send it to the base class to render it
        this.menu = [
            { scene: scene_keys.PlayScene, text: this.getTxt(this.txtKeys.play) },
            { scene: scene_keys.ScoreScene, text: this.getTxt(this.txtKeys.score) },
            { scene: scene_keys.ConfigScene, text: this.getTxt(this.txtKeys.configuration) },
        ]

    }

    create() {
        //init super class baseScene
        super.create()
        //init Animations for this scene
        new MenuSceneAnims(this).loadAnimations()

        //draw the menu using the base class
        this.createMenu(this.menu, this.setupMenuEvents.bind(this))
        
        this.loadUI()

        // TODO: create a class to manage sound and validate user config
        this.sound.volume = 0.08
        this.sound.stopAll()
        this.sound.play(BirdGameConfig.SOUND_KEYS.MainTheme)
    }

    setupMenuEvents(menuItem: { scene: string, text: string, textGO: Phaser.GameObjects.Text }) {
        const textGO = menuItem.textGO;
        textGO.setInteractive()

        textGO.on(Phaser.Input.Events.POINTER_OVER, () => {
            textGO.setScale(1.1)
            this.bird.play(BirdGameConfig.ANIMS_KEYS.eat)
        })

        textGO.on(Phaser.Input.Events.POINTER_OUT, () => {
            textGO.setScale(1)
        })

        textGO.on(Phaser.Input.Events.POINTER_UP, () => {
            menuItem.scene && this.scene.start(menuItem.scene)
        })
    }

    update() {
        //move clouds
        this.bkg1.tilePositionX += 0.3

        //restart background bird animation 
        if (this.flyingBird.x > this.scale.width + 10) {
            this.flyingBird.y = Phaser.Math.Between(20, this.scale.height / 2)
            this.flyingBird.x = -20
            this.flyingBird.setAlpha(Phaser.Math.FloatBetween(0.2, 0.8))
            this.flyingBird.setScale(Phaser.Math.FloatBetween(1, 1.5))
        }

        //exex parent class update method
        super.update()
    }

    private loadUI() {
        const imgKeys = BirdGameConfig.IMAGE_KEYS
        //draw game title
        this.add.text(this.scale.width / 2, 70, this.getTxt(this.txtKeys.game_title),
            {
                fontStyle: 'bold',
                fontSize: 65,
                fontFamily: BirdGameConfig.FONTS_KEYS.title_fnt,
                shadow: { fill: true, offsetX: 5, offsetY: 5, color: '#000', stroke: true }
            })
            .setOrigin(0.5)
            .setDepth(10)

        //create background rectangle for menu items
        this.add.rectangle(this.scale.width / 2, this.scale.height / 2 + 45, 230, 200, 0x000, 0.3)
            .setOrigin(0.5)
            .setRounded(10)
            .setDepth(9)
        
        //draw the tree for the background decoration
        this.add.image(50, 70, imgKeys.tree).setOrigin(0).setScale(4).setDepth(5)
        this.flyingBird = this.physics.add.sprite(0, 20, imgKeys.bird)
            .setVelocityX(50)
            .setFlipX(true)
            .play(BirdGameConfig.ANIMS_KEYS.fly)
            .setAlpha(0.4)
            .setDepth(4)
        
        //draw the bird over the tree
        this.bird = this.add.sprite(this.scale.width - 65, 150, imgKeys.bird)
            .setScale(3)
            .setOrigin(0.5, 1)
            .setDepth(10)
        
        //draw the footer text
        this.add.text(this.scale.width / 2, this.scale.height - 20, this.getTxt(this.txtKeys.footer),
            {
                fontFamily: BirdGameConfig.FONTS_KEYS.title_fnt,
                fontSize: 23,
                color: '#000'
            })
            .setOrigin(0.5)
            .setDepth(10)

        //draw the background clouds and scale it
        this.bkg1 = this.add.tileSprite(0, this.scale.height / 5, this.scale.width, this.scale.height, imgKeys["clouds1-bkg"])
            .setOrigin(0, 0)
            .setDepth(4)
        this.bkg1.setScale(1.5, 1.5)
    }

}