(function() {
  /* @function SongPlayer
  * @desc function to allow the app to play and pause music
* @type {object}
  */

  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /* @attribute currentAlbum
    * @desc attribute that retrievs the current album from Fixtures
  * @type private attribute
    */
    var currentAlbum = Fixtures.getAlbum();

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
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(title.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = title;
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
    /* @function getSongIndex
    * @desc function to display what song is currently playing from the current album
  * @type {object} song
    */
    var getSongIndex = function(title) {
      return currentAlbum.songs.indexOf(title);
    }

    SongPlayer.currentSong = null;

    SongPlayer.play = function(title) {
      title = title || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== title) {

      setSong(title);
      playSong(title);
    } else if (SongPlayer.currentSong === title) {
      if (currentBuzzObject.isPaused()) {
        playsong(title);
      }
    }
    };

    SongPlayer.pause = function(title) {
      title = title || SongPlayer.currentSong;
      currentBuzzObject.pause();
      title.playing = false;
    };
    /* @method SongPlayer.previous
    * @desc method to allow the user to select the previous song on the album
  * @type {object}
    */
    SongPlayer.previous = function () {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    }

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
