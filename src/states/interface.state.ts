import 'phaser-ce'
import * as _ from 'lodash'
import { Math as MathCE } from 'phaser-ce'
import { Rotator } from '../prefabs/rotator'
import { HUD } from '../prefabs/hud'
import { Frequency } from '../prefabs/frequency'
import { Voice } from '../prefabs/voice'

export default class InterfaceState extends Phaser.State {

  private data
  private params

  private rotator
  private frequency: Frequency
  private sounds: Array<any>
  private noise: Phaser.Sound
  private voices = []
  private signals = []
  private warnings

  public init (data, params) {
    this.data = data
    this.params = params

  }

  public create () {
    const centerX = this.game.world.centerX
    const centerY = this.game.world.centerY

    let hud = new HUD(this.game)
    this.frequency = hud.createFrequency()
    let radioButton = hud.createButtonRadio()
    let slider = hud.createSlider()
    this.warnings = hud.createWarnings()

    this.game.time.events.loop(700, this.blinkWarning, this)

    this.rotator = new Rotator(this.game, radioButton, slider)
    this.rotator.slider.events.onDragUpdate.add(this.updateFrequency, this)

    this.noise = this.game.add.audio('noise_radio', 1.0, true)
    this.noise.volume = 0.5
    this.noise.play()

    let sound1 = this.game.add.audio('music_bank', 0.0)
    let sound2 = this.game.add.audio('sound_sonar', 0.0)
    let sound3 = this.game.add.audio('voice_russeau', 0.0)

    this.sounds = [sound1, sound2, sound3, sound1, sound2, sound3, sound1, sound2, sound3]
    this.sounds.forEach((sound) => {
      let signalObject = this.frequency.createSignal(this.signals)
      this.signals.push(signalObject.major)
      this.voices.push(new Voice(sound, signalObject))
    })
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
      let minor = voice.interlude.signal - 0.15
      let major = voice.interlude.signal + 0.15

      if (frequencyValue >= minor && frequencyValue <= major) {
        signalFound = true
        this.warnings.yellow.blink = true
        this.warnings.green.blink = false

        if (!voice.sound.isPlaying) {
          voice.sound.volume = 0.2
          voice.sound.play()
        }

        if (frequencyValue >= voice.interlude.signal - 0.01 && frequencyValue <= voice.interlude.signal + 0.01) {
          console.log('found')
          voice.sound.volume = 1
          this.noise.volume = 0
          this.warnings.green.blink = false
          this.warnings.yellow.blink = false
        } else {
          console.log('almost')
          voice.sound.volume = 0.2
          this.noise.volume = 0.5
        }
      }
    })

    this.voices.forEach((voice) => {
      if (!signalFound) {
        voice.sound.stop()
        this.warnings.red.blink = true
        this.warnings.yellow.blink = false
        this.warnings.green.blink = false
      } else {
        this.warnings.red.blink = false
      }
    })

  }


  private blinkWarning () {

    for (let warningKey in this.warnings) {
      if (this.warnings.hasOwnProperty(warningKey)) {
        let warning = this.warnings[warningKey]
        if (warning.blink) {
          if (warning.alpha) {
            warning.alpha = 0;
          } else {
            warning.alpha = 1;
          }
        } else {
          warning.alpha = 1;
        }
      }
    }

  }

}
