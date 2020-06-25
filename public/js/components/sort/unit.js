import { Component } from '../component.js'
/**
 * Компонент элемента в сортировке 
 */
export class Unit extends Component {
    constructor(value) {
        super();
        this.value = value;
    }
    render = () => {

        let height = 'height: ' + (this.value * 20).toString() + 'px';

        let result = document.createElement('div');

        let unitContainer = document.createElement('div');
        unitContainer.setAttribute('class', 'unit__container');

        let unitCircle = document.createElement('div');
        unitCircle.setAttribute('class', 'unit__circle');

        let unitBar = document.createElement('div');
        unitBar.setAttribute('class', 'unit__bar');
        unitBar.setAttribute('style', height);

        let unitValue = document.createElement('div');
        unitValue.setAttribute('class', 'unit__value');

        unitValue.innerHTML = this.value;

        unitContainer.append(unitCircle);
        unitContainer.append(unitBar);
        unitContainer.append(unitValue);

        result.append(unitContainer);

        return result.innerHTML;
    }

    changeValue = (newValue) => {
        this.value = newValue;
        let height = 'height: ' + (this.value * 20).toString() + 'px';
        this.container.firstElementChild.nextElementSibling.setAttribute('style', height);
        this.container.lastElementChild.innerHTML = this.value;
        this.render();
    }
}