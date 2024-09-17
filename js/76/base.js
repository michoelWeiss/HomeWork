(function () {
    'use strict';

    clear();
    getnames();

    async function getnames() {
        try {
            const r = await fetch('recipeNames.json');
            if (!r.ok) {
                throw new Error(`${r.status} - ${r.statusText}`);
            }
            const names = await r.json();
            const recipeNames = names.recipes;
            makeRadioButtons(recipeNames);
        }
        catch (e) {
            console.error('error', e)
            noNames();
        }
    }
    function noNames() {

        const container = $('#recipeNameContainer');
        const body = $('header');
        const noRecipesMessage = $('<h4>').text('There are currently no recipes available');
        container.empty().append(noRecipesMessage);
        body.append(container);
    }
    function makeRadioButtons(namesArray) {

        if (!namesArray || namesArray.length === 0) {
            noNames();
        }
        else {
            const container = $('#recipeNameContainer');
            const body = $('header');
            const clearPage = $(`<label><input type="radio" name="recipe" value="clearPage"> Clear Page</label><br>`);
            clearPage.css({
                'margin-bottom': '10px',
                'font-weight': 'bold'
            });
            clearPage.on('change', function () { clear(); });
            container.append(clearPage);

            namesArray.forEach(name => {
                const radioButton = $(`<input type="radio" name="recipe" value="${name}"> ${name}<br>`);
                radioButton.css('margin-top', '10px');
                radioButton.on('change', function () { displayPage(name); })
                container.append(radioButton);
            });
            body.append(container);
        }

    }

    async function displayPage(name) {
        try {
            const r = await fetch('recipes.json');
            if (!r.ok) {
                throw new Error(`${r.status} - ${r.statusText}`);
            }
            const recipes = await r.json();
            for (let i = 0; i < recipes.length; i++) {
                if (recipes[i].name === name) {
                    let myrecipe = recipes[i];
                    clear();
                    $('#nameContainer').text(myrecipe.name);
                    $('#descriptionContainer').text(myrecipe.description);
                    $('#imageContainer').attr('src', myrecipe.image).attr('alt', myrecipe.imageDesc);
                    const ul = $('#ingredientsContainer').show().find('ul');
                    myrecipe.ingredients.forEach(i => {
                        const item = $(`<li> ${i}</li>`);
                        ul.append(item);
                    });
                    const ol = $('#instructionsContainer').show().find('ol');
                    myrecipe.instructions.forEach(i => {
                        const item = $(`<li> ${i}</li>`);
                        ol.append(item);
                    });
                    return;
                }
            }
        }
        catch (e) {
            clear('Sorry, that recipe could not be found');
        }
    }
    function clear(errorMessage) {

        errorMessage = errorMessage || 'No recipes currently being displayed';
        $('#nameContainer').text(errorMessage);
        $('#descriptionContainer').empty();
        $('#imageContainer').attr('src', '').attr('alt', '');
        $('#ingredientsContainer').hide().find('ul').empty();
        $('#instructionsContainer').hide().find('ol').empty();
    }
}());