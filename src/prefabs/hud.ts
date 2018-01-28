import 'phaser-ce'

import { Frequency } from './frequency'

export class HUD {

  private game: Phaser.Game
  private panel: Phaser.Sprite
  private warnings
  private redAlert

  constructor(game) {
    this.game = game

    this.createWater()
    this.game.add.sprite(0, 0, 'background_cabin')
    this.panel = this.game.add.sprite(100, 350, 'hud')
  }

  private createWater () {
    let water = this.game.add.sprite(0, -170, 'agua')
    water.animations.add('flow', ['agua-1', 'agua-2', 'agua-3'], 1.5, true)
    water.animations.play('flow')
  }

  public createFrequency () {
    return new Frequency(this.game, this.panel.position.x + 305, this.panel.position.y + 53)
  }

  public createButtonRadio () {
    return this.game.add.sprite(this.panel.centerX, this.panel.centerY + 50, 'button_radio')
  }

  public createSlider () {
    return this.game.add.sprite(0, 0, 'button_slider')
  }

  public createWarnings () {
    let green = this.game.add.sprite(this.panel.centerX - 30, this.panel.y + 85, 'panel_sprites', 'botao-verdinho')
    green.animations.add('blink', ['botao-verdinho', 'botao-verdinho-brilhando'], 3)
    let yellow = this.game.add.sprite(this.panel.centerX - 10, this.panel.y + 85, 'panel_sprites', 'botao-amarelinho')
    yellow.animations.add('blink', ['botao-amarelinho', 'botao-amarelinho-brilhando'], 2.5)
    let red = this.game.add.sprite(this.panel.centerX + 10, this.panel.y + 85, 'panel_sprites', 'botao-vermelhinho')
    red.animations.add('blink', ['botao-vermelhinho', 'botao-vermelhinho-brilhando'], 2)

    this.warnings = { green, yellow, red }
    this.game.time.events.loop(700, this.blinkWarning, this)
    return this.warnings
  }

  public createRedAllert () {
    let button = this.game.add.sprite(this.panel.x + 10, this.panel.y + 12, 'panel_sprites', 'botao-vermelho')
    button.animations.add('pressed', ['botao-vermelho-apertado', 'botao-vermelho'], 2, false)
    button.animations.add('idle', ['botao-vermelho'])
    this.redAlert = button
    this.redAlert.inputEnabled = true
    this.redAlert.events.onInputDown.add(this.pressRedAlert, this)
    return button
  }

  private blinkWarning () {

    for (let warningKey in this.warnings) {
      if (this.warnings.hasOwnProperty(warningKey)) {
        let warning = this.warnings[warningKey]
        if (warning.blink && warning.animations.currentAnim !== 'blink') {
          warning.animations.play('blink')
        } else {
          warning.animations.stop(null, true);
        }
      }
    }

  }

  private pressRedAlert () {
    this.redAlert.animations.play('pressed')
  }

}
