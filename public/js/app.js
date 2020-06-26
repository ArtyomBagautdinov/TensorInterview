import {Header} from './components/header.js';
import {ComponentFactory} from './factory.js';
import {Sort} from './components/sort/sort.js';
import {VisualTree} from './components/visualTree.js';
import {Hero} from './components/hero.js';
import {Unit} from './components/sort/unit.js';
import {Memory} from './memory.js';

// элемент корня в DOM
const root = document.getElementById('root');

// Конструируем фабрику компонентов
const factory = new ComponentFactory();

// Конструируем основные компоненты
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


//Монтируем компоненты

header.mount(root);
hero.mount(root);
sort.mount(document.getElementById('hero'));
visualTree.mount(document.getElementById('hero'));

memory.getArray().forEach(val=>{
    const unit = factory.create(Unit,val);
    memory.addUnit(unit);
})

memory.mountAll(document.getElementById('sort__chart'));
