import 'phaser-ce'
import { Math as MathCE } from 'phaser-ce'
import { Rotator } from '../prefabs/rotator'
import { Frequency } from '../prefabs/frequency'

export default class SandboxState extends Phaser.State {

  private data
  private params

  private rotator
  private frequency: Frequency
  private voice1: Phaser.Sound
  private isPlaying = false

  public init (data, params) {
    this.data = data
    this.params = params
    // this.game.stage.backgroundColor = 0x776655
  }

  public create () {
    const centerX = this.game.world.centerX
    const centerY = this.game.world.centerY

    let panelBox = this.game.add.sprite(centerX, centerY - 100, 'button_frequency')
    this.frequency = new Frequency(this.game, panelBox)

    let radioButton = this.game.add.sprite(centerX, centerY, 'button_radio')
    let buttonRotator = this.game.add.sprite(centerX, centerY - 30, 'button_rotator')
    this.rotator = new Rotator(this.game, radioButton, buttonRotator)
    this.rotator.slider.events.onDragUpdate.add(this.updateFrequency, this);

    this.voice1 = this.game.add.audio('music_bank', 0.0)
    // this.voice1.play()
  }

  public update () {
    this.rotator.update()
  }

  private updateFrequency () {
    let angle = this.rotator.getAngle()
    this.frequency.update(angle)
    let signalFound = false

    let frequencyValue = parseFloat(this.frequency.value)

    if (frequencyValue >= 100.00 && frequencyValue <= 100.20) {
      signalFound = true
      if (!this.isPlaying) {
        this.voice1.play()
        this.isPlaying = true
      }

      if (frequencyValue === 100.10) {
        this.voice1.volume = 1
      } else {
        this.voice1.volume = 0.1
      }
    }

    if (!signalFound) {
      this.voice1.stop()
      this.isPlaying = false
    }

  }

  private playSound (sound) {

  }

}
