"use strict";

const okBtn = document.getElementById("ok-btn");

okBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked!");
});
