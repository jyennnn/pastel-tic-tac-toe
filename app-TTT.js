// // 2nd try 

// const allBoxes = document.querySelectorAll(".box");
// console.log(allBoxes);


// // player O 
// const playerO = (box) => {

//     box.addEventListener("click", () => {
//             box.innerHTML = "";
//             const textO = document.createTextNode("O");
//             box.appendChild(textO);
//         }); 
// };



// // player X 
// const playerX = (box) => {

//         box.addEventListener("click", () => {
//             box.innerHTML = "";
//             const textX = document.createTextNode("X");
//             box.appendChild(textX);
//         }); 
// }; 


// // gameplay 
// const playTTT = () => {
//     let turnCounter = 0; 
//     const totalTurns = 9;

//     while (turnCounter < totalTurns) {
//         turnCounter ++;
//         console.log(turnCounter);
//         // if odd
//         if (turnCounter % 2 !==0) {
//             allBoxes.forEach(box => {
//                 box.addEventListener("click", () => {
//                 playerO(box);
//                 })
//             });
//         } 
//         else {
//             allBoxes.forEach(box => {
//                 box.addEventListener("click", () => {
//                 playerX(box);
//                 })
//             });
//         }
//     }
// };
    
// playTTT();


// try again -----


// Constants & Variables 
// ---------------------------

// queryselectors from html
const boxArray = document.querySelectorAll(".box");
const resetButtonHere = document.querySelector("#reset-button-here")
const gameConsole = document.querySelector("#game-console");
let startButton = document.querySelector("#game-start");

// winning combinations
const winArray = [ 
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [6, 4, 2], [0, 4, 8]
]

// game status info 
let gameStatus = "start";
let currentPlayer = "O";
let turnCounter = 0;

// game text to store game progress 
let gameText = document.createElement("h5")
gameText.classList.add("game-text")

// create reset button when game ends 
const resetButton = document.createElement("button")
resetButton.classList.add("reset-button")
resetButton.innerText = "RESET"


// Gameplay 
// ---------------------------

// game start 
const playTTT = () => {
    // 2. remove start button 
    startButton.remove();
    // 3. add text to say whose turn it is 
    gameConsole.appendChild(gameText)
    gameText.innerText = "Player O's turn"

        // 4. all boxes - listen to user's click, once click, play a turn 
        boxArray.forEach(box => 
        box.addEventListener("click", playTurn))
}

const gameStart = () => {
    // 1. start button - listen to user's click 
    startButton.addEventListener("click", playTTT)
}

gameStart();

// 5. play a turn 
const playTurn = (e) => { 
    // playerO turn
    if (currentPlayer === "O") {
        // 6. create text O and append to box 
        const textO = document.createTextNode("O")
        e.target.appendChild(textO)
        e.target.removeEventListener("click", playTurn)

        // 7. change player to X 
        currentPlayer = "X"
        gameText.innerText = "Player X's turn"
        turnCounter ++

        // 8. Check if any winners 
        checkScore()
    } 

    // playerX turn
    else if (currentPlayer === "X") {
        // 11. create text X and append to box 
        const textX = document.createTextNode("X")
        e.target.appendChild(textX)
        e.target.removeEventListener("click", playTurn)

        // 12. change player to X 
        currentPlayer = "O"
        gameText.innerText = "Player O's turn"
        turnCounter ++

        // 13. Check if any winners
        checkScore()
    }

    
}

const checkScore = () => {
    // 9. find out what's the current selections & place in an array
    let currentBoxes = document.querySelectorAll(".box")
    let currentBoxesText = [] 
        // make an array of X & O [O, X, O...]
        currentBoxes.forEach(box =>
        currentBoxesText.push(box.innerText)
        )
    
    // 10. check if the current selections are same as any winning combos
    let oWin = 
        winArray.some(array => {
            return array.every(index => {
                return currentBoxesText[index] === "O" 
            })
        })

    let xWin = 
        winArray.some(array => {
            return array.every(index => {
                return currentBoxesText[index] === "X" 
            })
        })

        if ( oWin === true ) {
            gameText.innerText = "Player O wins!"
            gameOver()
        } else if ( xWin === true ) {
            gameText.innerText = "Player X wins!"
            gameOver()
        } else if (turnCounter === 9 ) {
            gameText.innerText = "it's a draw!"
            gameOver()
        }
    // 14. repeat until gameover
};  

// 15. if gameover, remove all click listeners and reset game
gameOver = () => {
    boxArray.forEach(box => 
        box.removeEventListener("click", playTurn))
    resetGame()
}

// 16. reset - add a reset button & refresh page 
const resetGame = () => {
    resetButtonHere.appendChild(resetButton)
    resetButton.addEventListener("click", () => {
        location.reload();
    })
}






