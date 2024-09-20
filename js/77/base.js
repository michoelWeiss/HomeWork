(function () {
    'use strict';

    const youtubeVideoContainer = $('<div>').addClass('currentVid').css('position', 'relative');

    const name = $('<h3>').css({
        'position': 'absolute',
        'left': '50%',  
        'transform': 'translateX(-50%)',  
        'padding': '5px 10px',
        'background-color': 'rgba(0, 0, 0, 0.3)', 
        'color': 'black',  
        'font-size': '2em',
        'font-weight': 'bold'
    });

    const closeButton = $('<button>').text('Close Video').css({
        'position': 'absolute',
        'top': '-28px',
        'right': '0px',
        'background-color': 'red',
        'color': 'white',
        'border': '2px solid black',
        'padding': '5px 10px',
        'cursor': 'pointer'
    }).click(exitSong);

    const youtubeVideo = $('<video>').attr('controls', true);
    const source = $('<source>').attr('src', '').attr('type', 'video/mp4');
    youtubeVideo.append(source);
    youtubeVideoContainer.append(youtubeVideo).append(closeButton).append(name).hide();
    $('body').append(youtubeVideoContainer);

    const videocontainer = $('#videocontainer');

    async function getVideos() {
        try {
            const response = await fetch('songs.json');
            if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
            const songs = await response.json();
            displayVideos(songs);
        } catch (e) {
            videocontainer.addClass('error').text(`Failed to load videos: ${e.message}`);
        }
    }

    function displayVideos(songs) {
        videocontainer.empty();
        songs.forEach(song => {
            const videoBox = $('<div>').addClass('videoBox');
            const image = $('<img>').attr('src', song.imageUrl).attr('alt', song.name);
            const title = $('<h3>').text(song.name);
            videoBox.on('click', () => playVid(song));
            videoBox.append(image).append(title);
            videocontainer.append(videoBox);
        });
    }

    function playVid(song) {
        videocontainer.hide();
        youtubeVideoContainer.show();
        source.attr('src', song.videoUrl);
        name.text(song.name);

        setTimeout(() => {
            const nameHeight = name.outerHeight();  
            name.css('top', `-${nameHeight + 40}px`);  
        }, 10);

        youtubeVideo.get(0).load();
        youtubeVideo.get(0).play();
    }

    async function exitSong() {
        await new Promise(resolve => setTimeout(resolve, 100));  // Pause for realism
        youtubeVideo.get(0).pause();
        await new Promise(resolve => setTimeout(resolve, 100));
        youtubeVideoContainer.hide();
        videocontainer.show();
    }

    getVideos();
}());
