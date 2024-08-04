'use strict';

const isUpper = letter => letter === letter.toUpperCase();

const isLower = letter => letter === letter.toLowerCase();

let array1 = ['A', 'B', 'C', 'D'];
let array2 = ['a', 'b', 'c', 'd'];
let array3 = ['A', 'b', 'C', 'D'];

////////////// IS EVERY /////////////

const isEvery = (list, myFunction) => {
    for (let i = 0; i < list.length; i++) {
        if (!myFunction(list[i])) {
            return false;
        }
    }
    return true;
}

console.log('IS EVERY UPPER');
console.log(isEvery(array1, isUpper));
console.log(isEvery(array2, isUpper));
console.log(isEvery(array3, isUpper));

console.log('IS EVERY LOWER');
console.log(isEvery(array1, isLower));
console.log(isEvery(array2, isLower));
console.log(isEvery(array3, isLower));

console.log('IS EVERY UPPER (built in)');
console.log(array1.every(isUpper));
console.log(array2.every(isUpper));
console.log(array3.every(isUpper));

console.log('IS EVERY LOWER (built in)');
console.log(array1.every(isLower));
console.log(array2.every(isLower));
console.log(array3.every(isLower));

/////////// IS SOME ///////////////

const isSome = (list, myFunction) => {
    for (let i = 0; i < list.length; i++) {
        if (myFunction(list[i])) {
            return true;
        }
    }
    return false;
}
console.log('IS SOME UPPER');
console.log(isSome(array1, isUpper));
console.log(isSome(array2, isUpper));
console.log(isSome(array3, isUpper));

console.log('IS SOME LOWER');
console.log(isSome(array1, isLower));
console.log(isSome(array2, isLower));
console.log(isSome(array3, isLower));

console.log('IS SOME UPPER (built in)');
console.log(array1.some(isUpper));
console.log(array2.some(isUpper));
console.log(array3.some(isUpper));

console.log('IS SOME LOWER (built in)');
console.log(array1.some(isLower));
console.log(array2.some(isLower));
console.log(array3.some(isLower));


////////////// ONLYIF  ///////////////

let finalList = [];
let numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 23, 24324, 3532, 123, 5432, 34, 57, 775, 3435, 563, 25, 62, 674, 53, 24];

const onlyIf = (test, action, array) => {
    for (let i = 0; i < array.length; i++) {
        if (test(array[i])) {
            action(array[i]);
        }
    }
}
const test = (num1, num2) => {
    return function (num) {
        return (num % 2 === num1 % 2 && num > num2)
    };
}

const action = list => {
    return function (it) {
        console.log(it);
        list.push(it);
    };
}

const myTest = test(31, 6);
const myAction = action(finalList);
onlyIf(myTest, myAction, numList);
console.log(finalList);


/////// ONLYIF FILTER  ///////////

let testHandlerFilter = test(31, 6);
let finalListFilter = numList.filter(testHandlerFilter);

finalListFilter.forEach(function (num) {
    console.log(num);
});

console.log(finalListFilter);
