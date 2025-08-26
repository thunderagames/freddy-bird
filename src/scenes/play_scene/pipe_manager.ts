export class PipesManager {
    static placePipe(uPipe: any, lPipe: any, difficulty: any, pipes: any, pipes_speed: number) {
        uPipe.x = 0
        uPipe.y = 0

        if (difficulty) {
            const rightMostX = this.getRightMostPipe(pipes)
            const range_v = difficulty?.pipeVerticalDistanceRange
            const range_h = difficulty?.pipeHorizontalDistanceRange
            const pipeVerticalDistance = Phaser.Math.Between(range_v[0] ?? 0, range_v[1] ?? 0)
            const pipeHorizontalDistance = Phaser.Math.Between(range_h[0] ?? 0, range_h[1] ?? 0)

            uPipe.x = rightMostX + pipeHorizontalDistance
            uPipe.y = uPipe.y + pipeVerticalDistance
            uPipe.setVelocityX(pipes_speed * -1)

            lPipe.x = uPipe.x
            lPipe.y = uPipe.y + pipeVerticalDistance
            lPipe.setVelocityX(pipes_speed * -1)
        }
    }

    static getRightMostPipe(pipes: any) {
        let rightMostX = 0;

        pipes.getChildren().forEach(function (pipe: any) {
            rightMostX = Math.max(pipe.x, rightMostX);
        })

        return rightMostX;
    }

    static createPipes(pipes: any, dificulty: any, velocity: number) {
        for (let i = 0; i < 2; i++) {
            const upperPipe = pipes.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 1)
                .setDepth(5)

            const lowerPipe = pipes.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 0)
                .setDepth(5)

            this.placePipe(upperPipe, lowerPipe, dificulty, pipes, velocity)
        }

        pipes.setVelocityX(velocity * -1)
    }
}