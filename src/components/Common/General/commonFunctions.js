import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


/*-----------------
Default File Pathts
-------------------*/



/*---------------
Payment Functions
-----------------*/

export function oncanplay(event) {
    return this.play()
}

export function onloadedmetadata(event) {
    this.muted = true
    return this
}

export const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomNumberZeroToMax = (max) => {
    return Math.floor(Math.random() * max);
}

export function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
}
