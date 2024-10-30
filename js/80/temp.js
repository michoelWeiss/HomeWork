(function () {
    'use strict';


    const dontChange = document.querySelectorAll('.dontChange');
  //  const potatoHead = document.querySelector('#potatoHead');

    startOffArray();
   

   

    function increaseZindex(dragging) {
        console.log('before', objectsOnScreen);

        objectsOnScreen.forEach(element => {
            if (element.id === dragging.id) {
                //  dragging.style.zIndex = 2;
                element.style.zIndex = 2000;
            }
            else {
                const currentZIndex = parseInt(getComputedStyle(element).zIndex) || 0; // Get current z-index
                element.style.zIndex = 1000;
            }
        });

        console.log('after', objectsOnScreen);

    }

    

    /*
        function showImages(categoryId) {
            const imagePanel = document.getElementById(categoryId);
            const allPanels = document.querySelectorAll('.image-panel');
    
            // Hide all other image panels first
            allPanels.forEach(panel => panel.style.display = 'none');
    
            // Show the clicked category's image panel
            imagePanel.style.display = 'block';
        }
    */


    


    function UpdateElement(e) {
        const index = findIfIndex(e);
        if (index !== undefined) {
            objectHolder[index].top = `${e.pageY - offset.y}px`; //e.target.style.top;
            objectHolder[index].left = `${e.pageX - offset.x}px`; //e.target.style.left;
            shiftArray(objectHolder[index], index);
        }
    }
   /* function findIfIndex(e) {
        for (let index = 0; index < objectHolder.length; index++) {
            const element = objectHolder[index];
            console.log('Comparing:', e.target.id, 'with', element.id);
            if (e.target.id === element.id) {
                console.log('match', index);
                return index;
            }
        }
    }*/
    function shiftArray(e, index) {
        if (arguments.length === 2) {
            const temp = objectHolder[index];
            temp.Zindex = 2;
            for (let i = index; i > 0; i--) {
                objectHolder[i - 1].Zindex += 1;
                objectHolder[i] = objectHolder[i - 1];
            }
            objectHolder[0] = temp;
        }
        else {
            objectHolder.push('place holder');
            for (let i = objectHolder.length - 1; i > 0; i--) {
                objectHolder[i - 1].Zindex += 1;
                objectHolder[i] = objectHolder[i - 1];
            }
            objectHolder[0] = e;
        }
        console.log(objectHolder);
    }
    function startOffArray() {

        objectHolder[0] = {
            src: potatoHead.src,
            alt: potatoHead.alt,
            top: potatoHead.style.top,
            left: potatoHead.style.left,
            Zindex: 1
        }

    }

})();