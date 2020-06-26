import { Component } from './component.js';
import { BinaryTree } from '../binaryTree/binaryTree.js';
import { Memory } from '../memory.js';
import { ComponentFactory } from '../factory.js';
import { sleep } from '../utils/utils.js';

/**
* Функция, которая строит и рисует дерево, а так же поэтапно
* отображает состояние отсортированного массива
*/
async function buildTree() {
    document.getElementById('my-canvas').remove();

    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'my-canvas')
    canvas.setAttribute('width', '720');
    canvas.setAttribute('height', '350');

    document.getElementsByClassName('visual-tree__container')[0].insertAdjacentElement('afterbegin', canvas);

    const factory = new ComponentFactory();
    const binTree = factory.create(BinaryTree);
    const memory = factory.create(Memory);

    const arr = memory.getArray();

    for (let i = 0; i < arr.length; i++) {
        binTree.add(arr[i]);

        document.getElementById('numbers__container').remove();
        let newNumbers = document.createElement('div');
        newNumbers.setAttribute('id', 'numbers__container');
        document.getElementById('nav__container').append(newNumbers);
        let root = binTree.getRoot();
        binTree.inorder(root);
        await sleep(500);
    }


};

/**
* Функция очищения дерева от данных
*/
function clearTree() {
    document.getElementById('my-canvas').remove();
    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'my-canvas')
    canvas.setAttribute('width', '720');
    canvas.setAttribute('height', '350');

    document.getElementsByClassName('visual-tree__container')[0].insertAdjacentElement('afterbegin', canvas);

    document.getElementById('numbers__container').remove();
    let newNumbers = document.createElement('div');
    newNumbers.setAttribute('id', 'numbers__container');
    document.getElementById('nav__container').append(newNumbers);

};


/**
 * Компонент контейнера для отображения бинарного дерева и всего прилагающегося 
 */

export class VisualTree extends Component {
    render = () => {
        let result = document.createElement('div');

        let visualTree = document.createElement('div');
        visualTree.setAttribute('class', 'visual-tree');

        let visualTreeContainer = document.createElement('div');
        visualTreeContainer.setAttribute('class', 'visual-tree__container');

        let canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'my-canvas')
        canvas.setAttribute('width', '720');
        canvas.setAttribute('height', '350');

        let navContainer = document.createElement('div');
        navContainer.setAttribute('id', 'nav__container');

        let numbersContainer = document.createElement('div');
        numbersContainer.setAttribute('id', 'numbers__container');

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

        navContainer.append(treeButtons);
        navContainer.append(numbersContainer);

        visualTreeContainer.append(canvas);
        visualTreeContainer.append(navContainer);

        visualTree.append(visualTreeContainer);

        result.append(visualTree);

        return result.innerHTML;
    }


    afterMount = () => {
        const buildButton = document.getElementsByClassName('buttons__build-tree')[0];
        buildButton.addEventListener('click', () => buildTree());

        const clearButton = document.getElementsByClassName('buttons__clear-tree')[0];
        clearButton.addEventListener('click', () => clearTree());

    }

}
