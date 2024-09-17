
window.app = (function (myApp) {
    'use strict';

    let count = 0;

    myApp.counter = myApp.counter || {};

    myApp.counter.increment = () => {
        count++;
    };
    myApp.counter.getCount = () => count;

    return myApp;

})(window.app || {});

// SL - nice!
// SL - not a problem, but we didnt really need the passing in and ability for counter to alreayd exist - we dont plan on working on it on multiple files
