export class Frequency {

  private game: Phaser.Game
  public radioFrequency: Phaser.Sprite
  public panelBox: Phaser.Sprite
  public frequencyText: Phaser.Text
  private start = 97
  private frequencyNumber

  constructor(game, panelBox) {
    this.game = game
    this.panelBox = panelBox

    const centerX = this.game.world.centerX
    const centerY = this.game.world.centerY

    this.frequencyText = this.game.add.text(centerX, centerY - 95, `0${this.start}.00`, { font: '24px Arial', fill: '#ff0088' })

    this.panelBox.anchor.set(0.5, 0.5)
    this.frequencyText.anchor.set(0.5, 0.5)
  }

  public update (frequency) {
    this.frequencyNumber = this.start + Math.ceil(frequency)
    this.frequencyText.text = `0${this.frequencyNumber}.00`
  }

}
