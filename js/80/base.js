(function () {
    'use strict';

    ///  Music Control ///
    const audio = document.querySelector('#myAudio');
    function playAudio() {
        audio.volume = 0.08;
        audio.play();
        document.removeEventListener('click', playAudio);
        document.addEventListener('mousedown', playAudio);
        document.removeEventListener('keydown', playAudio);
    }

    document.addEventListener('click', playAudio);
    document.addEventListener('mousedown', playAudio);
    document.addEventListener('keydown', playAudio);

    ///  Accessories button display effect ///
    const accessoriesButt = document.querySelector('.dropdown-btn');
    accessoriesButt.addEventListener('click', AccessoriesButtclicked);
    function AccessoriesButtclicked() {
        const dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
            accessoriesButt.classList.remove('moveable');

            const rect = accessoriesButt.getBoundingClientRect();
            dropdownContent.style.position = 'absolute';
            dropdownContent.style.top = `${rect.bottom}px`;
            dropdownContent.style.left = `${rect.left}px`;

            dropdownContent.style.display = 'block';

        }
        else {
            dropdownContent.style.display = 'none';
            accessoriesButt.classList.add('moveable');
        }
    }
   /* const categoryNames = document.querySelectorAll('.category-name');
    categoryNames.forEach(category => {
        category.addEventListener('click', () => {
            const imagePanel = category.nextElementSibling;
            if (imagePanel.style.display === 'block') {
                imagePanel.style.display = 'none';
            } else {
                imagePanel.style.display = 'block';
            }
        });
    }); */

    const categoryNames = document.querySelectorAll('.category-name');
categoryNames.forEach(category => {
    category.addEventListener('click', () => {
        const imagePanel = category.nextElementSibling;
        
        // Hide all other image panels first
        document.querySelectorAll('.image-panel').forEach(panel => {
            if (panel !== imagePanel) panel.style.display = 'none';
        });

        // Toggle the clicked image panel
        imagePanel.style.display = imagePanel.style.display === 'block' ? 'none' : 'block';
    });
});

    ///   Make Moveable ///
    let dragging = null;
    let offset = { x: 0, y: 0 };
    document.addEventListener('mousedown', e => {
        if (e.target.classList.contains('moveable')) {
            e.preventDefault();
            dragging = e.target;
            offset = { y: e.offsetY, x: e.offsetX };
            UpdateZIndex(dragging);
        }
    });

    document.addEventListener('mousemove', e => {
        if (dragging) {
            e.preventDefault();
            dragging.style.position = 'absolute';
            dragging.style.top = `${e.pageY - offset.y}px`;
            dragging.style.left = `${e.pageX - offset.x}px`;
        }

    });

    document.addEventListener('mouseup', e => {
        if (e.target.classList.contains('moveable')) {
            isOnTop(dragging);
            dragging = null;
        }
    });

    /// Add To Array ///
    let objectsOnScreen = [];
    function AddToArray(img) {
        objectsOnScreen.push(img);
    }

    /// Make New Element And Add To Array ///
    let usedID = [];

    const acsesory = document.querySelectorAll('.makeNew');
    acsesory.forEach(item => {
        item.addEventListener('click', makeNewElement);
    });

    function makeNewElement(e) {
        if (e.target) {
            const id = generateUniqueId();
            const container = document.createElement('div');
            const img = document.createElement('img');
            img.src = e.target.src;
            img.id = id;
            img.className = 'moveable';
            if (e.target.classList.contains('potatoHead'))
                img.classList.add('potatoHead');
            UpdateZIndex(img);
            AddToArray(img);
            container.appendChild(img);
            document.body.appendChild(container);
        }
    }
    function generateUniqueId() {
        while (true) {
            const id = 'img-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
            if (!usedID.includes(id)) {
                usedID.push(id);
                return id;
            }
        }
    }

    /// Update Ellements ///
    let nextZIndex = 2;
    function UpdateZIndex(e) {
        for (let i = 0; i < objectsOnScreen.length; i++) {
            if (
                !e.classList.contains('potatoHead') &&
                !e.classList.contains('dropdown-btn') &&
                !e.closest('.dropdown-content') &&
                e.id === objectsOnScreen[i].id
            ) {
                objectsOnScreen[i].style.zIndex = nextZIndex;
                nextZIndex += 1;
            }
        }
    }

    /// Throw Out Element ///
    const targetImg = document.querySelector('#trashCanContainer');
    function isOnTop(movedImg) {
        console.log(movedImg);
        if (
            !movedImg.classList.contains('dropdown-btn') &&
            !movedImg.classList.contains('category-name') &&
            !movedImg.classList.contains('makeNew')
        ) {
            const movedId = movedImg.id;
            const movedRect = movedImg.getBoundingClientRect();
            const targetRect = targetImg.getBoundingClientRect();

            const movedCenterX = movedRect.left + movedRect.width / 2;
            const movedCenterY = movedRect.top + movedRect.height / 2;

            const isOnTop = (
                movedCenterX >= targetRect.left &&
                movedCenterX <= targetRect.right &&
                movedCenterY >= targetRect.top &&
                movedCenterY <= targetRect.bottom
            );
            if (isOnTop) {
                const index = objectsOnScreen.findIndex(obj => obj.id === movedId);
                if (index !== -1) {
                    objectsOnScreen.splice(index, 1);
                    movedImg.remove();
                }
            }
        }
    }
}());