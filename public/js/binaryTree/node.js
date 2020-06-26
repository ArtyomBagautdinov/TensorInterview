
/**
* Структура узла дерева
*/
export function Node(props) {

    this.left = null; 
    this.right = null;
    
    /**
    * Метод рисования узла
    */
    this.draw = function() {
      props.ctx.beginPath();
      props.ctx.arc(props.x, props.y, props.r, 0, 2*Math.PI); 
      props.ctx.stroke();
      props.ctx.closePath();
      props.ctx.font = "16px Arial, Helvetica, sans-serif";
      props.ctx.strokeText(props.data, props.x-5, props.y+4);
    };
    
    /**
    * Геттеры данных узла
    */
    this.getData = function() { return props.data; }; 
    this.getX = function() { return props.x; };
    this.getY = function() { return props.y; };
    this.getRadius = function() { return props.r; };
    
    /**
    * Расчёт длинны отступов между узлами
    */
    this.leftCoordinate = function() {
      return {cx: (props.x - (props.deep*2*props.r)), cy: (props.y + (props.deep*2*props.r))}
    };
      
    this.rightCoordinate = function() {  
      return {cx: (props.x + (props.deep*2*props.r)), cy: (props.y+(props.deep*2*props.r))}
    };
  };
  