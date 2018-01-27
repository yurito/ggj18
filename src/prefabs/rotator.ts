import { Math } from "phaser-ce";

export class Rotator {

  private game: Phaser.Game
  public pivot: Phaser.Sprite
  public slider: Phaser.Sprite
  private isDragging = false

  constructor(game, pivot, slider) {
    this.game = game
    this.pivot = pivot
    this.slider = slider

    this.pivot.anchor.set(0.5, 0.5)
    this.slider.anchor.set(0.5, 0.5)

    this.slider.inputEnabled = true
    this.slider.input.useHandCursor = true
    this.slider.input.priorityID = 1
    this.slider.input.enableDrag()
    this.slider.events.onDragStart.add(this.onDragStart, this);
    this.slider.events.onDragStop.add(this.onDragStop, this);
    this.slider.events.onDragUpdate.add(this.onRotateDragUpdate, this);
    this.slider.events.onInputOver.add(function () {
      this.game.canvas.style.cursor = "crosshair";
    }, this);
  }

  public update () {
    if (!this.isDragging) {
      const midX = this.pivot.width / 2;
      const midY = this.pivot.height / 2;
      this.slider.x = this.pivot.x;
      this.slider.y = this.pivot.y;
      this.slider.pivot.y = midY + 30;
    }
  }

  private onDragStart () {
    this.isDragging = true
  }

  private onDragStop () {
    this.isDragging = false
  }

  private onRotateDragUpdate () {
    this.slider.x = this.pivot.x;
    this.slider.y = this.pivot.y;
    let rotation = this.game.input.activePointer.position.angle(this.slider.position) - Phaser.Math.degToRad(90);
    this.slider.rotation = rotation
    this.pivot.rotation = rotation
  }

}
