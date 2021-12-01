"use strict";

function setUnitPrice() {
    if (!unitPrice) {
        unitPrice = prompt("Enter Your Electricity Unit Price Per kW/h");
        if (!unitPrice) setUnitPrice();
        localStorage.setItem("UnitPrice", JSON.stringify(+unitPrice));
        return unitPrice;
    }
}

function checkCost(cost) {
    let stringCost = cost + "";
    for (let j = 0; j < stringCost.length; j++) {
        if (stringCost.charAt(j) === ".") {
            // check if 1 or 2 digits following; if 1, need to append a '0'
            if (stringCost.length - j === 2) {
                stringCost += "0";
            }
            return stringCost;
        }
    }
}

const processEntry = function (readingEntered) {
    const readingTime = new Date();

    day = days[readingTime.getDay()];
    date =
        readingTime.getDate() +
        " " +
        months[readingTime.getMonth()] +
        " " +
        readingTime.getFullYear();
    time =
        readingTime.getHours() +
        ":" +
        (readingTime.getMinutes() < 10
            ? "0" + readingTime.getMinutes()
            : readingTime.getMinutes());

    lastReading = readingEntered;
    console.log(allReadings);

    let readingObject = {};
    readingObject.reading = readingEntered;
    readingObject.day = day;
    readingObject.date = date;
    readingObject.time = time;

    allReadings.push(readingObject);
    localStorage.setItem("MeterReadings", JSON.stringify(allReadings));
    refreshScreen();
};

function formatTimeDate() {
    let currentTimeDate = new Date();
    messageArea.textContent = currentTimeDate.toString().slice(0, 21);
}

function refreshScreen() {
    console.log(allReadings);
    formatTimeDate();
    readingField.value = "";
    let showRecentReadings = "";
    let tempReading;

    allReadings.forEach((thisReading, idx) => {
        if (tempReading) {
            tempReading = thisReading.reading - tempReading;
            thisReading.cost = tempReading * unitPrice;
        } else {
            tempReading = "-";
            thisReading.cost = "";
        }

        // ! check 'cost' e.g. £4.2 rendered as £4.20

        if (thisReading.cost) {
            thisReading.cost = checkCost(thisReading.cost);
        }

        showRecentReadings =
            `<br>${thisReading.day} ${thisReading.date} @ ${
                thisReading.time
            }<br>${thisReading.reading} <span style = "color: red">(${
                tempReading === "-" ? "-" : "+" + tempReading
            } kW/h)</span><br>${
                thisReading.cost !== "" ? "£" + thisReading.cost : "n/a"
            }<br>` + showRecentReadings;

        if (idx === allReadings.length - 1) {
            showRecentReadings =
                `kw/H Unit Price: ${+unitPrice}p<br><button class='kwBtn'>change this</button><br>` +
                showRecentReadings;
        }
        tempReading = thisReading.reading;
    });
    recentReadingsArea.innerHTML = showRecentReadings;
}

// check for local storage and load if present

let allReadings, unitPrice;

if (localStorage.getItem("MeterReadings") === null) {
    allReadings = [
        {
            reading: 36600,
            day: "Mon",
            date: "28 Sep 2021",
            time: "18:10",
        },
        {
            reading: 36620,
            day: "Tue",
            date: "29 Sep 2021",
            time: "11:07",
        },
        {
            reading: 36626,
            day: "Wed",
            date: "30 Sep 2021",
            time: "12:33",
        },
        {
            reading: 36629,
            day: "Thu",
            date: "1 Oct 2021",
            time: "10:22",
        },
        {
            reading: 36639,
            day: "Fri",
            date: "2 Oct 2021",
            time: "09:19",
        },
    ];
} else {
    allReadings = JSON.parse(localStorage.getItem("MeterReadings"));
}

if (localStorage.getItem("UnitPrice") === null) {
    unitPrice = setUnitPrice();
} else {
    unitPrice = localStorage.getItem("UnitPrice");
}

const messageArea = document.querySelector(".messages");
const timeDate = document.querySelector(".timedatestamp");
const okBtn = document.getElementById("ok-btn");
const changeTimeDateBtn = document.querySelector(".change");
const readingField = document.getElementById("reading");
const recentReadingsArea = document.querySelector(".recent-readings");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];

let lastReading = allReadings[allReadings.length - 1];

let day, date, time;

okBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // ! eventually: check that entry
    // ! 1) is a number
    // ! 2) is larger than the last entry

    let readingEntered = readingField.value;
    if (readingEntered) {
        if (readingEntered === "reset") {
            let y = prompt("Enter Y to reset all readings and start over");
            console.log(y);
            if (y !== "Y" && y !== "y") return;
            localStorage.removeItem("MeterReadings");
            allReadings = [];
            refreshScreen();
        } else {
            processEntry(readingEntered);
        }
    } else {
        messageArea.insertAdjacentHTML(
            "beforeend",
            "<p><span style='color:yellow'>** ENTER A READING **</span></p>"
        );
    }
});

// changeTimeDateBtn.addEventListener("click", () => {
//     // Need to load a time/date picker and pass result to
// });

formatTimeDate();
refreshScreen();
