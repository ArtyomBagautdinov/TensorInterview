import {Component} from './component.js'

/**
* Компонент контейнера для поля боя
*/

export class Battlefield extends Component {
    render = () =>{
        let battlefield = document.createElement('div');
        main.setAttribute('class','battlefield');

        let battlefieldContainer = document.createElement('div');
        battlefieldContainer.setAttribute('class','battlefield__container')
        
        let battlefieldEnemy= document.createElement('div');
        battlefieldContainer.setAttribute('class','battlefield__enemy')

        let battlefieldPlayer = document.createElement('div');
        battlefieldContainer.setAttribute('class','battlefield__player')

        battlefieldContainer.append(battlefieldEnemy);
        battlefieldContainer.append(battlefieldPlayer);

        battlefield.append(battlefieldContainer);

        let result = document.createElement('div');
        result.append(battlefield);

        return result.innerHTML;
    }
}