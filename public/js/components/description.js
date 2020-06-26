import { Component } from './component.js'

/**
 * Компонент описания того, как взаимодействовать в веб приложением
 */

export class Description extends Component {
    render = () => {
        let result = document.createElement('div');

        let description = document.createElement('div');
        description.setAttribute('class', 'description');

        let title = document.createElement('h2');
        title.innerHTML = "Инструкиця";

        let bubbleDescription = document.createElement('p');
        bubbleDescription.innerHTML = 'Чтобы выполнить сортировку пузырьком нажмите на кнопку "Bubble sort"';

        let shuffleDescription = document.createElement('p');
        shuffleDescription.innerHTML = 'Чтобы сгенерировать новую перестановку данных, нажмите на кнопку "Shuffle"';

        let buildDescription = document.createElement('p');
        buildDescription.innerHTML = 'Чтобы построить декартово дерево из данных и посмотреть как данные сортируются в процессе, нажмите на кнопку "Build tree"';

        let clearDescription = document.createElement('p');
        clearDescription.innerHTML = 'Чтобы очистить дерево от данных нажмите кнопку "Clear"';

        let attention = document.createElement('p');
        attention.setAttribute('class', 'attention');
        attention.innerHTML = 'Чтобы процессы проходили корректно, не стройте дерево во время сортировки пузырьком и не перемешивайте элементы во время построения дерева, так как данные общие. Когда сортировка не активна - можете спокойно строить дерево. ';

        description.append(title);
        description.append(bubbleDescription);
        description.append(shuffleDescription);
        description.append(buildDescription);
        description.append(clearDescription);
        description.append(attention);

        result.append(description);

        return result.innerHTML;
    }
}