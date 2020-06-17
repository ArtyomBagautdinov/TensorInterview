
/**
 * Класс хранилища данных о состоянии игры
 */


export class BattleBase {
    constructor(props){
        if(BattleBase.instance) return BattleBase.instance;

        BattleBase.instance = this;

        this.playerName = props.playerName;  
        this.playerFieldState = [];

        this.enemyName = props.enemyName;
        this.enemyFieldState = [];

        this.fourdeck = 1;
		this.tripledeck = 2;
		this.doubledeck = 3;
		this.singledeck = 4;
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    fieldsInit(){
        for(let i=0; i<10; i++)
            for(let j=0; j<10; j++){
                this.playerFieldState[i][j]=0;
                this.enemyFieldState[i][j]=0;
            }
    }

    initSingDeck(currentField){
        for(let i=0;i<4;i++){
            let flag = true;
            let randX = getRandom(0,10);
            let randY = getRandom(0,10);

            while(flag){
                if(randX!=0 && randX!=10 && randY!=0 && randY!=10){
                    if( currentField[randX][randY]==0 && currentField[randX+1][randY]==0 
                        && currentField[randX-1][randY]==0 && currentField[randX][randY+1]==0 
                        && currentField[randX][randY-1]==0 && currentField[randX+1][randY+1]==0 
                        && currentField[randX-1][randY-1]==0 && currentField[randX+1][randY-1]==0 
                        && currentField[randX-1][randY+1]==0){
                            currentField[randX][randY]=1;
                            flag = false;
                        }
                    }
            }
        }
    }

    fieldsStateInit(){
        this.fieldsInit();
        this.initSingDeck(this.playerFieldState);
        this.initSingDeck(this.enemyFieldState);
    }

    showPlayerState(){
        for(let i = 0 ;i < 10;i++){
            console.log(this.playerFieldState[i][0],this.playerFieldState[i][1],this.playerFieldState[i][2],
                        this.playerFieldState[i][3],this.playerFieldState[i][4],this.playerFieldState[i][5],
                        this.playerFieldState[i][6],this.playerFieldState[i][7],this.playerFieldState[i][8],
                        this.playerFieldState[i][9])
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

}