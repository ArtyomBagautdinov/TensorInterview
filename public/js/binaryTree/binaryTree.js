import {Node} from './node.js';
import {Line} from './line.js';
import {ComponentFactory} from '../factory.js';


/**
 * Класс структуры данных - Бинарное дерево
 */
export class BinaryTree{
  constructor(){
    this.ctx = document.getElementById('my-canvas').getContext('2d');
    this.ctx.strokeStyle = "white";
    this.root = null;
  }

  /**
  * получить корень дерева
  */
  getRoot(){ 
    return this.root; 
  }

  /**
  * Обход дерева в порядке неубывания
  */
  inorder(node){ 
      if(node !== null){ 
          this.inorder(node.left); 
          
          let numCont = document.getElementById('numbers__container');

          let num = document.createElement('div');
          num.setAttribute('class','number__cyrcle');

          let p = document.createElement('p');
          p.innerHTML = node.getData().toString();
          num.append(p);
          numCont.append(num);
          this.inorder(node.right); 
      } 
  } 

  /**
  * Добавить узел в дерево
  */
  add(data){
    if(this.root) this.recursiveAddNode(this.root, null, null, data,1);   
    else {
      this.root = this.addAndDisplayNode(350, 30, 16, this.ctx, data,1);
      return;
    } 
  }

  /**
  * Вспомогательный метод для добавления в дерево
  */
  recursiveAddNode(node, prevNode, coordinateCallback, data, deep) {
    if(!node) {
      let xy = coordinateCallback();
      let newNode = this.addAndDisplayNode(xy.cx, xy.cy, 16, this.ctx, data,deep);
      const factory = new ComponentFactory();
      const line = factory.create(Line);
      line.draw(prevNode.getX(), prevNode.getY(), xy.cx, xy.cy, prevNode.getRadius(), this.ctx)
      return newNode; 
    } 
    else {
      if(data <= node.getData()) 
        node.left = this.recursiveAddNode(node.left, node, node.leftCoordinate, data,deep);
      else
        node.right = this.recursiveAddNode(node.right, node, node.rightCoordinate, data,deep);
    
      return node;
    }
  };
  
  /**
  * Конструирование обьекта узла и рисование его в canvas
  */
  addAndDisplayNode(propX, propY, propR, propCtx, propData,propDeep) {
    const factory = new ComponentFactory();
    let node =  factory.create(Node,
                               {
                                  x: propX,
                                  y: propY,
                                  r: propR,
                                  ctx: propCtx,
                                  data :propData,
                                  deep : propDeep
                               });
     
    node.draw();
    return node;
  }
}
