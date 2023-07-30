function Player(name, mark) {
    return { name, mark };
}

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

const gameBoard = (function(player1, player2) {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    let currentPlayer = player1;
    let winner = null;

    function restart() {
        currentPlayer = player1;
        winner = null;
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                board[i][j] = "";
            }
        }
    }

    function endTurn() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function getCell(row, col) {
        return board[row][col];
    }

    function isCellEmpty(row, col) {
        return !board[row][col];
    }

    function setCell(row, col) {
        if (isCellEmpty(row, col) && !isOver()) {
            board[row][col] = currentPlayer.mark;
        }
        determineWinner()
        if (!isOver())
            endTurn();
    }

    function getWinner() {
        return winner;
    }

    function isOver() {
        return !!winner || board.reduce((state, row) => {
            return state && row.reduce((state, cell) => {
                return state && !!cell;
            }, true)
        }, true);
    }

    function determineWinner() {
        for (let i = 0; i < 3; ++i) {
            if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0])
                winner = currentPlayer;
            if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i])
                winner = currentPlayer;
        }
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0])
            winner = currentPlayer;
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1])
            winner = currentPlayer;
    }

    return {
        getCell,
        isCellEmpty,
        setCell,
        endTurn,
        isOver,
        getWinner,
        restart
    }

})(player1, player2);

const displayController = (function(board) {
    const boardDisplay = document.querySelector(".board tbody");

    const winnerP = document.querySelector(".winner-p");
    const cells = boardDisplay.querySelectorAll("td");
    cells.forEach(cell => cell.addEventListener("click", () => {
        let index = Array.from(cells).indexOf(cell);
        let row = Math.floor(index / 3);
        let col = index % 3;
        board.setCell(row, col);
        render();
        let winner = gameBoard.getWinner();
        if (gameBoard.isOver()) {
            if (winner) {
                winnerP.textContent = `Congratulations, ${winner.name}!`
            } else {
                winnerP.textContent = "Tie!"
            }
        }
    }));

    const setNamesButton = document.querySelector("#set-names");
    const restartButton = document.querySelector("#restart");
    const p1Name = document.querySelector("#p1-name");
    const p2Name = document.querySelector("#p2-name");
    
    setNamesButton.addEventListener("click", () => {
        player1.name = p1Name.value;
        player2.name = p2Name.value;
    });

    restartButton.addEventListener("click", () => {
        gameBoard.restart();
        winnerP.textContent = "";
        render();
    });

    function render() {
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                boardDisplay.children[i].children[j].textContent = board.getCell(i, j);
            }
        }
    }

    return {
        render
    }
})(gameBoard);

displayController.render();