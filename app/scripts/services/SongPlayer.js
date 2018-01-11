(function() {
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

    SongPlayer.play = function(title) {
      if (currentSong !== title) {

      setSong(title);
      currentBuzzObject.play();
      title.playing = true;
    } else if (currentSong === title) {
      if (currentBuzzObject.isPaused()) {
        currentBuzzObject.play();
        title.playing = true;
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
