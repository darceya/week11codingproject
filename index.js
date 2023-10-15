const tiles = document.querySelectorAll(".tile"); 
const playerX = 'X';
const playerO = 'O';
let turn = playerX;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elments 
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
const turnText = document.getElementById("turn-text");
playAgain.addEventListener("click", startNewGame);


/*
//Sounds
const gameOverSound = new Audio('sounds/game_over.wav');
const click = new Audio('sounds/click.wav');
*/

function setHoverText() {
    tiles.forEach((tile) => {
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });
    const hoverClass = `${turn.toLowerCase()}-hover`; 

    tiles.forEach((tile) => {
        if (tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    });
    turnText.textContent = `Player ${turn}'s turn`;
}
setHoverText();

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function tileClick(event) {
    if (gameOverArea.classList.contains("visible")) {
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerText !="") {
        return;
    }
    if(turn === playerX) {
        tile.innerText = playerX;
        boardState[tileNumber - 1] = playerX;
        turn = playerO;  
    }
    else {
        tile.innerText = playerO;
        boardState[tileNumber - 1] = playerO;
        turn = playerX;  
    }
   /* clickSound.play(); */

   setHoverText();
   checkWinner();
}

function checkWinner() {
    for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, strikeClass} = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if (tileValue1 != null && 
        tileValue1 === tileValue2 && 
        tileValue1 === tileValue3) {
        strike.classList.add(strikeClass); 
        gameOverScreen(tileValue1);
        return;
        }
    }
    const allTileFilledIn = boardState.every((tile) => tile !== null);
        if (allTileFilledIn) {
            gameOverScreen(null);
        }
}

function gameOverScreen(winnerText) {
    let text = "Draw!";
    if (winnerText != null) {
        text = `Winner is ${winnerText}!`;
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
    /* gameOverSound.play();  */ 
}

function startNewGame() {
    strike.className = "strike"; 
    gameOverArea.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = playerX;
    setHoverText(); 
    turnText.textContent = `Player ${turn}'s turn`; 
}

const winningCombinations = [
    {combo:[1,2,3], strikeClass: "strike-row-1"},
    {combo:[4,5,6], strikeClass: "strike-row-2"},
    {combo:[7,8,9], strikeClass: "strike-row-3"},
    {combo:[1,4,7], strikeClass: "strike-column-1"},
    {combo:[2,5,8], strikeClass: "strike-column-2"},
    {combo:[3,6,9], strikeClass: "strike-column-3"},
    {combo:[1,5,9], strikeClass: "strike-diagonal-1"},
    {combo:[3,5,7], strikeClass: "strike-diagonal-2"},
]