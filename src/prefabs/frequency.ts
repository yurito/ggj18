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

  constructor(game, x, y) {
    this.game = game
    const centerX = this.game.world.centerX
    const centerY = this.game.world.centerY

    this.frequencyText = this.game.add.text(x, y + 5, `${this.start}.00`, { font: '24px Arial', fill: '#ff0088' })

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

  public createSignal (signals) {
    let major = parseInt(MathCE.random(1, 12).toString(), 10) + this.start
    let minor = parseInt(MathCE.random(3, 7).toString(), 10) * 10
    let signal = parseFloat(`${major}.${minor}`)

    let duplicated = false

    signals.forEach((item) => {
      if (item === major) {
        duplicated = true
      }
    })

    if (duplicated) {
      return this.createSignal(signals)
    } else {
      return { signal, major }
    }
  }

}
