//==== ALBUM OBJECTS ===========================

var albumPicasso = {
    title: "The Colors",
    artist: "Pablo Picasso",
    label: 'Cubism',
    year: '1981',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        {title: 'Hello, Operator', duration: '1:01'},
        {title: 'Ring Ring', duration: '2:01'},
        {title: 'Can you hear me knocking', duration: '3:01'},
        {title: 'Wrong number', duration: '4:01'}
    ]
};

var albumMarconi = {
    title: "The Telephone",
    artist: "Marconi",
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        {title: 'Hello, Operator', duration: '1:01'},
        {title: 'Ring Ring', duration: '2:01'},
        {title: 'Can you hear me knocking', duration: '3:01'},
        {title: 'Wrong number', duration: '4:01'}
    ]
};

var albumBeatles = {
    title: "Abbey Road",
    artist: "The Bealtes",
    label: 'EMI',
    year: '1969',
    albumArtUrl: 'assets/images/album_covers/06.png',
    songs: [
        {title: 'Come Together', duration: '1:01'},
        {title: 'Something', duration: '2:01'},
        {title: 'Maxwell Silver Hammer', duration: '3:01'},
        {title: 'Sun King', duration: '4:01'}
    ]
};

//===== CREATE A SINGLE SONG ROW FOR ALBUM VIEW ======
//Called by the setCurrent Album function

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
         '<tr class="album-view-song-item">'
        +'  <td class="song-item-number" data-song-number="' + songNumber +'">' + songNumber + '</td>'
        +'  <td class="song-item-title">' + songName + '</td>'
        +'  <td class="song-item-duration">' + songLength + '</td>'
        +'</tr>'
    ;
        
    var $row = $(template);
    
    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');
        
        if (currentlyPlayingSong !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if (currentlyPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
    };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

//===== SET THE CURRENT ALBUM ======

var setCurrentAlbum = function(album) {
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i +1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};


    
//====== ALBUM BUTTON TEMPLATES ==============

// Play Button
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

//Pause Button
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


//===== STORE STATE OF PLAYING SONG ===========

var currentlyPlayingSong = null;


//======== DOCUMENT READY =========================

$(document).ready(function() {

    setCurrentAlbum(albumBeatles);
   
});


