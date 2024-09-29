(async function () {
    'use strict';

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { DrawingManager } = await google.maps.importLibrary('drawing');

    const position = { lat: 40.5797, lng: -97.8371 };

    const map = new Map(document.querySelector("#map"),
        {
            zoom: 2,
            center: position,
            mapId: 'DEMO_MAP_ID',
        });

    const drawingManager = new DrawingManager();
    drawingManager.setMap(map);
    drawingManager.addListener('circlecomplete', getCircle);
    drawingManager.addListener('markercomplete', getMark);
    drawingManager.addListener('polygoncomplete', getPoly);
    drawingManager.addListener('polylinecomplete', getLines);
    drawingManager.addListener('rectanglecomplete', getSquar);
    $('#displayCircles').click(displayCircles);
    $('#displaySquars').click(displaySquars);
    $('#displayLines').click(displayLines);
    $('#displayPolys').click(displayPolys);
    $('#displayMarks').click(displayMarks);
    $('#displayAll').click(displayShapes);

    function getCircle(shape) {

        const mycircle = {
            center: shape.getCenter(),
            radius: shape.getRadius(),
        };

        addToStorage('circle', mycircle);
    }

    function getSquar(shape) {

        const bounds = shape.getBounds();
        const mySquar = {
            bounds: {
                north: bounds.getNorthEast().lat(),
                south: bounds.getSouthWest().lat(),
                east: bounds.getNorthEast().lng(),
                west: bounds.getSouthWest().lng(),
            }
        };

        addToStorage('squar', mySquar);
    }

    function getLines(shape) {

        const line = shape.getPath();

        addToStorage('lines', line);

    }

    function getPoly(shape) {

        const polygon = shape.getPaths();
        const pathsArray = [];

        for (let i = 0; i < polygon.getLength(); i++) {
            const path = polygon.getAt(i);
            const pathCoordinates = [];

            for (let j = 0; j < path.getLength(); j++) {
                const latLng = path.getAt(j);
                pathCoordinates.push({ lat: latLng.lat(), lng: latLng.lng() });
            }

            pathsArray.push(pathCoordinates);
        }

        addToStorage('polygon', pathsArray);

    }
    function getMark(shape) {
  
        const mark = shape.getPosition();

        addToStorage('mark', mark);

    }
    function addToStorage(storageType, data) {

        const temp = localStorage[storageType];
        if (temp) {
            const tempArray = JSON.parse(temp);
            tempArray.push(data);
            localStorage[storageType] = JSON.stringify(tempArray);
        }
        else {
            const myArray = [data];
            localStorage[storageType] = JSON.stringify(myArray);
        }

    }
    function displayCircles() {

        const storedCircle = localStorage.circle;

        if (storedCircle) {

            const parsedCircle = JSON.parse(storedCircle);

            parsedCircle.forEach(c => {
                const circle = new google.maps.Circle({
                    center: c.center,
                    radius: c.radius,
                    map: map,
                });
            });

        }
    }
    function displaySquars() {

        const storedSquar = localStorage.squar;
        if (storedSquar) {
            const parsedSquar = JSON.parse(storedSquar);

            parsedSquar.forEach(s => {

                const bounds = {
                    north: s.bounds.north,
                    south: s.bounds.south,
                    east: s.bounds.east,
                    west: s.bounds.west,
                };

                const squar = new google.maps.Rectangle({
                    bounds: bounds,
                    map: map
                });

            })

        }
    }
    function displayLines() {
        const storedLines = localStorage.lines;
        if (storedLines) {
            const parsedLines = JSON.parse(storedLines);

            parsedLines.forEach(l => {
                const line = new google.maps.Polyline({
                    path: l.Eg,
                    map: map
                });
            })
        }
    }

    function displayMarks() {

        const getMark = localStorage.mark;
        if (getMark) {
            const parsedmark = JSON.parse(getMark);

            parsedmark.forEach(m => {
                console.log(m);
                const line = new google.maps.Marker({
                    position: m,
                    map: map
                });
            });


        }
    }

    function displayPolys() {
        const getPolygon = localStorage.polygon;
        if (getPolygon) {
            const parsedPoly = JSON.parse(getPolygon);
            parsedPoly.forEach(p => {

                const line = new google.maps.Polygon({
                    paths: p,
                    map: map
                });
            })
        }
    }

    function displayShapes() { 
        displayCircles();
        displaySquars();
        displayLines();
        displayMarks();
        displayPolys();
    }
}());