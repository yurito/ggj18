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
  private noise: Phaser.Sound
  private voices = []
  private signals = []


  public init(data, params) {
    this.data = data
    this.params = params
    // this.game.stage.backgroundColor = 0x776655
  }


  private createSignal() {
    let major = parseInt(MathCE.random(1, 12).toString(), 10) + this.frequency.start
    let minor = parseInt(MathCE.random(3, 7).toString(), 10) * 10
    let signal = parseFloat(`${major}.${minor}`)

    let duplicated = false

    this.signals.forEach((item) => {
      if (item === major) {
        duplicated = true
      }
    })

    if (duplicated) {
      return this.createSignal()
    } else {
      this.signals.push(major)
      return signal
    }
  }

  public update() {
    this.rotator.update()
  }

  private updateFrequency() {
    let angle = this.rotator.getAngle()
    this.frequency.update(angle)
    let frequencyValue = parseFloat(this.frequency.value)
    let signalFound = false

    this.voices.forEach((voice) => {
      let minor = voice.signal - 0.15
      let major = voice.signal + 0.15
      if (frequencyValue >= minor && frequencyValue <= major) {
        signalFound = true

        if (!voice.sound.isPlaying) {
          voice.sound.volume = 0.1
          voice.sound.play()
        }

        if (frequencyValue === voice.signal) {
          voice.sound.volume = 1
          this.noise.volume = 0
        } else {
          voice.sound.volume = 0.1
          this.noise.volume = 0.3
        }
      }
    })

    this.voices.forEach((voice) => {
      if (!signalFound) {
        this.noise.volume = 0.5
        voice.sound.stop()
      }
    })

  }

}
