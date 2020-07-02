
/**
 * Cинглтон класс Memory, хранящий в себе состояние игры в крестики нолики
 */

export class Memory {
    constructor() {
        if (Memory.instance)
            return Memory.instance;

        Memory.instance = this;

        this.playerScore = 0;
        this.playerState = 'x';

        this.computerScore = 0;
        this.computerState = 'o';

        this.party = 1;

        this.field = [
            ['.', '.', '.'],
            ['.', '.', '.'],
            ['.', '.', '.']
        ];
    }   

    /**
    * Получить текущую партию игры
    */
    getParty = () => {
        return this.party;
    }

    /**
    * Увеличить счётчик партии на 1
    */
    nextParty = () => {
        this.party++;
    }

    /**
    * Проверить заполнены ли все клетки на поле
    */
    isFull = () => {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if(this.field[i][j]=='.') {
                    return false;
                }
        
        return true;
    }

    /**
    * Получить массив поля
    */
    getField = () => {
        return this.field;
    }

    /**
    * Получить значение клетки
    */
    getSquare = (i, j) => {
        return this.field[i][j];
    }

    /**
    * Записать значение в клетку поля
    */
    setState = (i, j, value) => {
        this.field[i][j] = value;
    }

    /**
    * Проверить смог ли победить компьютер или игрок в партии 
    */
    checkWinner = () => {
        if (this.field[0][0] == this.playerState &&
            this.field[0][1] == this.playerState &&
            this.field[0][2] == this.playerState) {
            this.playerScore++;
            return true;
        }

        else if (this.field[1][0] == this.playerState &&
            this.field[1][1] == this.playerState &&
            this.field[1][2] == this.playerState) {
            this.playerScore++;
            return true;
        }

        else if (this.field[2][0] == this.playerState &&
            this.field[2][1] == this.playerState &&
            this.field[2][2] == this.playerState) {
            this.playerScore++;
            return true;
        }

        else if (this.field[0][0] == this.playerState &&
            this.field[1][0] == this.playerState &&
            this.field[2][0] == this.playerState) {
            this.playerScore++;
            return true;
        }

        else if (this.field[0][1] == this.playerState &&
            this.field[1][1] == this.playerState &&
            this.field[2][1] == this.playerState) {
            this.playerScore++;
            return true;
        }

        else if (this.field[0][2] == this.playerState &&
            this.field[1][2] == this.playerState &&
            this.field[2][2] == this.playerState) {
            this.playerScore++;
            return true;
        }

        else if (this.field[0][0] == this.playerState &&
            this.field[1][1] == this.playerState &&
            this.field[2][2] == this.playerState) {
            this.playerScore++;
            return true;
        }

        else if (this.field[0][2] == this.playerState &&
            this.field[1][1] == this.playerState &&
            this.field[2][0] == this.playerState) {
            this.playerScore++;
            return true;
        }

        ///////////////////////////////////////////////////

        else if (this.field[0][0] == this.computerState &&
            this.field[0][1] == this.computerState &&
            this.field[0][2] == this.computerState) {
            this.computerScore++;
            return true;
        }

        else if (this.field[1][0] == this.computerState &&
            this.field[1][1] == this.computerState &&
            this.field[1][2] == this.computerState) {
            this.computerScore++;
            return true;
        }

        else if (this.field[2][0] == this.computerState &&
            this.field[2][1] == this.computerState &&
            this.field[2][2] == this.computerState) {
            this.computerScore++;
            return true;
        }

        else if (this.field[0][0] == this.computerState &&
            this.field[1][0] == this.computerState &&
            this.field[2][0] == this.computerState) {
            this.computerScore++;
            return true;
        }

        else if (this.field[0][1] == this.computerState &&
            this.field[1][1] == this.computerState &&
            this.field[2][1] == this.computerState) {
            this.computerScore++;
            return true;
        }

        else if (this.field[0][2] == this.computerState &&
            this.field[1][2] == this.computerState &&
            this.field[2][2] == this.computerState) {
            this.computerScore++;
            return true;
        }
        else if (this.field[0][0] == this.computerState &&
            this.field[1][1] == this.computerState &&
            this.field[2][2] == this.computerState) {
            this.computerScore++;
            return true;
        }

        else if (this.field[0][2] == this.computerState &&
            this.field[1][1] == this.computerState &&
            this.field[2][0] == this.computerState) {
            this.computerScore++;
            return true;
        }
        else
            return false;

    }

    /**
    * Зачистить поле
    */
    clearField = () => {
        this.field = [
            ['.', '.', '.'],
            ['.', '.', '.'],
            ['.', '.', '.']
        ];
    }

    /**
    * Получить счёт игрока
    */
    getPlayerScore = () => {
        return this.playerScore;
    }

    /**
    * Получить счёт компьютера
    */
    getComputerScore = () => {
        return this.computerScore;
    }


}