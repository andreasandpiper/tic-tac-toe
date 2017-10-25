$(document).ready(function () {
        console.log("ready!");
        $("#newGame").on("click", newGame);
        $(".startGame").on("click", startGame);
        $(".1, .2, .3, .4, .5, .6, .7, .8, .9").on("click", onClickSquare)
    });

    var board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    win = [
        [1, 5, 9],
        [3, 5, 7]
    ]
    var played = [];
    var isWinner = null;
    var playerX = [];
    var playerO = [];
    var playerXName = "";
    var playerOName = "";
    var playerXTurn = true;


    function startGame() {
        //make sure there is text
        if ($("#x").val().length === 0 && $("#o").val().length === 0) {
            return;
        }

        played = [];
        isWinner = false;
        playerX = [];
        playerO = [];
        playerXName = "";
        playerOName = "";
        playerXTurn = true;

        //delete text on board
        $(".square").text("");

        //assigns players to variables
        playerXName = $("#x").val();
        playerOName = $("#o").val();

        //close modal
        $("#myModal").modal("hide");
        //change text to display names
        $(".playerX").text(playerXName);
        $(".playerO").text(playerOName);

        if (win.length != 8) {
            //create board
            createBoard();
        }

        $(".playerXDiv p").css("visibility", "visible");
        $(".playerODiv p").css("visibility", "hidden");

    }

    //show modal to get player names
    function newGame() {
        $("#myModal").find(".modal-title").text("Tic Tac Toe");
        $("#myModal").modal("show");
    }

    // ---------------------- FUNCTIONS TO RUN TIC TAC TOE -------------------------------------


    // ## creates all the possible winning solutions
    function createBoard() {
        for (var j = 0; j < board.length; j++) {
            win.push(board[j]);
            var score = [];
            for (var k = 0; k < board.length; k++) {
                score.push(board[k][j]);
            }
            win.push(score);
            score = []
        }
        return win;
    }

    function onClickSquare(event) {
        if (isWinner != false || isWinner === true) {
            return;
        }
        //get class of selected div
        var target = $(this)[0].classList[1];
        //convert class to integer
        var targetNumber = parseInt(target);
        console.log(targetNumber);
        var player = null;

        var currentPlayer = null;
        if (playerXTurn) {
            currentPlayer = playerX;
            player = playerXName;
        } else {
            currentPlayer = playerO;
            player = playerOName;

        }

        //check to see if square is already occupied
        if (!played.includes(targetNumber)) {
            //if not, add to array of picked options and what has already  been played
            currentPlayer.push(targetNumber);
            played.push(targetNumber);
            //add X or O to square
            if (currentPlayer === playerX) {
                $(this).text("X");
                $(".playerODiv p").css("visibility", "visible");
                $(".playerXDiv p").css("visibility", "hidden");
            } else {
                $(this).text("O");
                $(".playerODiv p").css("visibility", "hidden");
                $(".playerXDiv p").css("visibility", "visible");
            }

            //check if has winning combinations
            if (currentPlayer.length >= 3) {
                if (played.length > 8) {

                    newGame();
                    return;
                }
                if (checkIfWinner(currentPlayer)) {
                    isWinner = true;
                    $("#myModal").find(".modal-title").text("Congratulations " + player + ", you win!");
                    $("#myModal").modal("show");


                }
            }

            //next players turn
            playerXTurn = !playerXTurn;
        }

    }

    // // // ##checks current players list to see if it contains winning arrangements
    function checkIfWinner(playerArray) {
        for (var i = 0; i < win.length; i++) {
            var numberMatched = 0
            for (var j = 0; j < win.length + 1; j++) {
                console.log("player array: " + playerArray + " and current number check: " + win[i][j]);
                if (playerArray.includes(win[i][j])) {
                    numberMatched += 1;
                }
            }
            if (numberMatched === 3) {
                return true;
            }
        }
        return false;
    }
