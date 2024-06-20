
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
        var row = parseInt(Math.floor((index - 1) / 3));
        var column = parseInt(Math.floor((index - 1) % 3));
        
        gameArray[row][column] = letter;
        
        
    }
    const displayBoard = (function(){
        for(let i = 0; i < gameArray.length; i++){
            console.log(gameArray[i]);
            
        }
    })


    console.log("Game created!");
    return {gameArray, setBoard, displayBoard}
})();

const displayController = (function(){
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
                console.log("Someone Won!");
                return;
            }

            count = 0;
        }
        console.log("No wins yet");
        
    })

    const checkDiagonal= (function(gameArray){
        var count = 0;
        var letterhold = gameArray[0][0];
        
        for(let i = 0; i < gameArray.length; i++){
            if(letterhold == gameArray[i][i]){
                count++;
            }else{
                break;
            }
        }
        if(count == 3){
            console.log("Diagonal Win");
            return;
        }
        count = 0;
        letterhold =  gameArray[0][2];
        console.log(letterhold);
        var j = gameArray.length - 1;
        for(let i = 0 ; i < gameArray.length; i++){
            
            
            //console.log(j);
            if(letterhold == gameArray[i][j]){
                count++;
                j--;
            }else{
                break;
            }
        }
        
        if(count == 3){
            
            console.log("Diagonal Win");
            return;
        }

        
    })

    const startGame = (function(gameArray, player1, player2){
        for(var i = 0; i < 9; i++){
            if(i % 2 == 0){
                player1.indexInput();
            }
        }

    })

    return{checkRow, checkDiagonal, startGame};

})();

function Player(letter){

    var playerLetter = letter;

    const indexInput = (function(){

        var num = prompt("Type a number where you want to place " + playerLetter);
        gameBoard.setBoard(num, playerLetter);


    })



    return{playerLetter, indexInput};
}



//tests

const player1 = new Player("X");
const player2 = new Player("O");

//player1.indexInput();



 gameBoard.setBoard(3, "X");
 gameBoard.setBoard(5, "X");
 gameBoard.setBoard(7, "X");
gameBoard.displayBoard();
displayController.checkRow(gameBoard.gameArray);
displayController.checkDiagonal(gameBoard.gameArray);

