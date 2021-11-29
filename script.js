"use strict";

function formatTimeDate() {
    let currentTimeDate = new Date();
    timeDate.textContent = currentTimeDate.toString().slice(0, 21);
}

const messageArea = document.querySelector(".messages");
const timeDate = document.querySelector(".timedatestamp");
const okBtn = document.getElementById("ok-btn");
const changeTimeDateBtn = document.querySelector(".change");
const readingField = document.getElementById("reading");

okBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // stuff
});

changeTimeDateBtn.addEventListener("click", () => {
    // Need to load a time/date picker and pass result to
});

formatTimeDate();
