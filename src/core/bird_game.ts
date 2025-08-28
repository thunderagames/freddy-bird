import 'phaser'
import BirdGameConfig from './game_config'

export default class BirdGame extends Phaser.Game {
    constructor() {

        const fnt = new FontFace('menu-fnt', 'url(assets/menu-font.ttf')
        fnt.load().then((lf: any) => {
            document.fonts.add(lf)
        });

        super({
            parent: 'thegame',
            type: Phaser.AUTO,
            pixelArt: true,
            width: BirdGameConfig.WIDTH,
            height: BirdGameConfig.HEIGHT,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            autoCenter: Phaser.Scale.CENTER_BOTH,
            fps: {
                limit: 24
            },
            scale: {
                expandParent: true,
                mode: Phaser.Scale.ScaleModes.FIT
            },
            scene: BirdGameConfig.initScenes(),
            // title: 'Freddy Bird',
            dom: {
                createContainer: true
            }
        })

    }


}