import { Component } from './component.js'

/**
* Компонент History - содержит в себе историю ходов и партий игры
*/
export class History extends Component {
    render = () => {
        let result = document.createElement('div');

        let history = document.createElement('div');
        history.setAttribute('class', 'history');
        
        let historyTitle = document.createElement('div');
        historyTitle.setAttribute('class', 'history__title');
        historyTitle.innerHTML = "История игры";

        let stepContainer = document.createElement('div');
        stepContainer.setAttribute('class', 'history__step-container');

        let beginGame = document.createElement('div');
        beginGame.setAttribute('class', 'history__step');
        beginGame.innerHTML = "Начало партии: 1";

        stepContainer.append(beginGame);

        history.append(historyTitle);
        history.append(stepContainer);
        result.append(history);

        return result.innerHTML;
    }
}