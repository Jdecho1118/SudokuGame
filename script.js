var numSelected = null;
var errors = 0;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload = function () {
    initializeGame();
};

function initializeGame() {
    createNumberButtons();
    createGameBoard();
}

function createNumberButtons() {
    for (let i = 1; i <= 9; i++) {
        let numberButton = document.createElement("div");
        numberButton.id = i;
        numberButton.innerText = i;
        numberButton.addEventListener("click", selectNumber);
        numberButton.classList.add("number");
        document.getElementById("digits").appendChild(numberButton);
    }
}

function createGameBoard() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r + "-" + c;
            if (board[r][c] !== "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            addGridLinesClasses(tile, r, c);
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}

function addGridLinesClasses(tile, row, col) {
    if (row === 2 || row === 5) {
        tile.classList.add("horizontal-line");
    }
    if (col === 2 || col === 5) {
        tile.classList.add("vertical-line");
    }
}

function selectNumber() {
    if (numSelected !== null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText !== "") {
            return;
        }

        let [row, col] = this.id.split("-").map(Number);

        if (solution[row][col] === numSelected.id) {
            this.innerText = numSelected.id;
            checkForWin();
        } else {
            handleIncorrectMove();
        }
    }
}

function handleIncorrectMove() {
    errors += 1;
    document.getElementById("errors").innerText = errors;
    // Provide additional feedback to the user (e.g., highlight incorrect tiles)
}

var numSelected = null;
var errors = 0;
var highScore = 0;

function checkForWin() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r + "-" + c);
            if (parseInt(tile.innerText) !== parseInt(solution[r][c])) {
                return false;
            }
        }
    }
    if (errors < highScore || highScore === 0) {
        highScore = errors;
        document.getElementById("highScoreValue").innerText = highScore;
    }
    alert("Congratulations! You've solved the puzzle!");
    // Additional actions upon winning
}


function resetGame() {
    clearBoard();
    resetVariables();
}

function clearBoard() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r + "-" + c);
            if (!tile.classList.contains("tile-start")) {
                tile.innerText = "";
            }
        }
    }
}


function resetVariables() {
    if (numSelected) {
        numSelected.classList.remove("number-selected");
        numSelected = null;
    }
    errors = 0;
    document.getElementById("errors").innerText = errors;
}
