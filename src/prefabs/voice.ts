import 'phaser-ce'

export class Voice {

  private game: Phaser.Game
  public sound: Phaser.Sound
  public interlude

  constructor(sound, interlude) {
    this.sound = sound
    this.interlude = interlude
  }

  // public findSignal (voice, frequencyValue) {
  //   let floatSignal = parseFloat(voice.interlude.signal)
  //   let minor = floatSignal - 0.15
  //   let major = floatSignal + 0.15
  //   let signalFound = 0

  //   if (frequencyValue >= minor && frequencyValue <= major) {
  //     console.log('almost')
  //     signalFound = 1
  //     voice.sound.volume = 0.1

  //     if (!voice.sound.isPlaying) {
  //       console.log('playing', voice.sound)
  //       voice.sound.play()
  //     }

  //     if (frequencyValue >= floatSignal - 0.01 && frequencyValue <= floatSignal + 0.01) {
  //       console.log('found')
  //       voice.sound.volume = 1
  //       signalFound = 2
  //     }
  //   }

  //   if (signalFound === 0) {
  //     voice.sound.stop()
  //   }

  //   return signalFound
  // }

}
