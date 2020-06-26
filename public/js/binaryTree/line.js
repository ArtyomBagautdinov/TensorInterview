

/**
 * Класс обьекта Line - соединяющая линия между двумя узлами
 */
export class Line {
  constructor() { }

  /**
  * Нарисовать линию
  */
  draw(x, y, toX, toY, r, ctx) {
    let moveToX = x;
    let moveToY = y + r;
    let lineToX = toX;
    let lineToY = toY - r;
    ctx.beginPath();
    ctx.moveTo(moveToX, moveToY);
    ctx.lineTo(lineToX, lineToY);
    ctx.stroke();
  }
}