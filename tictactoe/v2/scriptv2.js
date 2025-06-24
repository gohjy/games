let isPlay = true;

const boxes = [];
const gridSize = 3;

for (let i=0; i<gridSize; i++) {
    const row = [];
    for (let j=0; j<gridSize; j++) {
        row.push(document.querySelector(`#a${i}_${j}`));
    }
    boxes.push(row);
}

const players = 2;

let turns = ["◯", "✕"];
let turnCount = 0;

const equal = (...boxes) => {
    const first = boxes[0].dataset.owner;
    return !!first && boxes.every(x => x.dataset.owner === first);
}

const checkForWin = () => {
    // Rows and columns
    
    let diag1 = [];
    let diag2 = [];
    for (let n=0; n<gridSize; n++) {
        let rowsToCheck = [];
        let colsToCheck = [];
        for (let m=0; m<gridSize; m++) {
            rowsToCheck.push(boxes[n][m]);
            colsToCheck.push(boxes[m][n]);
        }
        if (equal(...rowsToCheck)) return rowsToCheck;
        if (equal(...colsToCheck)) return colsToCheck;

        diag1.push(boxes[n][n]);
        diag2.push(boxes[n][gridSize-n-1]);
    }

    console.log(diag1);
    console.log(diag2);

    if (equal(...diag1)) return diag1;
    if (equal(...diag2)) return diag2;
    return null;
}

const isAllFilled = () => {
    return boxes.flat(1).every(x => !!x.dataset.owner);
}

const evHandler = (ev) => {
    if (!isPlay) return false;
    if (ev.target.dataset.owner) return false;
    turnCount += 1;
    ev.target.textContent = ev.target.dataset.owner = turns[turnCount % turns.length];
    const winnerBox = checkForWin();
    if (winnerBox) {
        for (let box of winnerBox) {
            box.classList.add("win");
        }
        document.querySelector("#sr").textContent = `${turns[turnCount % turns.length]} won the game!`;
        isPlay = false;
        return true;
    } else {
        if (isAllFilled()) {
            document.querySelector("#sr").textContent = "It's a tie!";
            isPlay = false;
            return true;
        }
    }
}

for (let box of boxes.flat(1)) {
    box.addEventListener("click", evHandler);
}


const reset = () => {
    for (let box of boxes.flat(1)) {
        box.textContent = box.dataset.owner = "";
        box.classList.remove("win");
    }

    document.querySelector("#sr").innerHTML = "&nbsp;";

    turnCount = 0;
    isPlay = true;
}

document.querySelector("#reset-button").addEventListener("click", reset);

document.querySelector("#help-button").addEventListener("click", () => {
    document.querySelector('#instructions').classList.toggle("invisible");
})