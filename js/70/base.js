(function () {
    'use strict';

    const changeColor = document.querySelector('#colorChange');
    const stopColor = document.querySelector('#colorStop');
    const resetColor = document.querySelector('#colorReset');

    stopColor.disabled = true;

    let interval;
    let rgb = [245, 245, 245];
    let phase = 0;

    changeColor.addEventListener('click', changeColorHandler);
    stopColor.addEventListener('click', stopColorHandler);
    resetColor.addEventListener('click', r => {
        document.body.style.backgroundColor = 'white'
        rgb[0] = 245;
        rgb[1] = 245;
        rgb[2] = 245;
        stopColorHandler();
    });

    function changeColorHandler() {

        if (!interval) {
            interval = setInterval(go, 50)
        }
        stopColor.disabled = false;
        changeColor.disabled = true;
    }

    function go() {
        // I didnt make this, I found it
        if (phase === 0) {
            rgb[0] += 10;
            if (rgb[0] >= 255) {
                rgb[0] = 255;
                phase = 1;
            }
        } else if (phase === 1) {
            rgb[1] += 10;
            if (rgb[1] >= 255) {
                rgb[1] = 255;
                phase = 2;
            }
        } else if (phase === 2) {
            rgb[0] -= 10;
            if (rgb[0] <= 0) {
                rgb[0] = 0;
                phase = 3;
            }
        } else if (phase === 3) {
            rgb[2] += 10;
            if (rgb[2] >= 255) {
                rgb[2] = 255;
                phase = 4;
            }
        } else if (phase === 4) {
            rgb[1] -= 10;
            if (rgb[1] <= 0) {
                rgb[1] = 0;
                phase = 5;
            }
        } else if (phase === 5) {
            rgb[0] += 10;
            if (rgb[0] >= 255) {
                rgb[0] = 255;
                phase = 6;
            }
        } else if (phase === 6) {
            rgb[2] -= 10;
            if (rgb[2] <= 0) {
                rgb[2] = 0;
                phase = 0;
            }
        }
        document.body.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
    function stopColorHandler() {
        clearInterval(interval);
        interval = null;
        stopColor.disabled = true;
        changeColor.disabled = false;
    }

}());

