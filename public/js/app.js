import {Header} from './components/header.js';
import {ComponentFactory} from './factory.js';
import {Sort} from './components/sort/sort.js';
import {VisualTree} from './components/visualTree.js';
import {Hero} from './components/hero.js';
import {Unit} from './components/sort/unit.js';
import {Memory} from './memory.js';
import {Tree} from './/binaryTree/binaryTree.js';

const root = document.getElementById('root');

const factory = new ComponentFactory();

const memory = factory.create(Memory);

const header = factory.create(
    Header,
    {
        title : "Awesome sort"
    }
);

const hero = factory.create(Hero);

const sort = factory.create(Sort);

const visualTree = factory.create(VisualTree);

header.mount(root);
hero.mount(root);
sort.mount(document.getElementById('hero'));
visualTree.mount(document.getElementById('hero'));

memory.getArray().forEach(val=>{
    const unit = factory.create(Unit,val);
    memory.addUnit(unit);
})

memory.mountAll(document.getElementById('sort__chart'));


 
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

async function justDoIt(){
    for(let i = 0;i<10; i++){
        //code here
        await sleep(300);
    }
}
