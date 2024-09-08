window.pcsTools = (function () {
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

    ////// HomeWork 73  ////////

    function click(element, callback) {
        element.addEventListener('click', callback);
    }

    function hide(element) {
        window.pcsTools.setCss(element, 'display', 'none');
    }

    function mouseLeave (element, callback) {
        element.addEventListener('mouseleave ', callback);
    }
    function show(element) {
        window.pcsTools.setCss(element, 'display', 'inline-block');
    }

    return {
        get,
        setCss,
        getCss,
        on,
        click,
        hide,
        show,
        mouseLeave
    };
}());
