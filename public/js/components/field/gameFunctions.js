import { ComponentFactory } from '../../factory.js';
import { Memory } from '../../memory.js';
import { getRandom, sleep } from '../../utils.js';
import { Square } from './square.js';


/**
* Функция хода компьютера
*/
async function enemyStep() {

    const factory = new ComponentFactory();
    const memory = factory.create(Memory);
    let randX = getRandom(0, 2);
    let randY = getRandom(0, 2);

    if (memory.isFull()) {
        memory.nextParty();
        addPartyToStory()
        initField();
        return;
    }

    while (memory.getSquare(randX, randY) != '.') {
        randX = getRandom(0, 2);
        randY = getRandom(0, 2);
    }

    let img = document.createElement('img');
    img.setAttribute('class', 'image');
    img.setAttribute('src', '../../../img/circle.svg');
    memory.setState(randX, randY, 'o');
    document.getElementById(randX.toString() + '_' + randY.toString()).append(img);

    addStepToStory(randX, randY, 'Компютер');

    if (memory.checkWinner() == true) {
        if (memory.getPlayerScore() == 3) {
            alert("Вы победили! Игра начнётся заново");
            reload();
        }
        else if (memory.getComputerScore() == 3) {
            alert("Компьютер победил! Игра начнётся заново");
            reload();
        }
        memory.nextParty();
        addPartyToStory()
        initField();
        document.getElementById('score__info').innerHTML = 'Вы: ' + memory.getPlayerScore().toString() + ' / Компьютер: ' + memory.getComputerScore().toString();
    }

}

/**
* Функция хода игрока
*/
export async function changeSquare(container, i, j) {

    const factory = new ComponentFactory();

    const memory = factory.create(Memory);

    let image = document.createElement('img');
    image.setAttribute('class', 'image');
    image.setAttribute('src', '../../../img/cross.svg');
    container.append(image);
    memory.setState(i, j, 'x');

    await sleep(100);
    if (memory.checkWinner() == true) {
        if (memory.getPlayerScore() == 3) {
            alert("Вы победили! Игра начнётся заново");
            reload();
        }
        else if (memory.getComputerScore() == 3) {
            alert("Компьютер победил! Игра начнётся заново");
            reload();
        }
        memory.nextParty();
        addPartyToStory()
        initField();
        document.getElementById('score__info').innerHTML = 'Вы: ' + memory.getPlayerScore().toString() + ' / Компьютер: ' + memory.getComputerScore().toString();
        return;
    }
    enemyStep();
}


/**
* Функция добавления действия игрока или компьютера в историю
*/
export function addStepToStory(i, j, who) {
    let historyStep = document.createElement('div');
    historyStep.setAttribute('class', 'history__step');
    historyStep.innerHTML = who + ' сделал ход на клетке x: ' + (i + 1).toString() + ' y: ' + (j + 1).toString();
    document.getElementsByClassName('history__step-container')[0].append(historyStep);
}

/**
* Функция добавления информации о начале новой партии в историю
*/
function addPartyToStory() {
    const factory = new ComponentFactory();
    const memory = factory.create(Memory);

    let partyNow = memory.getParty();

    let historyStep = document.createElement('div');
    historyStep.setAttribute('class', 'history__step');
    historyStep.innerHTML = "Начало партии: " + partyNow.toString();
    document.getElementsByClassName('history__step-container')[0].append(historyStep);
}

/**
* Функция перезагрузки игры
*/
function reload() {
    window.location.reload();
}


/**
* Функция инициализации поля игры
*/
export function initField() {
    const factory = new ComponentFactory();
    const memory = factory.create(Memory);
    const fieldPoint = document.getElementsByClassName('field__container')[0];
    fieldPoint.innerHTML = null;
    memory.clearField();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const square = factory.create(
                Square,
                {
                    state: memory.getSquare(i, j),
                    i: i,
                    j: j
                }
            );

            square.mount(fieldPoint);

        }
    }
}