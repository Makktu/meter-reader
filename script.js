"use strict";

function formatTimeDate() {
    let currentTimeDate = new Date();
    messageArea.textContent = currentTimeDate.toString().slice(0, 21);
}

const messageArea = document.querySelector(".messages");
const timeDate = document.querySelector(".timedatestamp");
const okBtn = document.getElementById("ok-btn");
const changeTimeDateBtn = document.querySelector(".change");
const readingField = document.getElementById("reading");

okBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const readingEntered = readingField.value;
    console.log(readingEntered);
});

changeTimeDateBtn.addEventListener("click", () => {
    // Need to load a time/date picker and pass result to
});

formatTimeDate();
