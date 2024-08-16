
window.app = (function (myApp) {
    'use strict';

    myApp.createCounter = createCounter || {};

    let numOfCounters = 0;

    function createCounter() {
        let count = 0;
        numOfCounters++;
        return {
            increment: () => { count++; },
            getCount: () => count,
            numOfCountersMade: () => numOfCounters
        }
    }

    return myApp;

}(window.app || {}));
