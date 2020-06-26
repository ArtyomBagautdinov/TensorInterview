import { Component } from './component.js'

/**
 * Компонент Hero
 */

export class Hero extends Component {
    render = (props) => {
        let result = document.createElement('div');

        let hero = document.createElement('div');
        hero.setAttribute('id', 'hero');

        result.append(hero);

        return result.innerHTML;
    }
}