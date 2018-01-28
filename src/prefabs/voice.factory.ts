import { Voice } from './voice'

export function voiceFactory (game, frequency) {

  let sounds = []
  let voices = []
  let signals = []

  let keys = [
    'music_bank',
    'sound_sonar',
    'voice_russeau',
    'voice_segunda',
    'voice_terca',
    'voice_quarta'
  ]

  keys.forEach((key) => {
    sounds.push(game.add.audio(key, 0.0))
  })

  let voiceLol = game.add.audio('voice_pentakill', 0.0)
  signals.push(93)
  voices.push(new Voice(voiceLol, { major: 93, signal: 93.3 }))

  sounds.forEach((sound) => {
    let signalObject = frequency.createSignal(signals)
    signals.push(signalObject.major)
    voices.push(new Voice(sound, signalObject))
  })

  return { voices, signals }
}
