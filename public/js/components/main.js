import { Component } from './component.js'

/**
* Компонент Main - он будет содержать в себе само поле игры и её историю
*/
export class Main extends Component {
    render = () => {
        let result = document.createElement('div');

        let main = document.createElement('div');
        main.setAttribute('id', 'main');
        
        result.append(main);

        return result.innerHTML;
    }
}