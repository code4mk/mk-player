/*
 *  Copyright (c) 2013 Funny or Die, Inc.
 *  http://www.funnyordie.com
 *  https://github.com/funnyordie/videojs-imageOverlay/blob/master/LICENSE.md
 */

(function(window, videojs) {
  var defaults = {
      image_url: null,
      click_url:     '',
      start_time: null,
      end_time: null,
      opacity: 0.9,
      height: '100%',
      width: '40%',
      meend: 10,
  },
  imageOverlay = function(options) {
    var player = this,
        settings = videojs.mergeOptions(defaults, options),
        showingImage = false;

    if (settings.start_time === null)
      settings.start_time = 0;

    overlay = {
      checkEndTime: function() {
        if (settings.end_time === null) {
          settings.end_time = player.duration() + 1;
        }
      },
      checkOverlay: function() {
        // if ((player.currentTime() >= settings.start_time) && (player.currentTime() < settings.end_time)) {
        //   overlay.showImage();
        // } else {
        //   overlay.hideImage();
        // }
        if ((player.currentTime() >= settings.start_time)&& (player.currentTime() < settings.start_time + settings.meend )) {
          overlay.showImage();
        } else {
          overlay.hideImage();
        }
      },



      showImage: function() {
        if (showingImage) {
          return;
        }
        showingImage = true;
        var holderDiv = document.createElement('div');
        holderDiv.id = 'vjs-image-overlay-holder';
        holderDiv.style.height = settings.height;
        holderDiv.style.width = settings.width;

        if (settings.image_url) {
            var overlayImage = document.createElement('img');
            overlayImage.src = settings.image_url;
            overlayImage.style.opacity = settings.opacity;
            holderDiv.appendChild(overlayImage);
        }

        var meclose = document.createElement('p');
        meclose.innerHTML = '';
        holderDiv.appendChild(meclose);

        overlayImage.onclick = function() {
          player.pause();
          window.open(settings.click_url);
        };

        meclose.onclick = function() {
          overlay.hideImage();
          settings.meend = 0;
        };




        player.el().appendChild(holderDiv);
      },
      hideImage: function() {
        if (!showingImage) {
          return;
        }
        showingImage = false;
        player.el().removeChild(document.getElementById('vjs-image-overlay-holder'));
      }
    };

    player.on('timeupdate', overlay.checkOverlay);

    player.on('loadedmetadata', overlay.checkEndTime);
  };

  videojs.plugin('imageOverlay', imageOverlay);
}(window, window.videojs));
