import { Component } from './component.js'
/**
 * Компонент хедера страницы
 */
export class Header extends Component {
    render = (props) => {
        let result = document.createElement('div');

        let headerContainer = document.createElement('header');
        headerContainer.setAttribute('class', 'header__container');

        let headerTitle = document.createElement('div');
        headerTitle.setAttribute('class', 'header__title');
        headerTitle.innerHTML = props.title;

        headerContainer.append(headerTitle);

        result.append(headerContainer);

        return result.innerHTML;
    }
}