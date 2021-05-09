const fields = document.querySelector(".fields");
const fieldRows = []

const global_Scale_Elem = document.querySelector(".main-wrapper");
const scale_Elem = document.querySelector(".scale");

const score = document.querySelector(".score-number");

const fieldItems = [];

let multipleFieldsTotal = 0;
let multipleFieldCount = 0;

let scoreIterator = 1;





function Event_Read() {
    addEventListener("mousedown", (e) => {

        let classIndex = "";

        ["field-item", "refresh"]
        .some((className, index) => {
            if (e.target.classList.contains(className)) {
                classIndex = index;
                return;
            }
        })

        switch (classIndex) {
            case 0:
                Field_Click(e.target)
                break;
            case 1:
                Refresh_Values(false);
                break;
        }
    })
}





function Score_Set(nextScore, Points, increment) {

    nextScore += increment;
    score.innerHTML = nextScore;

    if (scoreIterator >= Points) {
        scoreIterator = 0;
    } else {
        scoreIterator++;
        setTimeout(Score_Set, 7, nextScore, Points, increment);
    }
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

            fieldItems[q] = [fieldItem, 0, 0];
            q++;
        }
    }
    Refresh_Values(true);
    Set_Width();
}





// let timeOut1 = false;
// let timeOut2 = false;

function Refresh_Values(load) {

    // if (timeOut1) return;
    // timeOut1 = true;

    let c = 0;
    let i1 = 0;
    let i2 = 0;



    Refresh_Colorize(fieldItems[0]);

    function Refresh_Colorize(Field) {

        const Item = Field[0];
        const ItemValue = load ? "" : Field[1];
        const isMultiple = Field[2];

        Item.classList.add(Colorize(ItemValue, isMultiple))

        if (i1 >= 99) {
            if (load) setTimeout(Refresh, 300, fieldItems[0][0]);
        } else {
            i1++;
            Refresh_Colorize(fieldItems[i1]);
        }
    }

    addEventListener("mouseup", e => {
        if (e.target === document.querySelector(".refresh")) {

            // if (timeOut2) return;
            // else timeOut2 = true

            i2 = 0

            setTimeout(Refresh, 200, fieldItems[0][0]);
        }
    })

    function Refresh(Item) {

        let c = Math.floor(Math.random() * (101 - 1)) + 1;
        const isMultipleOfTen = Number.isInteger(c / 10);

        if (isMultipleOfTen) {
            multipleFieldsTotal++;
        }

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

    if (multipleFieldConfirm) multipleFieldCount++;
    else targetField.innerHTML = -fieldDigit;

    targetField.classList.add(Colorize(fieldDigit, multipleFieldConfirm), "colorized")

    scoreDigit = +score.innerHTML;
    Score_Set(scoreDigit, fieldDigit, Iterator(multipleFieldConfirm));

    function Iterator(isMultiple) {
        return isMultiple ? 1 : -1;
    }


    if (multipleFieldCount === multipleFieldsTotal) Refresh_Values(true);
}




function Scale(val) {
    fields.style.width = val + "%";

    fields.style.fontSize = val / 115 + "em";

    Set_Width()
}


Event_Read();
Create_Fields();