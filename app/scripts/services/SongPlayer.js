(function() {
  /* @function SongPlayer
 * @desc function to allow the app to play and pause music
* @type {object}
 */
  function SongPlayer () {
    var SongPlayer = {};

    var currentSong = null;
    var currentBuzzObject = null;


    /*
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

    /*
    * @function playSong
    * @desc Sets the state of title.playing to true and plays the current song
    * @param {Object} song
    */
    var playSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.play();
        song.playing = true;
      }
    }


    currentBuzzObject = new buzz.sound(song.audioUrl, {
      formats: ['mp3'],
      preload: true
    });

    currentSong = song;
  };

    SongPlayer.play = function(song) {
      if (currentSong !== song) {

      setSong(song);
      currentBuzzObject.play();
      song.playing = true;
    } else if (currentSong === song) {
      if (currentBuzzObject.isPaused()) {
        currentBuzzObject.play();
        song.playing = true;
      }
    }
    };

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }
    return SongPlayer;
  }

  angular
      .module('blocJams')
      .factory('SongPlayer', SongPlayer);
})();
