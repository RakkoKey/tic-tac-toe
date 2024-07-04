
const gameBoard = (function (){
    console.log("Creating Game...");
    const gameArray = 
    [[" ", " ", " "], 
    [" "," ", " "], 
    [" "," ", " "]];

    const setBoard = function(index, letter){
        if(index > 9){
            console.log("That is not a valid index")
        }
        var row = parseInt(Math.floor((index ) / 3));
        var column = parseInt(Math.floor((index ) % 3));
        
        gameArray[row][column] = letter;
        
        
    }
    const displayBoard = (function(){
        for(let i = 0; i < gameArray.length; i++){
            console.log(gameArray[i]);
            
        }
    })
    const getBoardIndex = function(index){
        var row = parseInt(Math.floor((index - 1) / 3));
        var column = parseInt(Math.floor((index - 1) % 3));
        if(gameArray[row][column] != " "){
            return true;
        }else{
            return false;
        }
    }
    

    const resetBoard = function(){
        for(let i = 0; i < gameArray.length; i++){
            for(let j = 0; j < gameArray.length; j++){
                gameArray[i][j] = " ";
            }
        }
    }


    console.log("Game created!");
    return {resetBoard, getBoardIndex, gameArray, setBoard, displayBoard}
})();

const displayController = (function(){
    var turns = 0;
    const checkRow = (function(gameArray){

        var count = 0;

        for(let i = 0; i < gameArray.length; i++){
            //hold the first letter in the row
            var letterhold = gameArray[i][0];

            if(letterhold == " "){
                continue;
            }

            //checks every column in the row
            for(let j = 0; j < gameArray.length; j++){

                if(gameArray[i][j] == letterhold){
                    count++;
                    console.log(count);
                }

            }

            //if count is 3, we have a match
            if(count == 3){
                if(letterhold == player1.playerLetter){
                    player1.winner = true;
                }else{
                    player2.winner = true;
                }
                console.log("Row Win!");
                return true;
            }

            count = 0;
        }
        
        return false;
        
    })
    const checkDiagonal= (function(gameArray){
        var count = 0;
        var letterhold = gameArray[0][0];
        
        for(let i = 0; i < gameArray.length; i++){
            if(letterhold == gameArray[i][i] && letterhold != " "){
                count++;
            }else{
                break;
            }
        }
        if(count == 3){
            if(letterhold == player1.playerLetter){
                player1.winner = true;
            }else{
                player2.winner = true;
            }
            console.log("Diagonal Win");
            return true;
        }


        count = 0;
        letterhold =  gameArray[0][2];
        console.log(letterhold);
        var j = gameArray.length - 1;
        for(let i = 0 ; i < gameArray.length; i++){
            
            
            //console.log(j);
            if(letterhold == gameArray[i][j] && letterhold != " "){
                count++;
                j--;
            }else{
                break;
            }
        }
        
        if(count == 3){
            if(letterhold == player1.playerLetter){
                player1.winner = true;
            }else{
                player2.winner = true;
            }
            console.log("Diagonal Win");
            return true;
        }
        return false;

        
    })
    const checkColumn = (function(gameArray){
        var count = 0;
        for(let i = 0; i < gameArray.length; i++){
            let j = 0;
            var letterhold = gameArray[j][i]
            if(letterhold == " "){
                
                continue;
            }
            for(j = 0; j < gameArray.length; j++){
                 
                if(letterhold == gameArray[j][i]){
                    count++;
                }
            }

            if(count == 3){
                if(letterhold == player1.playerLetter){
                    player1.winner = true;
                }else{
                    player2.winner = true;
                }
                console.log("Column Win");
                return true;
            }else{
                count = 0;
                j++;
            }
        }
        return false;
    })

    const wrapper = (function(gameArray){
        if(checkRow(gameArray) ||
        checkDiagonal(gameArray) ||
        checkColumn(gameArray)){
            return true;
        }
        return false;
    })

    const startGame = (function(gameArray, player1, player2){
        documentController.addListeners();
        documentController.setLetter(player1.playerLetter);
        console.log(player1.playerLetter);

    })
    const endGame = (function(){
        documentController.removeListeners();
        if(player1.winner == true){
            playerturn.innerHTML = `${player1.name} Wins!`;
        }else if(player2.winner == true){
            playerturn.innerHTML = `${player2.name} Wins!`;
        }else{
            playerturn.innerHTML = "Draw!";
        }
        var resetbutton = document.createElement("button"); 
        resetbutton.addEventListener("click", function(){
            console.log("reset button clicked");
            gameBoard.resetBoard();
            documentController.resetDisplay();
            displayController.startGame(gameBoard.gameArray, player1, player2);
            displayController.turns = 0;
            playerturn.innerHTML = `${player1.name}\'s Turn`;
        });  
        
        resetbutton.innerHTML = "Restart Game";
        button.replaceWith(resetbutton);


    })

    return{wrapper, startGame, turns, endGame};

})();

function Player(letter, newname){

    var playerLetter = letter;
    var playerTurn = false;
    var winner = false;
    var name = newname;

    return{playerLetter, playerTurn, winner,name};
}

const documentController = (function(){
    let letter;
    const setLetter = function(letter){
        this.letter = letter;
    }
    const getLetter = function(){
        return this.letter;
    }

    const updateBox = function(element,index){
        var row = parseInt(Math.floor((index ) / 3));
        var column = parseInt(Math.floor((index ) % 3));
        
        if(gameBoard.gameArray[row][column] == " "){
            displayController.turns++;
            
            console.log("Turn: " + displayController.turns);

            console.log(this.letter);
            element.innerHTML = this.letter;
            element.classList.add(`${letter}`);
            console.log(documentController.getLetter() + ";" + player1.playerLetter)
            gameBoard.setBoard(index, this.letter);
            if(displayController.turns == 9){
                displayController.wrapper(gameBoard.gameArray);
                console.log("test");
                displayController.endGame();
                return;
            }
            if(this.letter == player1.playerLetter){
                playerturn.innerHTML = `${player2.name}\'s Turn`;
                documentController.setLetter(player2.playerLetter)
                player1.playerTurn = false;
                player2.playerTurn = true;
                
            }else{
                playerturn.innerHTML = `${player1.name}\'s Turn`;
                player2.playerTurn = false;
                player1.playerTurn = true;
                documentController.setLetter(player1.playerLetter)
                
            }
        }
    }
    const handler = function(){
        var index = boxes.indexOf(event.target);
                //gameBoard.setBoard(index + 1, this.letter);
                documentController.updateBox(event.target, index)
                gameBoard.displayBoard();
                if(displayController.wrapper(gameBoard.gameArray)){
                    displayController.endGame();
                }
    }
    const addListeners = function(){
        console.log("listeners")
        for(let i = 0; i < boxes.length; i++){
            boxes[i].addEventListener("click", handler);
                
            
             
        }
    }

    const removeListeners = function(){
        for(let i = 0; i < boxes.length; i++){
            boxes[i].removeEventListener("click", handler);
        }
    }

    const resetDisplay = function(){
        for(let i = 0; i < boxes.length; i++){
            boxes[i].innerHTML = i + 1;
        }
    }
    return {setLetter, getLetter, updateBox, addListeners, removeListeners, resetDisplay};
})();


//tests


var boxes = Array.prototype.slice.call(document.getElementsByClassName("box"));

console.log(boxes);

//documentController.addListeners();
const player1 = new Player("X", "1");
const player2 = new Player("O", "2");
var button = document.getElementById("startGame");
let playerturn = document.createElement("div");
playerturn.setAttribute("id", "playerturn");
button.addEventListener("click", function(){
    const player1Name = new FormData(document.getElementById("player1"));
    const player2Name = new FormData(document.getElementById("player2"));
    player1.name = player1Name.get("player1name");
    player2.name = player2Name.get("player2name");
    //var player1 = new Player("X", player1Name.get("player1name"));
    //var player2 = new Player("O", player2Name.get("player2name"));
    displayController.startGame(gameBoard.gameArray,player1,player2);
    
    document.body.appendChild(playerturn);
    playerturn.innerHTML = `${player1.name}\'s Turn`;

})


//gameBoard.setBoard(1, "X");
//gameBoard.setBoard(4, "X");
//gameBoard.setBoard(7, "X");
gameBoard.displayBoard();
//displayController.startGame(gameBoard.gameArray, player1, player2);
//displayController.wrapper(gameBoard.gameArray);


