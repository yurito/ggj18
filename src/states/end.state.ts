import 'phaser-ce'

export default class EndState extends Phaser.State {

  public init () {

  }

  public create () {
    let gameName = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 60, 'Cabo', { fill: '#ffffff', font: '36px Arial' })
    gameName.anchor.set(0.5, 0)
  }

}
