"use strict";

function formatTimeDate() {
    let currentTimeDate = new Date();
    messageArea.textContent = currentTimeDate.toString().slice(0, 21);
}

let allReadings = [36600, 36609, 36620, 36631, 36635, 36640];

const messageArea = document.querySelector(".messages");
const timeDate = document.querySelector(".timedatestamp");
const okBtn = document.getElementById("ok-btn");
const changeTimeDateBtn = document.querySelector(".change");
const readingField = document.getElementById("reading");

let lastReading = allReadings[allReadings.length - 1];

console.log(lastReading);

okBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let readingEntered = readingField.value;
    let calcUsed = readingEntered - lastReading;
    console.log(typeof calcUsed);
    console.log(`Amount used: £${calcUsed}`);
    allReadings.push(readingEntered);
    lastReading = readingEntered;
    console.log(allReadings);
});

changeTimeDateBtn.addEventListener("click", () => {
    // Need to load a time/date picker and pass result to
});

formatTimeDate();
