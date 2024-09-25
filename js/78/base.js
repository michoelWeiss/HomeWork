(async function () {
    'use strict';

    const button = $('#load');
    const input = $('#userparam');
    let markersArray = [];
    let openWindow;

    button.click(getLocations);

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const position = { lat: 40.5797, lng: -97.8371 };

    const map = new Map(document.querySelector("#map"), {
        zoom: 2,
        center: position,
        mapId: 'DEMO_MAP_ID',
    });


    async function getLocations() {
        if (input.val()) {
            input.css('background-color', 'white');
             const myKey = key.geonamesKey();  ////// Insert Your "geonames" Key Here ///////
            try {
               
                const f = await fetch(`http://api.geonames.org/wikipediaSearch?q=${input.val()}&maxRows=10&username=${myKey}&type=json`);
                if (!f.ok) {
                    throw new Error(`HTTP error! status: ${f.status}`);
                }
                const text = await f.json();
                display(text.geonames);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        else {
            input.css('background-color', 'rgb(252, 99, 72)')
        }

    }

    async function display(locations) {

        clearMarkers();

        for (let i = 0; i < locations.length; i++) {

            const { lng, lat, summary, thumbnailImg, title, wikipediaUrl } = locations[i];

            const marker = new AdvancedMarkerElement({
                map: map,
                position: { lat, lng },
                title: title,
            });

            markersArray.push(marker);

            const infowindow = new google.maps.InfoWindow();

            const content = `<div class="info-window">
                                 <div class="info-header">
                                     <h2>${title}</h2>
                                     <img id="thumbnailIcon" src="${thumbnailImg}" alt="Picture of ${title}">
                                 </div>
                                   <h4>${summary}</h4><br>
                                  <a href="https://${wikipediaUrl}" target="_blank">More Info</a>
                                </div>`;

            marker.contentString = content;
            marker.addListener("click", () => {
                infowindow.setContent(marker.contentString);
                infowindow.open({
                    anchor: marker,
                    map,
                });
                closeinfoWindow(infowindow);
            });
        }
    }

    function clearMarkers() {
        for (let i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        markersArray = [];
    }

    function closeinfoWindow(infowindow) {

        if (openWindow) openWindow.close();
        openWindow = infowindow;
    }
}());