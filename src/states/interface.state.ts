import 'phaser-ce'
import * as _ from 'lodash'
import { Math as MathCE } from 'phaser-ce'
import { Rotator } from '../prefabs/rotator'
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


    public init(data, params) {
        this.data = data
        this.params = params

    }

    public create() {
        const centerX = this.game.world.centerX
        const centerY = this.game.world.centerY

        let panel = this.game.add.sprite(100, 350, 'hud')
        // let panelBox = this.game.add.sprite(centerX, centerY - 110, 'button_frequency')
        this.frequency = new Frequency(this.game, panel.position.x + 296, panel.position.y + 53)

        let radioButton = this.game.add.sprite(panel.centerX, panel.centerY + 15, 'button_radio')
        let slider = this.game.add.sprite(panel.centerX, 9999999999, 'button_slider')
        this.rotator = new Rotator(this.game, radioButton, slider)
        this.rotator.slider.events.onDragUpdate.add(this.updateFrequency, this);

        this.noise = this.game.add.audio('noise_radio', 1.0, true)
        this.noise.volume = 0.5
        this.noise.play()

        let sound1 = this.game.add.audio('music_bank', 0.0)
        let sound2 = this.game.add.audio('sound_sonar', 0.0)
        let sound3 = this.game.add.audio('voice_russeau', 0.0)

        this.sounds = [sound1, sound2, sound3, sound1, sound2, sound3, sound1, sound2, sound3]
        this.sounds.forEach((sound) => {
            let signal = this.createSignal()
            this.voices.push(new Voice(sound, signal))

        })
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
                    this.noise.volume = 0.5
                }
            }
        })

        this.voices.forEach((voice) => {
            if (!signalFound) {
                voice.sound.stop()
            }
        })

    }





}
