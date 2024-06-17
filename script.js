const cases = Array.from(document.querySelectorAll(".case"));
const modal = document.querySelector("dialog");
const messageDisplay = document.querySelector(".winner-display");
const restartBtn = document.querySelector(".restart-game");
class Player {
    constructor(name, signe) {
        this.name = name;
        this.signe = signe;
    }
}

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.game = [null, null, null, null, null, null, null, null, null];
        this.gameCases = cases;
        this.playerTurn = true;
    }

    resetGame() {
        cases.forEach(element => {
            element.textContent = "";
        });
        this.game = [null, null, null, null, null, null, null, null, null];
        
    }

    playTurn() {
        if (this.playerTurn) {
            this.playerTurn = false;
            return this.player1;
        } else {
            this.playerTurn = true;
            return this.player2;
        }
    }

    setCase(index) {
        if (this.game[index] === null) {
            const currentPlayer = this.playTurn();
            this.gameCases[index].textContent = currentPlayer.signe;
            this.game[index] = currentPlayer.signe;
            return true;
        }
        return false;
    }

    checkWin() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (this.game[a] && this.game[a] === this.game[b] && this.game[a] === this.game[c]) {
                return this.game[a] === this.player1.signe ? this.player1 : this.player2;
            }
        }

        return null;
    }
    checkDraw(){
        if(!this.game.includes(null)){
            return true;
        }
        return false;
    }
}

const player1 = new Player("ahmed", 'X');
const player2 = new Player("walid", 'O');
const game = new Game(player1, player2);


cases.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const caseSet = game.setCase(index);
        if (caseSet) {
            const winner = game.checkWin();
            const draw = game.checkDraw();
            if (winner) {
                messageDisplay.textContent = `le joueur ${winner.name} a gagné`;
                modal.showModal();
                
            }
            if(draw){
                messageDisplay.textContent = `le partie est null`;
                modal.showModal();
                
            }

        }
    });
});
restartBtn.addEventListener("click",function(){
    modal.close();
    game.resetGame();
});

