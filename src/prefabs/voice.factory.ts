export function voiceFactory (game) {

  let sounds = []

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

  return sounds
}
