"use strict";

function handleErrors(msg) {
    messageArea.insertAdjacentText("beforeend", msg);
    throw new Error(msg);
}

const messageArea = document.querySelector(".messages");

const okBtn = document.getElementById("ok-btn");
const latField = document.getElementById("lat");
const lonField = document.getElementById("lon");

okBtn.addEventListener("click", (e) => {
    messageArea.textContent = "";
    e.preventDefault(); // stop form from reloading itself
    const lat = +latField.value;
    const lon = +lonField.value; // assign the iunput values to variables and convert to numbers
    console.log(typeof lat, typeof lon);
    // ! need to check input and reject if not a GPS pairing, i.e. not numbers
    if (!lat || !lon) {
        handleErrors("⚠️ Enter numerical values for both");
    }

    if (typeof lat !== "number" || !typeof lon !== "number") {
        if (typeof lat !== "number") latField.value = "";
        if (typeof lon !== "number") lonField.value = "";
        handleErrors("⚠️ NUMBERS only for both");
    }
});
