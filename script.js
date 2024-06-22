
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
    const getBoardIndex = function(index){
        var row = parseInt(Math.floor((index - 1) / 3));
        var column = parseInt(Math.floor((index - 1) % 3));
        if(gameArray[row][column] != " "){
            return true;
        }else{
            return false;
        }
    }


    console.log("Game created!");
    return {getBoardIndex, gameArray, setBoard, displayBoard}
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
                console.log("Row Win!");
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
            if(letterhold == gameArray[i][i] && letterhold != " "){
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
    const checkColumn = (function(gameArray){
        var count = 0;
        for(let i = 0; i < gameArray.length; i++){
            let j = 0;
            var letterhold = gameArray[i][j]
            if(letterhold == " "){
                continue;
            }
            for(j = 0; j < gameArray.length; j++){
                 
                if(letterhold == gameArray[j][i]){
                    count++;
                }
            }

            if(count == 3){
                console.log("Column Win");
                break;
            }else{
                count = 0;
                j++;
            }
        }
    })

    const wrapper = (function(gameArray){
        checkRow(gameArray);
        checkDiagonal(gameArray);
        checkColumn(gameArray);
    })

    const startGame = (function(gameArray, player1, player2){
        for(var i = 0; i < 9; i++){
            if(i % 2 == 0){
                //player 1 turn


                player1.indexInput();
                gameBoard.displayBoard();
            }else{
                //player 2 turn
                
                player2.indexInput();
                gameBoard.displayBoard();
            }
        }

    })

    return{wrapper, startGame};

})();

function Player(letter){

    var playerLetter = letter;

    const indexInput = (function(){

        var num = prompt("Type a number where you want to place " + playerLetter);
        while(gameBoard.getBoardIndex(num)){
            alert("That spot is already filled!");
            num = prompt("Type a number where you want to place " + playerLetter);
        }
        
        gameBoard.setBoard(num, playerLetter);


    })



    return{playerLetter, indexInput};
}



//tests

const player1 = new Player("X");
const player2 = new Player("O");

//player1.indexInput();



//gameBoard.setBoard(1, "X");
//gameBoard.setBoard(4, "X");
//gameBoard.setBoard(7, "X");
gameBoard.displayBoard();
displayController.startGame(gameBoard.gameArray, player1, player2);
displayController.wrapper(gameBoard.gameArray);


