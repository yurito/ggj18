import 'phaser-ce'

import { Frequency } from './frequency'

export class HUD {

  private game: Phaser.Game
  private panel: Phaser.Sprite

  constructor(game) {
    this.game = game

    this.panel = this.game.add.sprite(100, 350, 'hud')
  }

  public createFrequency () {
    return new Frequency(this.game, this.panel.position.x + 296, this.panel.position.y + 53)
  }

  public createButtonRadio () {
    return this.game.add.sprite(this.panel.centerX, this.panel.centerY + 15, 'button_radio')
  }

  public createSlider () {
    return this.game.add.sprite(0, 0, 'button_slider')
  }

  public createWarnings () {
    let green = this.game.add.sprite(this.panel.x + 100, this.panel.y + 100, 'button_warning_green')
    let yellow = this.game.add.sprite(this.panel.x + 120, this.panel.y + 100, 'button_warning_yellow')
    let red = this.game.add.sprite(this.panel.x + 140, this.panel.y + 100, 'button_warning_red')
    return { green, yellow, red }
  }

}
