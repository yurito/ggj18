import { Voice } from './voice'


export function voiceFactory (game: Phaser.Game, frequency, actualLevel) {

  let sounds = []
  let voices = []
  let signals = []
  let signalObject

  let keys = [
    'music_survive',
    'sound_sonar',
    'voice_russeau',
    'voice_karuta'
  ]

  let radio = [
    'voice_radio_level1',
    'voice_radio_level2',
    'voice_radio_level3'
  ]

  let levels = [
    'voice_level1',
    'voice_level2',
    'voice_level3'
  ]

  let voiceLol = game.add.audio('voice_pentakill', 0.0)
  signals.push(93)
  voices.push(new Voice(voiceLol, { major: 93, signal: 93.3 }))

  let voiceRadio = game.add.audio(`voice_radio_level${actualLevel}`, 1.0)
  signals.push(92)
  voices.push(new Voice(voiceRadio, { signal: 92.00, major: 92 }))
  voiceRadio.play()

  let voiceLevel = game.add.audio(`voice_level${actualLevel}`, 0.0)
  signalObject = frequency.createSignal(signals)
  signals.push(signalObject.major)
  voices.push(new Voice(voiceLevel, signalObject))

  keys.forEach((key) => {
    sounds.push(game.add.audio(key, 0.0))
  })

  sounds.forEach((sound) => {
    signalObject = frequency.createSignal(signals)
    signals.push(signalObject.major)
    voices.push(new Voice(sound, signalObject))
  })

  return { voices, signals, levels }
}
