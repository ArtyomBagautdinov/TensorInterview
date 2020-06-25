import { Component } from '../component.js'
import { Memory } from '../../memory.js';
import { ComponentFactory } from '../../factory.js';

/**
* Получить случайное число в диапазоне 
* @param bottomNum нижнее значение
* @param topNum нижнее значение
*/

function getRandom(bottomNum, topNum){
    return Math.floor(Math.random() * (topNum - (bottomNum - 1))) + bottomNum;
}

/**
* Функция задержки времени  
* @param ms миллисекунды
*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
* Функция сортировки пузырьком
*/
async function bubbleSort() {
    const factory = new ComponentFactory();
    const memory = factory.create(Memory);
    memory.getArray()
    let k = 0;
    for (let i = 0; i < memory.getArray().length; i++) {
        for (let j = 0; j < memory.getArray().length; j++) {
            if (memory.getArray()[j] > memory.getArray()[j + 1]) {
                memory.swapElements(j+1,j);
                await sleep(100);
                k = 0;
                memory.getArray().forEach(val => {
                    memory.getUnit(k).changeValue(val);
                    k++;
                })
            }
        }
    }
}

/**
* Функция перемешивания элементов
*/
async function shuffle() {

    const factory = new ComponentFactory();
    const memory = factory.create(Memory);
    let k = 0;
    memory.clearArray();

    while(true){
        let num = getRandom(1,10);
        if(!memory.getArray().includes(num)) memory.pushElement(num);
        if(memory.getArray().length==10) break;
    }

    memory.getArray().forEach(val => {
        memory.getUnit(k).changeValue(val);
        k++;
    })

}

/**
 * Компонент контейнера для сортируемых элементов
 */
export class Sort extends Component {
    render = () => {
        let result = document.createElement('div');

        let sort = document.createElement('div');
        sort.setAttribute('class', 'sort');

        let sortContainer = document.createElement('div');
        sortContainer.setAttribute('class', 'sort__container');

        let sortChart = document.createElement('div');
        sortChart.setAttribute('id', 'sort__chart');

        let sortButtons = document.createElement('div');
        sortButtons.setAttribute('class', 'sort__buttons');

        let buttonBubbleSort = document.createElement('div');
        buttonBubbleSort.setAttribute('class', 'buttons__bubble-sort');
        buttonBubbleSort.innerHTML = 'Bubble Sort';

        let buttonShuffle = document.createElement('div');
        buttonShuffle.setAttribute('class', 'buttons__shuffle');
        buttonShuffle.innerHTML = 'Shuffle';

        let buttonBinTree = document.createElement('div');
        buttonBinTree.setAttribute('class', 'buttons__bin-tree-sort');
        buttonBinTree.innerHTML = 'Binary Tree Sort';

        sortButtons.append(buttonBubbleSort);
        sortButtons.append(buttonShuffle);
        sortButtons.append(buttonBinTree);

        sortContainer.append(sortChart);
        sortContainer.append(sortButtons);

        sort.append(sortContainer);

        result.append(sort);

        return result.innerHTML;
    }


    afterMount = () => {
        const bubbleButton = document.getElementsByClassName('buttons__bubble-sort')[0];
        bubbleButton.addEventListener('click', () => bubbleSort());

        const shuffleButton = document.getElementsByClassName('buttons__shuffle')[0];
        shuffleButton.addEventListener('click', () => shuffle());

        const binTreeButton = document.getElementsByClassName('buttons__bin-tree-sort')[0];
        binTreeButton.addEventListener('click', () => bubbleSort());
    }

}
