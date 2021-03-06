const fields = document.querySelector(".fields");
const field_rows = []

const global_Scale_Elem = document.querySelector(".main-wrapper");
const scale_Elem = document.querySelector(".scale");

const score = document.querySelector(".score-number");

const field_Items = [];


function Event_Click() {
    addEventListener("mousedown", (e) => {

        let classIndex = "";

        console.log(["field-item", "refresh"]
            .some((className, index) => {
                if (e.target.classList.contains(className)) {
                    classIndex = index;
                    return;
                }
            }))

        switch (classIndex) {
            case 0:
                Field_Click(e.target)
                break;
            case 1:
                Refresh_Values();
                break;
        }
    })
}


function Field_Click(targetField) {

    if (["colorize-max", "colorize-red", "colorize-yellow", "colorize-green", "colorize-white"]
        .some((colorizeClass) => targetField.classList.contains(colorizeClass))) return;


    let fieldNumber = Math.abs(+targetField.innerHTML);
    scoreNumber = +score.innerHTML;


    fieldNumberInt = Number.isInteger(fieldNumber / 10);

    if (!fieldNumberInt) targetField.innerHTML = -fieldNumber;

    let i = 0;
    increment = fieldNumberInt ? 1 : -1;
    Score_Set(fieldNumber);

    function Score_Set(num) {
        scoreNumber += increment;

        score.innerHTML = scoreNumber;
        // (+targetField.innerHTML) += increment;

        if (i > num) return;
        else {
            i++;
            setTimeout(Score_Set, 5, num);
        }
    }

    targetField.classList.add(Colorize(fieldNumber, fieldNumberInt), "colorized")


}



function Create_Values() {

    let q = 0

    for (let rowI = 0; rowI < 10; rowI++) {

        field_row = document.createElement("div");
        field_row.className = "field-row";
        fields.appendChild(field_row)

        field_rows[rowI] = field_row;

        for (let rowItem = 0; rowItem < 10; rowItem++) {

            field_item = document.createElement("div");
            field_item.className = "field-item";
            field_row.appendChild(field_item);

            c = Math.floor(Math.random() * (101 - 1)) + 1;
            field_Items[q] = field_item;
            q++;

            // if (Number.isInteger(c / 10)) {
            //     field_item.classList.add("colorize-red");
            //     q += 1;
            // }
            // score.innerHTML = q;
        }
    }
    Refresh_Values(true);
    Refresh_Width();
}


let timeOut = false;

function Refresh_Values() {

    if (timeOut) return;
    timeOut = true;

    score.innerHTML = 0;

    let c = 0;
    let i1 = 0;
    let i2 = 0;


    Refresh_Colorize(field_Items[0]);

    function Refresh_Colorize(Item_Colorize) {

        Item_Colorize.classList.add(Colorize(Item_Colorize.innerHTML))

        if (i2 >= 99) setTimeout(Refresh, 300, field_Items[i1]);
        else {
            i2++;
            Refresh_Colorize(field_Items[i2]);
        }
    }

    function Refresh(Item) {

        c = Math.floor(Math.random() * (101 - 1)) + 1;
        Item.innerHTML = c;

        let ItemLength = Item.classList.length
        for (let i = 0; i < ItemLength; i++) {
            Item.classList.remove(Item.classList[0]);
        }


        Item.classList.add("field-item");

        if (i1 >= 99) return;
        else {
            i1++;
            setTimeout(Refresh, 0, field_Items[i1]);
        }
    }


    setTimeout(() => timeOut = false, 850);
}

function Colorize(val) {

    if (val === "") return "colorize-black";
    if (Number.isInteger(val / 10)) {
        return (val === 100) ? "colorize-max" :
            (val >= 75) ? "colorize-red" :
            (val >= 40) ? "colorize-yellow" :
            (val >= 15) ? "colorize-green" :
            "colorize-white"
    } else return "colorize-dark";
}

function Refresh_Width() {

    rowHeight = fields.offsetWidth / 10 - 5 + "px";

    field_rows.forEach(row => {

        row.style.height = rowHeight
    });
}


function Scale(val) {
    fields.style.width = val + "%";

    fields.style.fontSize = val / 115 + "em";

    Refresh_Width()
}

Event_Click();
Create_Values();