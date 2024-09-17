
window.app = (function (myApp) {
    'use strict';

    // SL - whats this? createCounter is either the function defined later or an empty object? Lucky for you, the function exists...
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

// SL - nice
