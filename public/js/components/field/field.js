import { Component } from '../component.js'

/**
* Компонент Field - непосредственно само поле игры
*/
export class Field extends Component {
    render = () => {
        let result = document.createElement('div');

        let field = document.createElement('div');
        field.setAttribute('class', 'field');

        let fieldContainer = document.createElement('div');
        fieldContainer.setAttribute('class','field__container');

        let fieldScore = document.createElement('div');
        fieldScore.setAttribute('class','field__score');

        let scoreTitle = document.createElement('p');
        scoreTitle.setAttribute('id','score__title');
        scoreTitle.innerHTML = 'Счёт игры';

        let scoreInfo = document.createElement('p');
        scoreInfo.setAttribute('id','score__info');
        scoreInfo.innerHTML = 'Вы: 0 / Компьютер: 0';

        fieldScore.append(scoreTitle);
        fieldScore.append(scoreInfo);

        field.append(fieldContainer);
        field.append(fieldScore);
        
        result.append(field);

        return result.innerHTML;
    }
}