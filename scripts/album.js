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
        +'  <td class="song-item-number">' + songNumber + '</td>'
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

window.onload = function() {
    setCurrentAlbum(albumBeatles);
    
    albumImage.addEventListener("click", setCurrentAlbum(nextAlbum));
    
    i = 1;
    var nextAlbum = function() {
        var albums = [albumBeatles, albumMarconi, albumPicasso];
        return albums[i];
        i++;
    };
};

