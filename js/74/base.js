window.pcs = (function (selector) {
    'use strict';

    function get(selector) {
        return document.querySelector(selector);
    }

    function setCss(element, property, value) {
        element.style[property] = value;
    }

    function getCss(element, property) {
        return getComputedStyle(element)[property];
    }

    function on(element, event, callback) {
        element.addEventListener(event, callback);
    }

    function click(element, callback) {
        element.addEventListener('click', callback);
    }

    function hide(element) {
        window.pcsTools.setCss(element, 'display', 'none');
    }

    function mouseLeave(element, callback) {
        element.addEventListener('mouseleave ', callback);
    }
    function show(element) {
        window.pcsTools.setCss(element, 'display', 'inline-block');
    }

    ////// homework 74 ///////
    let colorCounter = 0;
    const colors = [
        "rgb(0, 121, 191)", "rgb(0, 150, 199)",
        "rgb(0, 184, 212)", "rgb(0, 206, 201)",
        "rgb(38, 166, 154)", "rgb(67, 160, 71)",
        "rgb(124, 179, 66)", "rgb(192, 202, 51)",
        "rgb(255, 235, 59)", "rgb(255, 193, 7)",
        "rgb(255, 152, 0)", "rgb(255, 87, 34)",
        "rgb(255, 64, 129)", "rgb(244, 67, 54)",
        "rgb(233, 30, 99)", "rgb(216, 27, 96)",
        "rgb(156, 39, 176)", "rgb(103, 58, 183)",
        "rgb(63, 81, 181)", "rgb(48, 63, 159)"
    ];

    let interval;

    function newColorHandler(element) {
        return function () {
            if (colorCounter >= colors.length) {
                colorCounter = 0;
            }
            element.style.backgroundColor = colors[colorCounter++];
        };
    }
    let myKeys = {};
    function data(key, value) {

        if (value) {
            myKeys[key] = value;
        }
        else {
            for (let tempKey in myKeys) {
                if (tempKey === key) {
                    return myKeys[key];
                }

            }
        }
    }
      const element = get(selector);
    return {
        get,
        setCss,
        getCss,
        on,
        click,
        hide,
        show,
        mouseLeave,
        data,
        changecolor: function (totalTime, colorTime) {
            totalTime = totalTime || 5;
            colorTime = colorTime || 1000;
            if (!interval) {
                let changeColor = newColorHandler(element);
                interval = setInterval(changeColor, colorTime);
            }
            let timeLeft = totalTime;

            const countdown = setInterval(() => {
                timeLeft -= 1;
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    interval = null;
                    clearInterval(countdown);
                }
            }, 1000);
        }
    };
});