
    var player = videojs('my-player');
    player.contextmenuUI({
content: [{

  // A plain old link.
  href: 'https://github.com/codemk/mk-player',
  label: 'MK Video Player'
}, {
  href: 'https://www.brightcove.com/',
  label: 'Nishi IT Ltd bd here ok'
},
{

  // A link with a listener. Its `href` will automatically be `#`.
  label: 'Example Link',
  listener: function() {
    alert('you clicked the example link!');
  }
}]
});
