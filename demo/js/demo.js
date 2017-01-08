(function(){
  window.addEventListener('load', init);

  var zenpad;
  var disposeButton,
      setupButton;

  function init() {

    disposeButton = document.getElementById('dispose');
    disposeButton.addEventListener('click', onClickDisposeButton);

    setupButton = document.getElementById('setup');
    setupButton.addEventListener('click', onClickSetupButton);

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

  function onClickSetupButton() {
    if(zenpad) {
      return;
    }

    setup();
  }

  function onClickDisposeButton() {
    if(!zenpad) {
      return;
    }

    zenpad.dispose();
    zenpad = null;
  }
})()
