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






function Event_Read() {
    addEventListener("mousedown", (e) => {

        if (e.target.classList.contains("field-item")) Field_Click(e.target);
        if (e.target.classList.contains("reset")) Refresh_Values(false);
    })
}









function Run() {

    startButton.disabled = true;

    Reset();

    setTimeout(Refresh_Values, 600, true, true, false);

    timeReset = false;
    setTimeout(TimerInitialize, 1000, false);
}

function Reset() {
    Refresh_Values(false, false, true)
    Score_Initialize(-totalScore, true);
    TimerInitialize(true);

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
            // fieldItem.className = "field-item";
            fieldRow.appendChild(fieldItem);

            fieldItems[q] = [fieldItem, 0, 0];
            q++;
        }
    }
    Set_Width();
}

// let timeOut1 = false;
// let timeOut2 = false;

function Refresh_Values(load, doRefreshValues, deleteValues) {

    // if (timeOut1) return;
    // timeOut1 = true;

    let i1 = 0;
    let i2 = 0;
    let i3 = 0;

    if (load) doRefreshValues = true;

    multipleFieldsTotal = 0;
    multipleFieldCount = 0;


    Refresh_Colorize(fieldItems[0]);

    function Refresh_Colorize(Field) {

        const Item = Field[0];
        const ItemValue = load ? "" : Field[1];
        const isMultiple = Field[2];

        Item.classList.add(Colorize(ItemValue, isMultiple))

        if (i1 >= 99) {
            if (deleteValues) setTimeout(Delete, 300, fieldItems[0][0]);
            else if (doRefreshValues) setTimeout(Refresh, 300, fieldItems[0][0]);
        } else {
            i1++;
            Refresh_Colorize(fieldItems[i1]);
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


        Item.innerHTML = c;

        fieldItems[i2][1] = c;
        fieldItems[i2][2] = isMultipleOfTen;


        let ItemLength = Item.classList.length
        for (let i = 0; i < ItemLength; i++) {
            Item.classList.remove(Item.classList[0]);
        }

        Item.classList.add("field-item");

        if (i2 > 99) return;
        else {
            i2++;
            setTimeout(Refresh, 0, fieldItems[i2][0]);
        }
        // setTimeout(() => timeOut1 = false, 1000);
        // setTimeout(() => timeOut2 = false, 1000);
    }

    function Delete(Item) {
        Item.innerHTML = "";


        let ItemLength = Item.classList.length
        for (let i = 0; i < ItemLength; i++) {
            Item.classList.remove(Item.classList[0]);
        }

        // Item.classList.add("field-item");

        if (i3 > 99) return;
        i3++;
        setTimeout(Delete, 5, fieldItems[i3][0])
    }

}





function Colorize(val, isMultiple) {

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


    let fieldDigit = Math.abs(+targetField.innerHTML);

    multipleFieldConfirm = Number.isInteger(fieldDigit / 10);

    let scoreIncrement = multipleFieldConfirm ? +fieldDigit : -fieldDigit;
    Score_Initialize(scoreIncrement);



    if (multipleFieldConfirm) multipleFieldCount++;
    else targetField.innerHTML = -fieldDigit;

    if (multipleFieldCount === multipleFieldsTotal) Refresh_Values(false, true);

    targetField.classList.add(Colorize(fieldDigit, multipleFieldConfirm), "colorized")
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


    let sec = 60;

    if (reset) {
        timeReset = true;
    } else Timer();

    function Timer() {


        if (timeReset || sec === 0) {
            time.innerHTML = startTime;
            Refresh_Values(false, false, false);
            startButton.disabled = false;
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