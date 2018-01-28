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
    return this.game.add.sprite(this.panel.centerX, this.panel.centerY + 35, 'button_radio')
  }

  public createSlider () {
    return this.game.add.sprite(0, 0, 'button_slider')
  }

  public createWarnings () {
    let green = this.game.add.sprite(this.panel.x + 160, this.panel.y + 95, 'panel_sprites', 'botao-verdinho')
    green.animations.add('blink', ['botao-verdinho', 'botao-verdinho-brilhando'], 2)
    let yellow = this.game.add.sprite(this.panel.x + 180, this.panel.y + 95, 'panel_sprites', 'botao-amarelinho')
    yellow.animations.add('blink', ['botao-amarelinho', 'botao-amarelinho-brilhando'], 2)
    let red = this.game.add.sprite(this.panel.x + 200, this.panel.y + 95, 'panel_sprites', 'botao-vermelhinho')
    red.animations.add('blink', ['botao-vermelhinho', 'botao-vermelhinho-brilhando'], 2)
    return { green, yellow, red }
  }

  public createRedAllert () {
    return this.game.add.sprite(this.panel.x + 20, this.panel.y + 15, 'panel_sprites', 'botao-vermelho')
  }

}
