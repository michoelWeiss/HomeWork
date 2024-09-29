(function () {
    'use strict';

    const nextButt = $('#nextPic');
    const lastButt = $('#lastPic');
    const loadPicButt = $('#loadPics');
    const imgBox = $('#animalPic');
    const titleBox = $('#title');
    const imgContainer = $('#imgCardContainer');

    let rotationDegree = 0;
    let currentArrayIndex = 0;
    let arrayInUse;

    nextButt.prop('disabled', true);
    lastButt.prop('disabled', true);
    loadPicButt.click(loadPics);
    nextButt.click(() => spinTransition(true, nextPic));
    lastButt.click(() =>  spinTransition(false, lastPic));

    async function loadPics() {
        const userInputbox = $('#userPicChose');
        const userInput = userInputbox.val().toLowerCase();

        if (userInput === 'dog' || userInput === 'cat' || userInput === 'bird' || userInput === 'bunny') {
          
            try {
                const file = await fetch(`${userInput}.json`);
                if (!file.ok) throw new Error(`${file.status} - ${file.statusText}`);
                const animals = await file.json();
                displayPic(animals); 
                 nextButt.prop('disabled', false);
                 lastButt.prop('disabled', false);
                userInputbox.val('');
            }
            catch (e) {
                console.error('error', e);
            }
        }
    }
    function shuffleArray(array) {

        let newArray = array.slice();

        for (let i = newArray.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
        }
        return newArray;
    }
    function displayPic(picArray) {

        arrayInUse = shuffleArray(picArray);
        nextButt.prop('disabled', false);
        lastButt.prop('disabled', false);

        imgBox.attr('src', arrayInUse[currentArrayIndex].url).attr('alt', 'anaimal Picture');
        titleBox.text(arrayInUse[currentArrayIndex].title);
    }

    function nextPic() {

        if (currentArrayIndex <= arrayInUse.length - 1) {
            if (currentArrayIndex === arrayInUse.length - 1) currentArrayIndex = -1;
            currentArrayIndex += 1;
            imgBox.attr('src', arrayInUse[currentArrayIndex].url);
            titleBox.text(arrayInUse[currentArrayIndex].title);

        }
        console.log(arrayInUse[currentArrayIndex]);
    }

    function lastPic() {

        if (currentArrayIndex >= 0) {
            if (currentArrayIndex === 0) currentArrayIndex = arrayInUse.length;
            currentArrayIndex -= 1;
            imgBox.attr('src', arrayInUse[currentArrayIndex].url);
            titleBox.text(arrayInUse[currentArrayIndex].title);

        }
        console.log(arrayInUse[currentArrayIndex]);
    }

    function spinTransition(isClockwise = true, pictureFunction) {

        let spinDirection = isClockwise ? 360 : -360;
        rotationDegree += spinDirection;

        imgContainer.css({
            'transform': `rotate(${rotationDegree - (isClockwise ? 315 : -315)}deg)`,
            'transition': 'transform 0.6s ease-out'
        });

        setTimeout(function () {
            imgContainer.css({
                'transform': `rotate(${rotationDegree - (isClockwise ? 180 : -180)}deg)`,
                'transition': 'transform 0.4s ease-in'
            });

            setTimeout(function () {
                pictureFunction();

                imgContainer.css({
                    'transform': `rotate(${rotationDegree}deg)`,
                    'transition': 'transform 0.6s ease-out'
                });
            }, 250);
        }, 250);
    }

}());