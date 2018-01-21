(function() {
  /* @function SongPlayer
 * @desc function to allow the app to play and pause music
* @type {object}
 */
  function SongPlayer () {
    var SongPlayer = {};


    var currentBuzzObject = null;


    /*
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
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

    SongPlayer.currentSong = song;
  };

  /*
* @desc Active song object from list of songs
* @type {Object}
*/

  SongPlayer.currentSong = null;

    SongPlayer.play = function(song) {
      if (SongPlayer.currentSong !== song) {

      setSong(song);
      currentBuzzObject.play();
      song.playing = true;
    } else if (SongPlayer.currentSong === song) {
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
