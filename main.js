const fields = document.querySelector(".fields");
const fieldRows = []

const startButton = document.querySelector(".start");

const global_Scale_Elem = document.querySelector(".main-wrapper");
const scale_Elem = document.querySelector(".scale");

const score = document.querySelector(".score-number");

const fieldItems = [];

const time = document.querySelector(".time");

let multipleFieldsTotal = 0;
let multipleFieldCount = 0;

let gamePlayed = false;







function Event_Read() {
    addEventListener("mousedown", (e) => {

        if (e.target.classList.contains("reset")) Refresh_Values(false);
        else if (!gamePlayed) {
            if (e.target.classList.contains("field-item")) Field_Click(e.target);
            if (e.target.classList.contains("field-item-caption")) Field_Click(e.target.parentNode);
        }
    })
}









function Run() {

    startButton.disabled = true;

    Reset(true);

    // setTimeout(Refresh_Values, 200, true, true, false);

    timeReset = false;
    setTimeout(TimerInitialize, 1000, false);

    gamePlayed = false;
}

function Reset(launch) {

    if (launch) {
        if (gamePlayed) Round();
        else Refresh_Values(true, true, false);
    } else Refresh_Values(false, false, true);

    Score_Initialize(-totalScore, true);
    TimerInitialize(true);

    // if (!gameLaunched) setTimeout(fieldsDisplayOff, 1500);

    gameLaunched = false;
}


function Round() {
    setTimeout(Refresh_Values, 100, false, true, true);
    setTimeout(Refresh_Values, 500, false, true, false);
}



function Create_Fields() {

    let q = 0;

    for (let rowI = 0; rowI < 10; rowI++) {

        fieldRow = document.createElement("div");
        fieldRow.className = "field-row";
        fields.appendChild(fieldRow)

        fieldRows[rowI] = fieldRow;

        for (let rowItem = 0; rowItem < 10; rowItem++) {

            fieldItem = document.createElement("div");
            fieldItem.className = "field-item";
            fieldRow.appendChild(fieldItem);

            fieldItemCaption = document.createElement("div");
            fieldItemCaption.className = "field-item-caption";
            fieldItem.appendChild(fieldItemCaption);

            fieldItems[q] = [fieldItem, fieldItemCaption, 0, 0];
            q++;

        }

    }
    Set_Width();
}

// let timeOut1 = false;
// let timeOut2 = false;

function Refresh_Values(
    load,
    refreshValues,
    deleteValues,
) {

    // if (timeOut1) return;
    // timeOut1 = true;

    let i = 0;

    if (load) doRefreshValues = true;

    multipleFieldsTotal = 0;
    multipleFieldCount = 0;


    Refresh_Colorize(fieldItems[0]);

    function Refresh_Colorize(Field) {

        const Item = Field[0];
        const ItemValue = load ? "" : Field[2];
        const isMultiple = Field[3];

        Item.classList.add(Colorize(ItemValue, isMultiple), "colorized")

        if (i >= 99) {
            i = 0;
            if (deleteValues) setTimeout(Delete, 300, fieldItems[0][0]);
            else if (refreshValues) setTimeout(Refresh, 70, fieldItems[0][0]);
        } else {
            i++;
            Refresh_Colorize(fieldItems[i]);
        }
    }

    // refreshButton.addEventListener("mouseup", () => {

    //     // if (timeOut2) return;
    //     // else timeOut2 = true

    //     i2 = 0

    //     setTimeout(Refresh, 200, fieldItems[0][0]);

    // })

    function Refresh(Item) {

        let c = Math.floor(Math.random() * (101 - 1)) + 1;
        const isMultipleOfTen = Number.isInteger(c / 10);

        if (isMultipleOfTen) multipleFieldsTotal++;

        fieldItems[i][1].innerHTML = c;
        fieldItems[i][2] = c;
        fieldItems[i][3] = isMultipleOfTen;


        let ItemLength = Item.classList.length
        for (let e = 0; e < ItemLength; e++) {
            Item.classList.remove(Item.classList[0]);
        }

        Item.classList.add("field-item", "field-item-show");

        if (i > 99) return;
        else {
            i++;
            setTimeout(Refresh, 5, fieldItems[i][0]);
        }
    }

    function Delete(Item) {

        fieldItems[i][1].innerHTML = "";


        let ItemLength = Item.classList.length
        for (let e = 0; e < ItemLength; e++) {
            Item.classList.remove(Item.classList[0]);
        }

        Item.classList.add("field-item");

        if (i > 99) return;
        i++;
        setTimeout(Delete, 5, fieldItems[i][0])
    }

}





function Colorize(val, isMultiple, active) {

    if (val === "") return "colorize-black";
    if (isMultiple || Number.isInteger(val / 10)) {

        return (val === 100) ? "colorize-max" :
            (val >= 75) ? "colorize-red" :
            (val >= 40) ? "colorize-yellow" :
            (val >= 15) ? "colorize-green" :
            "colorize-white"
    } else return "colorize-dark";
}


function Set_Width() {

    rowHeight = fields.offsetWidth / 10 - 5 + "px";

    fieldRows.forEach(row => {
        row.style.height = rowHeight
    });
}










function Field_Click(targetField) {

    if (["colorize-max", "colorize-red", "colorize-yellow", "colorize-green", "colorize-white"]
        .some((colorizeClass) => targetField.classList.contains(colorizeClass))) return;




    let fieldDigit = Math.abs(+targetField.firstChild.innerHTML);
    console.log(fieldDigit);

    multipleFieldConfirm = Number.isInteger(fieldDigit / 10);

    let scoreIncrement = multipleFieldConfirm ? +fieldDigit : -fieldDigit;
    Score_Initialize(scoreIncrement);



    if (multipleFieldConfirm) multipleFieldCount++;
    else targetField.firstChild.innerHTML = -fieldDigit;

    if (multipleFieldCount === multipleFieldsTotal) Round()

    Click_Colorize();

    function Click_Colorize() {

        if (targetField.classList.contains("colorized")) return;

        let colorize = Colorize(fieldDigit, multipleFieldConfirm)
        let colorizeActive = colorize + "-active";

        targetField.classList.add(colorize, colorizeActive, "colorized")

        setTimeout(() => {
            targetField.classList.remove(colorizeActive);
        }, 180)
    }

}



function Iterator(ConditionFit) {
    return ConditionFit ? 1 : -1;
}



let totalScore = 0;
let previousScore = 0;

let scoreIterator = 1;

let scoreRunning = false;

// function Score_Initialize(scoreIncrement, reset, iteration) {

//     let increment = Math.abs(scoreIncrement);

//     if (reset) iteration = Iterator(!(-increment > 0))

//     let iterationSpeed = reset ? 0 : 7;

//     if (scoreRunning) prevScore = nextScore;
//     nextScore += scoreIncrement;
//     // prevScore += scoreIncrement;
//     // score.innerHTML = prevScore;

//     scoreRunning = true;
//     Set_Score();


//     function Set_Score() {

//         if (prevScore === nextScore) {
//             scoreRunning = false;
//             return;
//         }
//         prevScore += iteration;
//         score.innerHTML = prevScore;

//         setTimeout(Set_Score, iterationSpeed);
//     }
// }

function Score_Initialize(increment, reset) {

    previousScore = +score.innerHTML;
    totalScore += increment;

    if (reset) score.innerHTML = 0;
    else Set_Score();

    function Set_Score() {

        iteration = Iterator(totalScore - previousScore > 0);

        if (previousScore === totalScore) {
            return;
        }
        previousScore += iteration;
        score.innerHTML = previousScore;

        setTimeout(Set_Score, 7);
    }
}



let timeReset = false;

function TimerInitialize(reset) {

    let startTime = "01:00";


    let sec = 5;

    if (reset) {
        timeReset = true;
    } else Timer();

    function Timer() {


        if (timeReset || sec === 0) {

            time.innerHTML = startTime;
            Refresh_Values(false, false, false);

            startButton.disabled = false;
            gamePlayed = true;

            return;
        }

        currentTime = "00" + ":" + sec;
        time.innerHTML = currentTime;

        sec -= 1;

        setTimeout(Timer, 1000);
    }
}


function Scale(val) {
    fields.style.width = val + "%";

    fields.style.fontSize = val / 115 + "em";

    Set_Width()
}




Event_Read();
Create_Fields();