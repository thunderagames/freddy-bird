import { BaseScene } from "../base_scene";
import BirdGameConfig from "../../core/game_config";
import { PipesManager } from "./pipe_manager";
import 'phaser'
import { BirdGameFactories } from "./factories";
import { ScoreManager } from "./score_manager";

export class PlayScene extends BaseScene {

    pipes: Phaser.Physics.Arcade.Group;
    pipes_speed = 100
    isPaused = false
    //pipeHorizontalDistance = 0
    flapVelocity = 300
    currentDifficulty = `${BirdGameConfig.DIFICULTIES.easy}`
    bird: any;
    pauseEvent: Phaser.Events.EventEmitter;
    initialTime: number;
    countDownText: Phaser.GameObjects.Text;
    timedEvent: Phaser.Time.TimerEvent;
    bestScoreKey = 'bestScore'
    difficulties: {
        [key: string]: { pipeHorizontalDistanceRange: number[], pipeVerticalDistanceRange: number[] }
    } = {};
    bkg1: Phaser.GameObjects.TileSprite;
    scoreManager: ScoreManager

    constructor(config: any) {
        super(BirdGameConfig.SCENE_KEYS.PlayScene, config)
        this.scoreManager = new ScoreManager(this)
        this.difficulties[BirdGameConfig.DIFICULTIES.easy] = {
            pipeHorizontalDistanceRange: [300, 500],
            pipeVerticalDistanceRange: [170, 220]
        }

        this.difficulties[BirdGameConfig.DIFICULTIES.normal] = {
            pipeHorizontalDistanceRange: [280, 430],
            pipeVerticalDistanceRange: [150, 200]
        }

        this.difficulties[BirdGameConfig.DIFICULTIES.hard] = {
            pipeHorizontalDistanceRange: [250, 300],
            pipeVerticalDistanceRange: [110, 180]
        }
    }

    init() {
        BirdGameFactories.init_play_scene(this)
        this.currentDifficulty = BirdGameConfig.DIFICULTIES.easy
    }

    create() {
        this.pipes_speed = 100
        this.pipes = this.physics.add.group()

        super.create();
        this.bird = (<any>this.add).bird()
        PipesManager.createPipes(this.pipes, this.difficulties[this.currentDifficulty], this.pipes_speed)
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, undefined, this);
        this.scoreManager.createScore(this)
        this.createPause()
        this.handleInputs()
        this.listenToEvents()
        if (!this.anims.exists('fly'))
            this.anims.create({
                key: 'fly',
                frames: this.anims.generateFrameNumbers('bird', { start: 9, end: 15 }),
                frameRate: 8,
                repeat: -1
            })


        this.bkg1 = this.add.tileSprite(0, 0, this.scale.width, this.scale.height / 2, 'clouds2-bkg')
            .setOrigin(0, -0.95)
            .setDepth(0)

        this.bird.play('fly');
    }

    increaseDifficulty() {
        if (this.scoreManager.score >= 10 && this.scoreManager.score < 30) {
            return BirdGameConfig.DIFICULTIES.normal;
        }

        if (this.scoreManager.score >= 30) {
            return BirdGameConfig.DIFICULTIES.hard;
        }

        return BirdGameConfig.DIFICULTIES.easy;
    }


    update() {
        this.checkGameStatus();
        this.recyclePipes();

        this.bkg1.tilePositionX += 0.2 + this.pipes_speed * 0.001

        if (this.pipes_speed < 500)
            this.pipes_speed += 0.025
    }

    checkGameStatus() {
        if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
            this.gameOver();
        }
    }

    recyclePipes() {
        const tempPipes: any[] = [];
        this.pipes.getChildren().forEach(pipe => {
            if ((<any>pipe).getBounds().right <= -10) {
                tempPipes.push(pipe);
                if (tempPipes.length === 2) {
                    PipesManager.placePipe(tempPipes[0], tempPipes[1], this.difficulties[this.currentDifficulty], this.pipes, this.pipes_speed);
                    this.scoreManager.increaseScore();
                    this.scoreManager.saveBestScore();
                    this.currentDifficulty = this.increaseDifficulty();
                }
            }
        })
    }

    gameOver() {
        this.physics.pause();
        this.bird.setTint(0xEE4824);

        this.scoreManager.saveBestScore();

        if (!this.isPaused) {
            this.isPaused = true

            const scn = this.scene.launch(BirdGameConfig.SCENE_KEYS.SaveScoreScene)

        }
    }

    createPause() {
        this.isPaused = false;
        const pauseButton = this.add.image(BirdGameConfig.WIDTH - 10, BirdGameConfig.HEIGHT - 10, 'pause')
            .setInteractive()
            .setScale(3)
            .setOrigin(1)
            .setDepth(6);

        pauseButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.isPaused = true;
            this.physics.pause();

            this.scene.launch(BirdGameConfig.SCENE_KEYS.PauseScene);
            this.scene.pause();
        })
    }

    listenToEvents() {
        if (this.pauseEvent) { return; }

        this.pauseEvent = this.events.on(Phaser.Scenes.Events.RESUME, () => {
            this.initialTime = 3;
            this.countDownText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Fly in: ' + this.initialTime, this.fontOptions).setOrigin(0.5);
            this.timedEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countDown,
                callbackScope: this,
                loop: true
            })
        })
    }

    countDown() {
        this.initialTime--;
        this.countDownText.setText('Fly in: ' + this.initialTime);
        if (this.initialTime <= 0) {
            this.isPaused = false;
            this.countDownText.setText('');
            this.physics.resume();
            this.timedEvent.remove();
        }
    }

    handleInputs() {
        this.input.on(Phaser.Input.Events.POINTER_DOWN, this.flap, this);

        this.input.keyboard?.on('keydown_SPACE', this.flap, this);
    }

    flap() {
        if (this.isPaused) { return; }
        this.bird.body.velocity.y = -this.flapVelocity;
    }
}