import 'phaser-ce'

export class Fader {

  private game: Phaser.Game
  private color

  constructor(game, color = 0x000000) {
    this.game = game
    this.color = color
  }

  public fadeOut (duration, delay?, functionCall?, context?) {
    context = context || this;
    duration = duration || 300;
    delay = delay || 0;

    let preloadFade = this.game.add.graphics(0, 0);
    preloadFade.beginFill(this.color);
    preloadFade.drawRect(0, 0, this.game.width, this.game.height);
    preloadFade.fixedToCamera = true;

    this.game.add.tween(preloadFade)
      .to({ alpha: 0 }, duration, Phaser.Easing.Exponential.In, true, delay)
      .onComplete.add(function () {
        preloadFade.destroy();

        if (functionCall) {
          functionCall.call(context);
        }

      }, this);

  };

  public fadeIn (duration, delay?, functionCall?, context?) {

    context = context || this;
    duration = duration || 300;
    delay = delay || 0;

    let preloadFade = this.game.add.graphics(0, 0);
    preloadFade.beginFill(this.color);
    preloadFade.drawRect(0, 0, this.game.width, this.game.height);
    preloadFade.alpha = 0;
    preloadFade.fixedToCamera = true;

    this.game.add.tween(preloadFade)
      .to({ alpha: 1 }, duration, Phaser.Easing.Linear.None, true, delay)
      .onComplete.add(function () {

        if (functionCall) {
          functionCall.call(context);
        }

      }, this);
  }

}

