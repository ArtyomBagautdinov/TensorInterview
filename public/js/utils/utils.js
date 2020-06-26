
/**
* Получить случайное число в диапазоне 
* @param bottomNum нижнее значение
* @param topNum нижнее значение
*/

export function getRandom(bottomNum, topNum) {
    return Math.floor(Math.random() * (topNum - (bottomNum - 1))) + bottomNum;
}

/**
* Функция задержки времени  
* @param ms миллисекунды
*/
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}