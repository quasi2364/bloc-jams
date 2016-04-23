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

var createSongRow = function(songNumber, songName, songLength) {
    var template = 
         '<tr class="album-view-song-item">'
        +'  <td class="song-item-number" data-song-number="' + songNumber +'">' + songNumber + '</td>'
        +'  <td class="song-item-title">' + songName + '</td>'
        +'  <td class="song-item-duration">' + songLength + '</td>'
        +'</tr>'
    ;
        
    return template;
};

var setCurrentAlbum = function(album) {
    
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    
    albumSongList.innerHTML = '';
    
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
    
//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function() {
    setCurrentAlbum(albumBeatles);
    
    var findParentByClassName = function(element, targetClass) {
        if (element) {
            var currentParent = element.parentElement;
            while (currentParent.className != targetClass) {
                currentParent = currentParent.parentElement;
            }
            return currentParent;
        } 
    };
    
    
    var getSongItem = function(element) {
        switch (element.className) {
            case 'album-song-button':
            case 'ion-play':
            case 'ion-pause':
                return findParentByClassName(element, 'song-item-number');
            case 'album-view-song-item':
                return element.querySelector('.song-item-number');
            case 'song-item-title':
            case 'song-item-duration':
                return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
            case 'song-item-number':
                return element;
            default:
                return;
        }  
    };
    
    var clickHandler = function(targetElement) {
        var songItem = getSongItem(targetElement);
        
        if (currentlyPlayingSong === null) {
            songItem.innerHTML = pauseButtonTemplate;
            currentlyPlayingSong = songItem.getAttribute('data-song-number');
        } 
        else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
            songItem.innerHTML = playButtonTemplate;
            currentlyPlayingSong = null;
        }
        else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
            var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
            songItem.innerHTML = pauseButtonTemplate;
            currentlyPlayingSong = songItem.getAttribute('data-song-number');
        }
        
    };
    
    songListContainer.addEventListener('mouseover', function(event) {
        // Only target individual song rows during event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {
            var songItem = getSongItem(event.target);
            
            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
            
        }
    });
    
    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            // #1
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
            
            // #2
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
        });
        
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);  
        });
    }
    
    
    var albums = [albumBeatles, albumMarconi, albumPicasso];
    
    var i = 0;
    var nextAlbum = function() {
        console.log(i);
        return albums[i++];
    };

    
    var test = function(){
        console.log('test');
    }
    albumImage.addEventListener("click", test);
    
//    var cover = document.getElementsByClassName('album-cover-art')[0];
//    var count = 0;
//    
//    cover.addEventListener('click', function(){
//        if(count >= albums.length - 1){
//            count = 0
//        } else {
//            count++;
//        }
//        setCurrentAlbum(albums[count]);
//    })
    
};


