class Battleship {
    constructor(el) {
        this.userBoard = null;
        this.pcBoard = null;
        this.user = el.querySelector('.js-user-board');
        this.pc = el.querySelector('.js-pc-board');
    
        this.initBoard();
        this.startGame();
    }
    
    initBoard() {
        this.userBoard = ['0110000100','0000000000','0000100001','0100001001','0100001001',
                        '0100000000','0000000010','0000110000','0100000000','0000111100'];
        this.pcBoard = ['0001000011','0101000000','0001000000','0001000100','0000000100',
                        '0100100100','0100000000','0101000000','0000011000','1100000010'];
    }

    startGame() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                var cellUser = document.createElement('div');
                cellUser.id = this.createCoordinate(i, j);
                cellUser.className = (this.userBoard[i][j] == '1' ? 'ship' : 'void');

                this.user.appendChild(cellUser);
        
                var cellPc = document.createElement('div');
                cellPc.id = this.createCoordinate(i, j);
                cellPc.className = (this.pcBoard[i][j] == '1' ? 'ship' : 'void');

                
                cellPc.onclick = function () { 
                    if (shot('user', this, this.el)) 
                        backfire(); 
                };

                this.pc.appendChild(cellPc);
            }
        }
    }

    createCoordinate(i, j) {
        var words = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
        return words[i] + (j + 1);
    }
}

function shot(player, cell) {
    var move = document.querySelector('.js-move');
    var userName = document.querySelector('.js-input');

    if (cell.className == 'dead' || cell.className == 'miss') {
        return false;
    }

    cell.className = (cell.className == 'ship' ? 'dead' : 'miss');

    if(cell.className == 'dead') {
        cell.innerHTML += "X";
    }

    if (document.querySelectorAll('.game-board__pc-board .ship').length === 0) {
        alert('Поздравляем! Вы победили!');
        return false;
    }

    if(player == 'user') {
        move.innerHTML+='Игрок <strong>' + userName.value + '</strong>  делает выстрел в точку: ' + cell.id + '<br><br>';
        move.scrollTop = 9999;
    }
    else {
        move.innerHTML += '<strong>Компьютер</strong> делает выстрел в точку: ' + cell.id + '<br><br>';
        move.scrollTop = 9999;
    }

    if (cell.className == 'miss') 
        return true;
}

function backfire() {
    for (let i = 100; i > 0; i--) {
        var targets = document.querySelectorAll('.game-board__user-board .ship, .game-board__user-board .void');
        if (targets.length === 0 || shot('pc', targets[Math.floor(Math.random() * targets.length)])) 
            break;
    }
    if (document.querySelectorAll('.game-board__user-board .ship').length === 0) {
        alert('Вы проиграли!');
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-battleship').forEach((item) => {
        new Battleship(item);
    });
});