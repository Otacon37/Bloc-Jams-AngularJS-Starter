(function() {
  /* @function SongPlayer
  * @desc function to allow the app to play and pause music
* @type {object}
  */

  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;
    /*
* @desc Buzz object audio file
* @type {Object}
*/
    var currentBuzzObject = null;
    /*
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(title) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(title.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = title;
    };
    /*
    * @function playSong
    * @desc Sets the state of title.playing to true and plays the current song
    * @param {Object} song
    */
    var playSong = function(title) {
      currentBuzzObject.play();
      title.playing = true;
    }

    SongPlayer.play = function(title) {
      if (currentSong !== title) {

      setSong(title);
      playSong(title);
    } else if (currentSong === title) {
      if (currentBuzzObject.isPaused()) {
        playsong(title);
      }
    }
    };

    SongPlayer.pause = function(title) {
      currentBuzzObject.pause();
      title.playing = false;
    }

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer)
})();
