(function () {
    'use strict';


    const button = $('#loadFileButt');
    const displayFile = $('#displayFileDiv');
    const input = $('#fileLocationInput');
    const spinner = $('#spinner');

    button.click(buttClicked);

    function buttClicked() {
        if (input.val()) {
            spinner.show();
            setTimeout(() => {
                fetch(input.val())
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        } else {
                            throw new Error(`${response.status} - ${response.statusText}`);
                        }
                    })
                    .then(text => {
                        spinner.hide();
                        displayFile.html(text);
                    })
                    .catch(error => {
                        spinner.hide();
                        displayFile.html(`Failed to load file: Error: ${error}`);
                    });

            }, 2000);

        } else {
            displayFile.html('No file address inputted');
        }
    }
})();