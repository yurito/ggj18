import 'phaser-ce'
import * as _ from 'lodash'
import { Math as MathCE } from 'phaser-ce'
import { Rotator } from '../prefabs/rotator'
import { Frequency } from '../prefabs/frequency'
import { Voice } from '../prefabs/voice'

export default class SandboxState extends Phaser.State {

  private data
  private params

  private rotator
  private frequency: Frequency
  private sounds: Array<any>
  private isPlaying = false
  private voices = []

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

    let sound1 = this.game.add.audio('music_bank', 0.0)
    let sound2 = this.game.add.audio('sound_sonar', 0.0)

    this.sounds = [sound1, sound2]
    this.sounds.forEach((sound) => {
      let major = parseInt(MathCE.random(1, 12).toString(), 10) + this.frequency.start
      let minor = parseInt(MathCE.random(0, 9).toString(), 10) * 10
      let signal = `${major}.${minor}`
      this.voices.push(new Voice(sound, signal))
    })

    // this.voices.push(new Voice(this.voice1, 100.10))
    // this.voices.push(new Voice(this.voice2, 98.50))
  }

  public update () {
    this.rotator.update()
  }

  private updateFrequency () {
    let angle = this.rotator.getAngle()
    this.frequency.update(angle)
    let frequencyValue = parseFloat(this.frequency.value)
    let signalFound = false

    this.voices.forEach((voice) => {
      let minor = voice.signal - 0.15
      let major = voice.signal + 0.15
      if (frequencyValue >= minor && frequencyValue <= major) {
        signalFound = true

        if (!this.isPlaying) {
          this.isPlaying = true
          voice.sound.volume = 0.1
          voice.sound.play()
        }

        if (frequencyValue === voice.signal) {
          voice.sound.volume = 1
        } else {
          voice.sound.volume = 0.1
        }
      }
    })

    this.voices.forEach((voice) => {
      if (!signalFound) {
        voice.sound.stop()
        this.isPlaying = false
      }
    })

  }

}
