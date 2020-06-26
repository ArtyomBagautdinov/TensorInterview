
/**
 * Cинглтон класс Memory, хранящий в себе обьекты класса Unit вместе с основными методами манипулирования DOM
 */

export class Memory {
    constructor() {
        if (Memory.instance)
            return Memory.instance;

        Memory.instance = this;
        this.units = [];
        this.array = [1,8,5,6,7,3,9,4,10,2];
    }

    /**
    * Получить массив 
    */
    getArray = () => {
        return this.array;
    }

    /**
    * Заполнить массив элементами
    */
    setArray = (arr) => {
        let i = 0;
        arr.forEach(val => {
            this.array[i] = val;
            i++;
        });
    }

    /**
    * Очистить массив
    */
    clearArray = (arr) => {
        this.array = [];
    }

    /**
    * поменять элементы в массиве местами
    */
    swapElements = (x,y) => {
        let tmp = this.array[y];
        this.array[y] = this.array[x];
        this.array[x] = tmp;
    }

    /**
    * Вставить элемент в массив
    * @param elem элемент массива
    */
    pushElement = (elem) => {
        this.array.push(elem);
    }

    /**
    * Добавить все units в DOM
    */
    mountAll = (container, position) => {
        this.units.forEach((unit) => {
            unit.mount(container, position)
        })
    }

    /**
    * Удалить все units из DOM
    */
    unmountAll = () => {
        this.units.forEach((unit) => {
            unit.unmount()
        })
    }


    /**
    * Добавить unit в дом
    */
    addUnit = (component) => {
        this.units.push(component);
    }

    /**
    * Получить unit по id
    */
    getUnit = (id) => {
        return this.units[id];
    }

    /**
    * Получить кол-во units
    */
    getLength = () => {
        return this.units.length;
    }

}