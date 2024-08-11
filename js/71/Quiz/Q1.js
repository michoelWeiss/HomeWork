(function () {
    'use strict';

    const mapArray = (function (array, func) {

        let tempArray = [];

        array.forEach(element => {
            tempArray.push(func(element));
        });

        return tempArray;

    });

    let array = [1, 2, 3, 4, 5];

    let arrayMultipliedBy2 = mapArray(array, x => x * 2);
    let arrayMultipliedBy3 = mapArray(array, x => x * 3);
    let arrayMultipliedBy10 = mapArray(array, x => x * 10);
    let arrayAddSmile = mapArray(array, x => x + ':) ');

    console.log(`Original Array: ${array}`);
    console.log(`Multiplied By 2: ${arrayMultipliedBy2}`);
    console.log(`Multiplied By 3: ${arrayMultipliedBy3}`);
    console.log(`Multiplied By 10: ${arrayMultipliedBy10}`);
    console.log(`Add Smile: ${arrayAddSmile}`);

}());

