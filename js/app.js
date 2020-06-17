
/**
 * Фабрика компонентов
*/

class ComponentFactory {
    create = (component,options) => {
        return new component(options || {});
    }
}

/**
 * Базовый компонент
 */

class Component{
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


/**
* Компонент контейнера для поля боя
*/

class Battlefield extends Component {
    render = () =>{
        let battlefield = document.createElement('div');
        battlefield.setAttribute('class','battlefield');

        let battlefieldContainer = document.createElement('div');
        battlefieldContainer.setAttribute('class','battlefield__container')
        
        let battlefieldEnemy= document.createElement('div');
        battlefieldEnemy.setAttribute('class','battlefield__enemy')

        let battlefieldPlayer = document.createElement('div');
        battlefieldPlayer.setAttribute('class','battlefield__player')

        battlefieldContainer.append(battlefieldEnemy);
        battlefieldContainer.append(battlefieldPlayer);

        battlefield.append(battlefieldContainer);

        let result = document.createElement('div');
        result.append(battlefield);

        return result.innerHTML;
    }
}

class EnemyUnit extends Component {
    constructor(props){
        super();
        this.x = props.x;
        this.y = props.y;
        this.checked = false;
    }

    render = () =>{
        let square = document.createElement('div');
        square.classList.add('square')
        square.classList.add('empty');
        let result = document.createElement('div');
        result.append(square);

        return result.innerHTML;
    }

    afterMount = () => {
          if(!this.checked){
            const battleBase = factory.create(BattleBase);
            this.container.addEventListener('click', (event) => {
                if(battleBase.getEnemyState(this.x,this.y)==0){
                    this.container.classList.remove('empty');
                    this.container.classList.add('checked');
                    this.checked = true;
                }
                if(battleBase.getEnemyState(this.x,this.y)==1) {
                    this.container.classList.remove('empty');
                    this.container.classList.add('dead');
                    battleBase.attackEnemy(this.x,this.y);
                    this.checked = true;
                }
            });
          }
      
    }

}

class PlayerUnit extends Component {
    constructor(props){
        super();
        this.x = props.x;
        this.y = props.y;
        this.state = props.state;
    }

    render = () =>{
        let square = document.createElement('div');
        square.classList.add('square')
        if(this.state==0) square.classList.add('empty');
        if(this.state==1) square.classList.add('live');
        if(this.state==-1) square.classList.add('dead');

        let result = document.createElement('div');
        result.append(square);

        return result.innerHTML;
    }
}

class BattleBase {
    constructor(props){
        if(BattleBase.instance) return BattleBase.instance;

        BattleBase.instance = this;
 
        this.playerFieldState = [];
 
        this.enemyFieldState = [];

        this.playerScore = 0;
        this.enemyScore = 0;
    }

    getPlayerState(i,j){
        return this.playerFieldState[i][j];
    }

    getEnemyState(i,j){
        return this.enemyFieldState[i][j];
    }

    getRandom(bottomNum, topNum){
        return Math.floor(Math.random() * (topNum - (bottomNum - 1))) + bottomNum;
    }

    fieldsInit(){
        for(let i=0; i<10; i++){
            this.playerFieldState[i] = [];
            this.enemyFieldState[i] = [];
            for(let j=0; j<10; j++){
                this.playerFieldState[i].push(0);
                this.enemyFieldState[i].push(0);
            }
        }
    }

    initFourDeck(currentField){
        let randX = this.getRandom(0,9);
        let randY = this.getRandom(0,9);

        const bottom = Math.abs(9-randY)+1 >=4 ? true : false;
        const top = Math.abs(0-randY)+1 >=4 ? true : false;
        const left = Math.abs(0-randX)+1 >=4 ? true : false;
        const right = Math.abs(9-randX)+1 >=4 ? true : false;

        while(true){
            if(bottom){
                currentField[randX][randY]=1;
                currentField[randX][randY+1]=1;
                currentField[randX][randY+2]=1;
                currentField[randX][randY+3]=1;
                break;
            }
            if(right){
                currentField[randX][randY]=1;
                currentField[randX+1][randY]=1;
                currentField[randX+2][randY]=1;
                currentField[randX+3][randY]=1;
                break;
            }
            if(top){
                currentField[randX][randY]=1;
                currentField[randX][randY-1]=1;
                currentField[randX][randY-2]=1;
                currentField[randX][randY-3]=1;
                break;
            }
            if(left){
                currentField[randX][randY]=1;
                currentField[randX-1][randY]=1;
                currentField[randX-2][randY]=1;
                currentField[randX-3][randY]=1;
                break;
            }
        }

    }

    initTripleDeck(currentField){
        for(let k=0;k<2;k++){
            let complete = false;
            while(!complete){

                let randX = this.getRandom(0,9);
                let randY = this.getRandom(0,9);

                if(Math.abs(9-randY)+1 >= 3){
                    if(currentField[randX][randY]==0 && currentField[randX][randY+1]==0 && currentField[randX][randY+2]==0){
                        let leftOne = false;
                        let leftTwo = false;
                        let leftThree = false;

                        let rightOne = false;
                        let rightTwo = false;
                        let rightThree = false;

                        let top = false;
                        let bottom = false;

                        let edgeOne = false;
                        let edgeTwo = false;
                        let edgeThree = false;
                        let edgeFour = false;

                        if(Math.abs(9-randX)+1 >= 2 && Math.abs(9-randY)+1 >= 4){
                            if(currentField[randX+1][randY+3]==0){
                                edgeOne=true;
                            }
                        }
                        else edgeOne=true;

                        if(Math.abs(9-randX)+1 >= 2 && Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX+1][randY-1]==0){
                                edgeTwo=true;
                            }
                        }
                        else edgeTwo=true;

                        if(Math.abs(0-randX)+1 >= 2 && Math.abs(9-randY)+1 >= 4){
                            if(currentField[randX-1][randY+3]==0){
                                edgeThree=true;
                            }
                        }
                        else edgeThree=true;

                        if(Math.abs(0-randX)+1 >= 2 && Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX-1][randY+3]==0){
                                edgeFour=true;
                            }
                        }
                        else edgeFour=true;

                        if(Math.abs(0-randX)+1 > 1){
                            if(currentField[randX-1][randY]==0 && currentField[randX-1][randY+1]==0 && currentField[randX-1][randY+2]==0){
                                leftOne = true;
                                leftTwo = true;
                                leftThree = true;
                            }
                        }
                        else{
                            leftOne = true;
                            leftTwo = true;
                            leftThree = true;
                        }

                        if(Math.abs(9-randX)+1 > 1){
                            if(currentField[randX+1][randY]==0 && currentField[randX+1][randY+1]==0 && currentField[randX+1][randY+2]==0){
                                rightOne = true;
                                rightTwo = true;
                                rightThree = true;
                            }
                        }
                        else{
                            rightOne = true;
                            rightTwo = true;
                            rightThree = true;
                        }

                        if(Math.abs(9-randY)+1 >= 4){
                            if(currentField[randX][randY+3]==0){
                                top=true;
                            }
                        }
                        else{
                            top=true;
                        }

                        if(Math.abs(0-randY)+1 > 1){
                            if(currentField[randX][randY-1]==0){
                                bottom=true;
                            }
                        }
                        else{
                            bottom=true;
                        }

                        if(leftOne && leftTwo && leftThree && top && bottom && rightOne && rightTwo && rightThree && edgeOne && edgeTwo && edgeThree && edgeFour){
                            currentField[randX][randY]=1;
                            currentField[randX][randY+1]=1;
                            currentField[randX][randY+2]=1;
                            complete = true;
                        }
                    }
                }
            
                
                
                if(Math.abs(9-randX)+1 >= 3){
                    if(currentField[randX][randY]==0 && currentField[randX+1][randY]==0 && currentField[randX+2][randY]==0){
                        let topOne = false;
                        let topTwo = false;
                        let topThree = false;

                        let bottomOne = false;
                        let bottomTwo = false;
                        let bottomThree = false;

                        let left = false;
                        let right = false;


                        let edgeOne = false;
                        let edgeTwo = false;
                        let edgeThree = false;
                        let edgeFour = false;

                        if(Math.abs(9-randX)+1 >=4 && Math.abs(9-randY)+1 >= 2){
                            if(currentField[randX+3][randY+1]==0){
                                edgeOne=true;
                            }
                        }
                        else edgeOne=true;

                        if(Math.abs(9-randX)+1 >=4 && Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX+3][randY-1]==0){
                                edgeTwo=true;
                            }
                        }
                        else edgeTwo=true;

                        if(Math.abs(0-randX)+1 >= 2 && Math.abs(9-randY)+1 >= 2){
                            if(currentField[randX-1][randY+1]==0){
                                edgeThree=true;
                            }
                        }
                        else edgeThree=true;

                        if(Math.abs(0-randX)+1 >= 4 && Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX-1][randY-1]==0){
                                edgeFour=true;
                            }
                        }
                        else edgeFour=true;


                        if(Math.abs(9-randX)+1 >= 4){
                            if(currentField[randX+3][randY]==0){
                                right = true;
                            }
                        }
                        else{
                            right = true;
                        }

                        if(Math.abs(0-randX)+1 >= 2){
                            if(currentField[randX-1][randY]==0){
                                left = true;
                            }
                        }
                        else{
                            left = true;
                        }

                        if(Math.abs(9-randY)+1 >= 2){
                            if(currentField[randX][randY+1]==0 && currentField[randX+1][randY+1]==0 && currentField[randX+2][randY+1]==0){
                                topOne = true;
                                topTwo = true;
                                topThree = true;
                            }
                        }
                        else{
                            topOne = true;
                            topTwo = true;
                            topThree = true;
                        }

                        if(Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX][randY-1]==0 && currentField[randX+1][randY-1]==0 && currentField[randX+2][randY-1]==0){
                                bottomOne = true;
                                bottomTwo = true;
                                bottomThree = true;
                            }
                        }
                        else{
                            bottomOne = true;
                            bottomTwo = true;
                            bottomThree = true;
                        }

                        if(topOne && topTwo && topThree && left && right && bottomOne && bottomTwo && bottomThree && edgeOne && edgeTwo && edgeThree && edgeFour){
                            currentField[randX][randY]=1;
                            currentField[randX+1][randY]=1;
                            currentField[randX+2][randY]=1;
                            complete = true;
                        }
                    }
                }
                
                
            }
        }
    }

    initDoubleDeck(currentField){
        let randX = this.getRandom(0,9);
        let randY = this.getRandom(0,9);
        let complete = false;
        for(let k=0;k<3;k++){
            complete = false;
            
            while(!complete){
                randX = this.getRandom(0,9);
                randY = this.getRandom(0,9);
        
                if(Math.abs(9-randY)+1 >= 2){
                    if(currentField[randX][randY]==0 && currentField[randX][randY+1]==0){
                        let leftOne = false;
                        let leftTwo = false;

                        let rightOne = false;
                        let rightTwo = false;

                        let top = false;
                        let bottom = false;

                        let edgeOne = false;
                        let edgeTwo = false;
                        let edgeThree = false;
                        let edgeFour = false;

                        if(Math.abs(9-randX)+1 >= 2 && Math.abs(9-randY)+1 >= 3){
                            if(currentField[randX+1][randY+2]==0){
                                edgeOne=true;
                            }
                        }
                        else edgeOne=true;

                        if(Math.abs(9-randX)+1 >= 2 && Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX+1][randY-1]==0){
                                edgeTwo=true;
                            }
                        }
                        else edgeTwo=true;

                        if(Math.abs(0-randX)+1 >= 2 && Math.abs(9-randY)+1 >= 3){
                            if(currentField[randX-1][randY+2]==0){
                                edgeThree=true;
                            }
                        }
                        else edgeThree=true;

                        if(Math.abs(0-randX)+1 >= 2 && Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX-1][randY-1]==0){
                                edgeFour=true;
                            }
                        }
                        else edgeFour=true;

                        if(Math.abs(0-randX)+1 >= 2){
                            if(currentField[randX-1][randY]==0 && currentField[randX-1][randY+1]==0){
                                leftOne = true;
                                leftTwo = true;
                            }
                        }
                        else{
                            leftOne = true;
                            leftTwo = true; 
                        }

                        if(Math.abs(9-randX)+1 >= 2){
                            if(currentField[randX+1][randY]==0 && currentField[randX+1][randY+1]==0){
                                rightOne = true;
                                rightTwo = true;
                            }
                        }
                        else{
                            rightOne = true;
                            rightTwo = true;
                        }

                        if(Math.abs(9-randY)+1 >= 3){
                            if(currentField[randX][randY+2]==0){
                                top=true;
                            }
                        }
                        else{
                            top=true;
                        }

                        if(Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX][randY-1]==0){
                                bottom=true;
                            }
                        }
                        else{
                            bottom=true;
                        }

                        if(leftOne && leftTwo && top && bottom && rightOne && rightTwo && edgeOne && edgeTwo && edgeThree && edgeFour){
                            currentField[randX][randY]=1;
                            currentField[randX][randY+1]=1;
                            complete = true;
                        }
                    }
                }
            
                
                
                if(Math.abs(9-randX)+1 >= 3){
                    if(currentField[randX][randY]==0 && currentField[randX+1][randY]==0){
                        let topOne = false;
                        let topTwo = false;

                        let bottomOne = false;
                        let bottomTwo = false;

                        let left = false;
                        let right = false;

                        
                        let edgeOne = false;
                        let edgeTwo = false;
                        let edgeThree = false;
                        let edgeFour = false;

                        if(Math.abs(9-randX)+1 >=4 && Math.abs(9-randY)+1 >= 2){
                            if(currentField[randX+2][randY+1]==0){
                                edgeOne=true;
                            }
                        }
                        else edgeOne=true;

                        if(Math.abs(9-randX)+1 >=4 && Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX+2][randY-1]==0){
                                edgeTwo=true;
                            }
                        }
                        else edgeTwo=true;

                        if(Math.abs(0-randX)+1 >= 2 && Math.abs(9-randY)+1 >= 2){
                            if(currentField[randX-1][randY+1]==0){
                                edgeThree=true;
                            }
                        }
                        else edgeThree=true;

                        if(Math.abs(0-randX)+1 >= 2 && Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX-1][randY-1]==0){
                                edgeFour=true;
                            }
                        }
                        else edgeFour=true;

                        
                        if(Math.abs(9-randX)+1 >= 4){
                            if(currentField[randX+2][randY]==0){
                                right = true;
                            }
                        }
                        else{
                            right = true;
                        }

                        if(Math.abs(0-randX)+1 >= 2){
                            if(currentField[randX-1][randY]==0){
                                left = true;
                            }
                        }
                        else{
                            left = true;
                        }

                        if(Math.abs(9-randY)+1 >= 2){
                            if(currentField[randX][randY+1]==0 && currentField[randX+1][randY+1]==0){
                                topOne = true;
                                topTwo = true;
                             
                            }
                        }
                        else{
                            topOne = true;
                            topTwo = true;
                        }

                        if(Math.abs(0-randY)+1 >= 2){
                            if(currentField[randX][randY-1]==0 && currentField[randX+1][randY-1]==0){
                                bottomOne = true;
                                bottomTwo = true;
                            }
                        }
                        else{
                            bottomOne = true;
                            bottomTwo = true;
                        }

                        if(topOne && topTwo && left && right && bottomOne && bottomTwo && edgeOne && edgeTwo && edgeThree && edgeFour ){
                            currentField[randX][randY]=1;
                            currentField[randX+1][randY]=1;
                            complete = true;
                        }
                    }
                    
                }
                
                
            }
        }
    }

    initSingDeck(currentField){
        for(let i=0;i<4;i++){
            let flag = true;
            let randX = this.getRandom(1,8);
            let randY = this.getRandom(1,8);
            
            while(flag){
                if( currentField[randX][randY]==0 && currentField[randX+1][randY]==0 
                    && currentField[randX-1][randY]==0 && currentField[randX][randY+1]==0 
                    && currentField[randX][randY-1]==0 && currentField[randX+1][randY+1]==0 
                    && currentField[randX-1][randY-1]==0 && currentField[randX+1][randY-1]==0 
                    && currentField[randX-1][randY+1]==0){
                        currentField[randX][randY]=1;
                        flag = false;
                }
                else {
                    randX = this.getRandom(1,8);
                    randY = this.getRandom(1,8);
                }
            }
            
            
        }
    }

    fieldsStateInit(){
        this.fieldsInit();
        this.initFourDeck(this.playerFieldState);
        this.initDoubleDeck(this.playerFieldState);
        this.initTripleDeck(this.playerFieldState);
        this.initSingDeck(this.playerFieldState);

        this.initFourDeck(this.enemyFieldState);
        this.initTripleDeck(this.enemyFieldState);
        this.initDoubleDeck(this.enemyFieldState);
        this.initSingDeck(this.enemyFieldState);
    }

    showPlayerState(){
        for(let i = 0 ;i < 10;i++){
            console.log(this.playerFieldState[0][i],this.playerFieldState[1][i],this.playerFieldState[2][i],
                        this.playerFieldState[3][i],this.playerFieldState[4][i],this.playerFieldState[5][i],
                        this.playerFieldState[6][i],this.playerFieldState[7][i],this.playerFieldState[8][i],
                        this.playerFieldState[9][i])
        }
    }

    showEnemyState(){
        for(let i = 0 ;i < 10;i++){
            console.log(this.enemyFieldState[i][0],this.enemyFieldState[i][1],this.enemyFieldState[i][2],
                        this.enemyFieldState[i][3],this.enemyFieldState[i][4],this.enemyFieldState[i][5],
                        this.enemyFieldState[i][6],this.enemyFieldState[i][7],this.enemyFieldState[i][8],
                        this.enemyFieldState[i][9])
        }
    }

    attackEnemy(i,j){
        if(this.enemyFieldState[i][j]==1) {
            this.playerScore++;
            this.enemyFieldState[i][j]=-1;
            console.log(this.playerScore);
        }
        if(this.playerScore==20) alert("You win!");
    }

}




const root = document.getElementById('root');

const factory = new ComponentFactory();

const battlefield = factory.create(Battlefield);

battlefield.mount(root,'afterbegin');

const battleBase = factory.create(BattleBase);


battleBase.fieldsStateInit();
battleBase.showPlayerState();

for(let i=0; i<10; i++){
    for(let j=0; j<10; j++){
        const playerUnit = factory.create(
            PlayerUnit,
            {
                state : battleBase.getPlayerState(i,j),
                x : i,
                y : j
            }
            );
        const enemyUnit = factory.create(
            EnemyUnit,
            {   
                x : i,
                y : j
            }
            );
        playerUnit.mount(document.getElementsByClassName('battlefield__player')[0]);
        enemyUnit.mount(document.getElementsByClassName('battlefield__enemy')[0]);
    }
}
