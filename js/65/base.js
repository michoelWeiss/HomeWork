'use strict';

const CtoF = document.querySelector('#CtoF');
const FtoC = document.querySelector('#FtoC');

CtoF.addEventListener('click', CtoF_clickHandler);
FtoC.addEventListener('click', FtoC_clickHandler);

function CtoF_clickHandler() {
    let tempCstr = prompt('Input a temperature in Celsius to convert to Fahrenheit.');
    if (tempCstr !== undefined && tempCstr !== null) {
        let tempCfloat = parseFloat(tempCstr);
        if (!isNaN(tempCfloat)) {
            let tempF = CtoF_conversion(tempCfloat);
            alert(`${tempCfloat}°C is equal to ${tempF.toFixed(2)}°F`);
        }
        else {
            alert('Please enter a valid number.');
        }
    }
}

function FtoC_clickHandler() {
    let tempFstr = prompt('Input a temperature in Fahrenheit to convert to Celsius.');
    if (tempFstr !== undefined && tempFstr !== null) {
        let tempFfloat = parseFloat(tempFstr);
        if (!isNaN(tempFfloat)) {
            let tempC = FtoC_conversion(tempFfloat);
            alert(`${tempFfloat}°F is equal to ${tempC.toFixed(2)}°C`);
        }
        else {
            alert('Please enter a valid number.');
        }
    }
}

function CtoF_conversion(num) {
    return num * 9 / 5 + 32;
}

function FtoC_conversion(num) {
    return (num - 32) * 5 / 9;
}