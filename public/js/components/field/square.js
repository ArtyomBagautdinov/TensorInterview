import { Component } from '../component.js';
import { ComponentFactory } from '../../factory.js';
import { Memory } from '../../memory.js';
import { changeSquare, addStepToStory } from './gameFunctions.js';

/**
* Компонент Square - клетка поля, на которой будет изоображен либо крестик либо нолик 
*/
export class Square extends Component {
    constructor(props) {
        super();
        this.state = props.state;
        this.i = props.i;
        this.j = props.j;
    }

    render = () => {
        let result = document.createElement('div');

        let square = document.createElement('div');
        const id = this.i.toString() + '_' + this.j.toString();
        square.setAttribute('class', 'square');
        square.setAttribute('id', id);
        result.append(square);

        return result.innerHTML;
    }

    afterMount = () => {
        this.container.addEventListener('click', () => {
            const factory = new ComponentFactory();
            const memory = factory.create(Memory);
            if (memory.getSquare(this.i, this.j) == '.') {
                addStepToStory(this.i, this.j, 'Игрок');
                changeSquare(this.container, this.i, this.j);
                this.state = 'x';
            }
        });
    }
}