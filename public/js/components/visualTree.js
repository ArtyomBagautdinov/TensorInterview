import { Component } from './component.js';


/**
 * Компонент контейнера для сортируемых элементов
 */

export class VisualTree extends Component {
    render = () => {
        let result = document.createElement('div');

        let visualTree = document.createElement('div');
        visualTree.setAttribute('class', 'visual-tree');

        let visualTreeContainer = document.createElement('div');
        visualTreeContainer.setAttribute('class', 'visual-tree__container');
        
        let svg = document.createElement('svg');
        svg.setAttribute('id','tree-holder')

        let treeButtons = document.createElement('div');
        treeButtons.setAttribute('class', 'tree__buttons');

        let buttonBuildTree = document.createElement('div');
        buttonBuildTree.setAttribute('class', 'buttons__build-tree');
        buttonBuildTree.innerHTML = 'Build tree';

        let buttonClearTree = document.createElement('div');
        buttonClearTree.setAttribute('class', 'buttons__clear-tree');
        buttonClearTree.innerHTML = 'Clear tree';


        treeButtons.append(buttonBuildTree);
        treeButtons.append(buttonClearTree);

        visualTreeContainer.append(svg);
        visualTreeContainer.append(treeButtons);
        
        visualTree.append(visualTreeContainer);

        result.append(visualTree);

        return result.innerHTML;
    }


    afterMount = () => {
        const buildButton = document.getElementsByClassName('buttons__build-tree')[0];
        buildButton.addEventListener('click', () => {/*some method*/});

        const clearButton = document.getElementsByClassName('buttons__clear-tree')[0];
        clearButton.addEventListener('click', () => {/*some method*/});

    }

}
