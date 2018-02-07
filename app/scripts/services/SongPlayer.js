(function() {
  /* @function SongPlayer
 * @desc function to allow the app to play and pause music
* @type {object}
 */
  function SongPlayer ($rootScope, Fixtures) {
    var SongPlayer = {};

/*
@desc Attribute that stores the current album
*/
    var currentAlbum = Fixtures.getAlbum();
    var currentBuzzObject = null;

    var stopSong = function(song) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

    /*
    * @function playSong
    * @desc Sets the state of song.playing to true and plays the current song
    * @param {Object} song
    */
    var playSong = function(song) {
        currentBuzzObject.play();
        song.playing = true;
    }

    /*
    * @function muteSong
    * @desc toggles the mute of the current song
    * @param {Object} songs
    */
    var muteSong = function(song) {
      currentBuzzObject.toggleMute();
      if (currentBuzzObject.isMuted()) {
        song.muted = true;
      } else {
        song.muted = false;
      }
    }

    /*
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong(song);
      }

    currentBuzzObject = new buzz.sound(song.audioUrl, {
      formats: ['mp3'],
      preload: true
    });

    currentBuzzObject.bind('timeupdate', function() {
      $rootScope.$apply(function() {
        SongPlayer.currentTime = currentBuzzObject.getTime();
      });
    });

    SongPlayer.currentSong = song;
  };
/*
@function getSongIndex
@desc sets the index of the current song
@param song
*/
  var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
  };

  /*
* @desc Active song object from list of songs
* @type {Object}
*/

  SongPlayer.currentSong = null;

/*
*@desc Current playback time (in seconds) of currently playing songs
*@type {Number}
*/
  SongPlayer.currentTime = null;

/*
* @desc Current volume of currently playing song
* @type {Number}
*/

  SongPlayer.volume = null;

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {

      setSong(song);
      playSong(song);
    } else if (SongPlayer.currentSong === song) {
      if (currentBuzzObject.isPaused()) {
        playSong(song);
      }
    }
    };

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    SongPlayer.mute = function(song) {
      song = song || SongPlayer.currentSong;
      muteSong(song);
    };
    /*
    @method previous
    @desc sets the index of the current song back one in the album
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0) {
      stopSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];

        setSong(song);
        playSong(song);
      }
    };

    /*
    @method next
    @desc sets the index of the current song to the next in the album
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if(currentSongIndex > currentAlbum.songs.length) {
      stopSong(song);
      } else {

      var song = currentAlbum.songs[currentSongIndex];

      setSong(song);
      playSong(song);
    }
    }

    /*
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time
*/

  SongPlayer.setCurrentTime = function(time) {
    if (currentBuzzObject) {
      currentBuzzObject.setTime(time);
    }
  };

  SongPlayer.setVolume = function(volume) {
    if (currentBuzzObject) {
      currentBuzzObject.setVolume(volume);
    }
  };
    return SongPlayer;
  }

  angular
      .module('blocJams')
      .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
