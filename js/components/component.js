/**
 * Базовый компонент
 */
export class Component{
    'use strict';

    constructor(options){
        this.options = options;
        this.state = {};
        this.container = undefined;
    }

    /**
     * отрисовывает вёрстку компонента
     */

     render = () =>{
         return `<div></div>`;
     }

     /**
      * помещает компонент в DOM
      * @param {DOMElement} container контейнер, в котором строится вёрстка,куда помещаем
      * @param {String} position insertAdgacentElement позиция куда поместить - до/ в/ вконец/ после
      */

      mount = (container,position) => {

        this.beforeMount();
		
        // создаем новый компонент в доме
        const newComponent = document.createElement('div');
		
        // помещаем туда верстку
        newComponent.innerHTML = this.render(this.options,this.state)
		this.container = newComponent.firstElementChild;
		
        // перекладываем верстку в нужный контейнер
        container.insertAdjacentElement(position || 'beforeend', newComponent.firstElementChild);
		
        // подчищаем за собой
        newComponent.remove();
		
        // прехук после монтирования
        this.afterMount();
      }

      /**
      * удаляет компонент из DOM
      */

      unmount = () => {
          this.beforeUnmount();

          this.removeContainer();

          this.afterUnmount();
      }

    /**
     * получить контейнер
     */
    
    getContainer = () => {
        return this.container;
    }
	
	/**
     * уничтожает контейнер 
    */
	removeContainer = () => {
		if (this.container) {
			this.container.remove();
			this.container = undefined;
		}
    }

      /**
      * обновляет компонент
      */

      update = () => {}

      /**
      * прехук до монтирования
      */

      beforeMount = () => {}

      /**
      * прехук после монтирования
      */

      afterMount = () => {}

      /**
      * прехук до размонтирования
      */

      beforeUnmount = () => {}
      
      /**
      * прехук после размонтирования
      */

      afterUnmount = () => {}

}