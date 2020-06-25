import {Header} from './components/header.js';
import {ComponentFactory} from './factory.js';
import {Sort} from './components/sort/sort.js';
import {Unit} from './components/sort/unit.js';
import {Memory} from './memory.js';
const root = document.getElementById('root');

const factory = new ComponentFactory();

const memory = factory.create(Memory);

const header = factory.create(
    Header,
    {
        title : "Awesome sort"
    }
);

const sort = factory.create(Sort);

header.mount(root);
sort.mount(root);

memory.getArray().forEach(val=>{
    const unit = factory.create(Unit,val);
    memory.addUnit(unit);
})

memory.mountAll(document.getElementById('sort__chart'));

/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function delayedGreeting() {
    memory.mountAll(document.getElementById('sort__chart'));
    let k = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                await sleep(100);
                k = 0;
                arr.forEach(val=>{
                    memory.getUnit(k).changeValue(val);
                    k++;
                })
            }
        }
    }
}

delayedGreeting();

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] > arr[j + 1]) {
            let tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
            arr.forEach(val=>{
                
            })
        }
    }
}


setTimeout(() => { console.log("мир"); }, 3000);
*/