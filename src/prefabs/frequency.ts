import { Math as MathCE } from 'phaser-ce'

export class Frequency {

  private game: Phaser.Game
  public radioFrequency: Phaser.Sprite
  public panelBox: Phaser.Sprite
  public frequencyText: Phaser.Text

  public start = 97
  public major
  public minor
  public value

  constructor(game, panelBox) {
    this.game = game
    this.panelBox = panelBox

    const centerX = this.game.world.centerX
    const centerY = this.game.world.centerY

    this.frequencyText = this.game.add.text(centerX, this.panelBox.y + 5, `${this.start}.00`, { font: '24px Arial', fill: '#ff0088' })

    this.panelBox.anchor.set(0.5, 0.5)
    this.frequencyText.anchor.set(0.5, 0.5)
  }

  public update (angle) {
    let subfrequency = angle / 30
    let frequency = Math.ceil(subfrequency)
    let subfrequencyAdjusted = subfrequency % 1
    let decimals = subfrequencyAdjusted.toString().substr(2, 2)

    this.major = this.start + frequency
    this.minor = parseInt(decimals, 10)
    this.value = parseFloat(`${this.major}.${decimals}`).toFixed(2)
    this.frequencyText.text = `${this.value}`
  }

}
