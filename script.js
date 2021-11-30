"use strict";

function formatTimeDate() {
    let currentTimeDate = new Date();
    messageArea.textContent = currentTimeDate.toString().slice(0, 21);
}

function clearScreen() {
    formatTimeDate();
    readingField.value = "";
    let showRecentReadings = "";
    let tempReading;
    allReadings.forEach((thisReading) => {
        if (tempReading) tempReading = thisReading.reading - tempReading;
        showRecentReadings += `<br>${thisReading.day} ${thisReading.date} @ ${thisReading.time} - - - ${thisReading.reading} (+${tempReading})`;
        tempReading = thisReading.reading;
    });
    recentReadingsArea.innerHTML = showRecentReadings;
}

let allReadings = [
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

const messageArea = document.querySelector(".messages");
const timeDate = document.querySelector(".timedatestamp");
const okBtn = document.getElementById("ok-btn");
const changeTimeDateBtn = document.querySelector(".change");
const readingField = document.getElementById("reading");
const recentReadingsArea = document.querySelector(".recent-readings");

let lastReading = allReadings[allReadings.length - 1];

console.log(lastReading);

okBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // check that entry:
    // 1) is a number
    // 2) is larger than the last entry

    let readingEntered = readingField.value;
    console.log(typeof readingEntered);

    // if (typeof readingEntered !== "number") {
    //     console.log("yep");
    //     messageArea.textContent = "Enter Numbers Only";
    //     setTimeout(clearScreen, 3000);
    //     return;
    // }

    let calcUsed = readingEntered - lastReading;

    console.log(typeof calcUsed);
    console.log(`Amount used: £${calcUsed}`);
    allReadings.push(readingEntered);
    lastReading = readingEntered;
    console.log(allReadings);
});

// changeTimeDateBtn.addEventListener("click", () => {
//     // Need to load a time/date picker and pass result to
// });

formatTimeDate();
clearScreen();
