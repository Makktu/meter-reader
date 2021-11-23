"use strict";

// *******************************************************
// *******************************************************

const clearFields = (msg) => {
    latField.value = "";
    lonField.value = "";
    messageArea.insertAdjacentText("beforeend", msg);
};

function handleErrors(msg) {
    messageArea.insertAdjacentText("beforeend", msg);
    throw new Error(msg);
}

function whereAmI(lat, lon) {
    // ! first, check that lat and lon are numbers
    // refine this check to limit it to GPS numbers eventually

    // if (!isNaN(lat) || !isNaN(lon)) {
    //     clearFields("⚠️ Enter numbers only");
    //     return;
    // }

    // ! And so to business:
    fetch(`http://geocode.xyz/${lat},${lon}?geoit=json`).then((response) => {
        console.log(response);
    });
}

// fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(`${errorMsg} – code ${response.status}`);
//     }
//     return response.JSON();
//   });

// *******************************************************
// *******************************************************

const messageArea = document.querySelector(".messages");

const okBtn = document.getElementById("ok-btn");
const latField = document.getElementById("lat");
const lonField = document.getElementById("lon");

okBtn.addEventListener("click", (e) => {
    messageArea.textContent = "";
    e.preventDefault();
    const lat = latField.value;
    const lon = lonField.value;
    // ! check input exists
    if (!lat || !lon) {
        handleErrors("⚠️ Enter numbers for both");
    }
    whereAmI(parseInt(lat), parseInt(lon));
});
