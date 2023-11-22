import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

//Custom alert
//https://github.com/gusrb3164/react-custom-alert

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

