import 'phaser-ce'

export class Voice {

  private game: Phaser.Game
  public sound: Phaser.Sound
  public signal

  constructor(sound, signal) {
    this.sound = sound
    this.signal = signal
  }

}
