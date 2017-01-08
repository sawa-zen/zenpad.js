(function(){
  window.addEventListener('load', init);

  var zenpad;
  var disposeButton;

  function init() {

    disposeButton = document.getElementById('dispose');
    disposeButton.addEventListener('click', onClickDisposeButton);

    setup();
  }

  function setup() {
    zenpad = new Zenpad('myZenpad');

    zenpad.on('clickA', function() {
      console.info('clickA');
    });

    zenpad.on('clickB', function() {
      console.info('clickB');
    });

    zenpad.on('moveStick', function(event) {
      console.info('moveStick', event);
    });

    zenpad.on('releaseStick', function() {
      console.info('releaseStick');
    });
  }

  function onClickDisposeButton() {
    if(!zenpad) {
      return;
    }

    zenpad.dispose();
  }
})()
