import 'phaser-ce'
import * as _ from 'lodash'
import { Math as MathCE } from 'phaser-ce'
import { Rotator } from '../prefabs/rotator'
import { HUD } from '../prefabs/hud'
import { Frequency } from '../prefabs/frequency'
import { voiceFactory } from '../prefabs/voice.factory'
import { Voice } from '../prefabs/voice'
import { Pause } from '../prefabs/pause'
import { Fader } from '../prefabs/fader'

export default class InterfaceState extends Phaser.State {

  private params
  private actualLevel

  private rotator
  private frequency: Frequency
  private sounds: Array<any>
  private noise: Phaser.Sound
  private redAlert: Phaser.Sprite
  private voices = []
  private levels = []
  private signals = []
  private warnings
  private fader: Fader
  private actualVoice
  private missSound

  public init (params) {
    this.params = params
    this.actualLevel = this.params.nextLevel
  }

  public create () {
    const centerX = this.game.world.centerX
    const centerY = this.game.world.centerY

    let hud = new HUD(this.game)
    this.frequency = hud.createFrequency()
    let radioButton = hud.createButtonRadio()
    let slider = hud.createSlider()
    this.warnings = hud.createWarnings()
    this.redAlert = hud.createRedAllert()
    this.redAlert.events.onInputDown.add(this.loseOrWin, this)

    this.rotator = new Rotator(this.game, radioButton, slider)
    this.rotator.slider.events.onDragUpdate.add(this.updateFrequency, this)

    this.noise = this.game.add.audio('noise_radio', 1.0, true)
    this.noise.volume = 0.0
    this.noise.play()

    let factored = voiceFactory(this.game, this.frequency, this.actualLevel)
    this.voices = factored.voices
    this.signals = factored.signals
    this.levels = factored.levels

    this.missSound = this.game.add.audio('sound_miss')

    let pause = new Pause(this.game)

    this.fader = new Fader(this.game)
    this.fader.fadeOut(2200)

    console.log(this.voices)

  }

  public update () {
    this.rotator.update()
  }

  private loseOrWin () {
    if (this.actualVoice && this.actualVoice.sound.key === this.levels[this.actualLevel - 1]) {
      this.params.nextLevel += 1
      this.game.sound.stopAll()
      this.game.state.start('interface', true, false, this.params)
    } else {
      this.game.camera.shake(0.001, 1000)
      if (!this.missSound.isPlaying) {
        this.missSound.play()
      }
    }

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
        this.actualVoice = voice

        if (!voice.sound.isPlaying) {
          voice.sound.volume = 0.2
          voice.sound.play()
        }

        if (frequencyValue >= voice.interlude.signal - 0.02 && frequencyValue <= voice.interlude.signal + 0.02) {
          voice.sound.volume = 1
          this.noise.volume = 0
          this.warnings.green.blink = true
          this.warnings.yellow.blink = false
        } else {
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

}
