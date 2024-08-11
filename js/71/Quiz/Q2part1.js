
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