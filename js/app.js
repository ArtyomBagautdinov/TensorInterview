
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
        const battleBase = factory.create(BattleBase);

        let battlefield = document.createElement('div');
        battlefield.setAttribute('class','battlefield');

        let runningContainer = document.createElement('div');
        runningContainer.setAttribute('class','running__container');

        let runningInfo = document.createElement('div');
        runningInfo.setAttribute('class','running__info');

        runningInfo.innerHTML = "Сейчас ваш ход";

        runningContainer.append(runningInfo);

        let battlefieldContainer = document.createElement('div');
        battlefieldContainer.setAttribute('class','battlefield__container')
        
        let battlefieldEnemy= document.createElement('div');
        battlefieldEnemy.setAttribute('class','battlefield__enemy')

        let battlefieldPlayer = document.createElement('div');
        battlefieldPlayer.setAttribute('class','battlefield__player')

        let enemyContainer= document.createElement('div');
        enemyContainer.setAttribute('class','enemy__container')

        let enemyStatus = document.createElement('div');
        enemyStatus.setAttribute('class','enemy__status');

        let enemyScore = document.createElement('div');
        enemyScore.setAttribute('class','enemy__score');
        enemyScore.innerHTML = "Счёт игрока "+battleBase.getEnemyName()+": "+ battleBase.getEnemyScore();

        let playerContainer = document.createElement('div');
        playerContainer.setAttribute('class','player__container')

        let playerStatus = document.createElement('div');
        playerStatus.setAttribute('class','player__status');

        let playerScore = document.createElement('div');
        playerScore.setAttribute('class','player__score');
        
        playerScore.innerHTML = "Счёт игрока "+ battleBase.getPlayerName()+ ": " + battleBase.getPlayerScore();;

        enemyStatus.append(enemyScore);
        enemyContainer.append(battlefieldEnemy);
        enemyContainer.append(enemyStatus);

        playerStatus.append(playerScore);
        playerContainer.append(battlefieldPlayer);
        playerContainer.append(playerStatus);

        battlefieldContainer.append(enemyContainer);
        battlefieldContainer.append(playerContainer);

        battlefield.append(battlefieldContainer);
        battlefield.append(runningContainer);

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
         
            const battleBase = factory.create(BattleBase);
            this.container.addEventListener('click', (event) => {
                if(battleBase.getEnemyState(this.x,this.y)==0){
                    this.container.classList.remove('empty');
                    this.container.classList.add('checked');
                    
                    let randX = battleBase.getRandom(0,9);
                    let randY = battleBase.getRandom(0,9);
                    document.getElementsByClassName('player__score')[0].innerHTML = "Счёт игрока "+ battleBase.getPlayerName()+ ": " + battleBase.getPlayerScore();
                    
                    while(battleBase.attackPlayer(randX,randY)==2){
                        randX = battleBase.getRandom(0,9);
                        randY = battleBase.getRandom(0,9);
                    } 
                }
                else if(battleBase.getEnemyState(this.x,this.y)==1) {
        
                    this.container.classList.remove('empty');
                    this.container.classList.add('live');
                    let p = document.createElement('p');
                    p.setAttribute('class','red');
                    p.innerHTML = 'X';
                    this.container.append(p);
                    battleBase.attackEnemy(this.x,this.y);
                    document.getElementsByClassName('player__score')[0].innerHTML = "Счёт игрока "+ battleBase.getPlayerName()+ ": " + battleBase.getPlayerScore();
        
                    let randX = battleBase.getRandom(0,9);
                    let randY = battleBase.getRandom(0,9);
                    while(battleBase.attackPlayer(randX,randY)==2){
                        randX = battleBase.getRandom(0,9);
                        randY = battleBase.getRandom(0,9);
                    }
                    
                }else if(battleBase.getEnemyState(this.x,this.y)==-1) {
                    alert("Вы уже стреляли в эту палубу!")                   
                }
                else if(battleBase.getEnemyState(this.x,this.y)==-2){
                    alert("Вы уже стреляли сюда!")  
                }
                
            });
          
      
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
        const battleBase = factory.create(BattleBase);

        let square = document.createElement('div');
        square.classList.add('square')
        square.setAttribute('id',this.x.toString()+'_'+this.y.toString());

        if(battleBase.getPlayerState(this.x,this.y)==1) square.classList.add('live');
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

        this.enemyChecked = [];

        this.playerScore = 0;
        this.enemyScore = 0;
    }

    setPlayerName(pN){
        this.playerName = pN;
    }

    setEnemyName(eN){
        this.enemyName = eN;
    }


    getPlayerName(){
        return this.playerName;
    }

    getEnemyName(){
        return this.enemyName;
    }

    getPlayerScore(){
        return this.playerScore;
    }

    getEnemyScore(){
        return this.enemyScore;
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
            this.enemyChecked[i] = [];
            for(let j=0; j<10; j++){
                this.playerFieldState[i].push(0);
                this.enemyFieldState[i].push(0);
                this.enemyChecked[i].push(0);
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
            if(this.playerScore==20){
                alert("Вы победили !");
                let isRestart = confirm("Хотите начать заново?");
                if(isRestart)  window.location.reload()
                else window.close();
            }
        }
        if(this.enemyFieldState[i][j]==0) {
            this.enemyFieldState[i][j]=-2;
        }
        
    }

    attackPlayer(i,j){
        if(this.enemyChecked[i][j]==0){
               // alert("Ход компьютера!")
                if(this.playerFieldState[i][j]==1) {
                    this.enemyScore++;
                    this.playerFieldState[i][j]=-1;  
                    this.enemyChecked[i][j]=1;
                    let p = document.createElement('p');
                    p.setAttribute('class','red');
                    p.innerHTML = 'X';
                    document.getElementById(i.toString() + '_'+j.toString()).append(p);
                    document.getElementsByClassName('enemy__score')[0].innerHTML = "Счёт игрока "+battleBase.getEnemyName()+": "+ battleBase.getEnemyScore();
                    if(this.enemyScore==20) {
                        alert("Компьютер победил!");
                        let isRestart = confirm("Хотите начать заново?");
                        if(isRestart)  window.location.reload();
                        else window.close();
                    }
                    setTimeout(() => { 
                       // alert("Ваш ход!")
                        return -1;
                    }, 70);
                }
                if(this.playerFieldState[i][j]==0){
                    this.enemyChecked[i][j]=1;
                    let div = document.createElement('div');
                    div.setAttribute('class','point');
                    document.getElementById(i.toString() + '_'+j.toString()).append(div);
                    if(this.enemyScore==20) {
                        alert("Компьютер победил!");
                        let isRestart = confirm("Хотите начать заново?");
                        if(isRestart)  window.location.reload();
                        else window.close();

                    }
                    setTimeout(() => { 
                        //alert("Ваш ход!")
                        return -1;
                    }, 70);
                    
                }
                
            
        }
        else return 2;
    }

}

const factory = new ComponentFactory();

let namePlayer = prompt ("Придумайте своё имя");

let nameEnemy = prompt ("Придумайте имя компьютеру");

const battleBase = factory.create(BattleBase);


battleBase.setEnemyName(nameEnemy);

battleBase.setPlayerName(namePlayer);

const root = document.getElementById('root');



const battlefield = factory.create(Battlefield);

battlefield.mount(root,'afterbegin');


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

alert("Сейчас ваш ход")