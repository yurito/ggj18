import 'phaser-ce'

export default class TitleState extends Phaser.State {

  private params

  public init (params) {
    this.params = params
  }

  public create () {

    this.game.add.sprite(0, 0, 'background_title')
    this.game.add.button(40, 50, 'button_start', this.startGame, this);
  }

  private startGame () {
    this.game.state.start('interface', true, false, this.params);
  }

}
