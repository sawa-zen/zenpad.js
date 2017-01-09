(function(){
  window.addEventListener('load', init);

  var zenpad;
  var stick,
      command,
      disposeButton,
      setupButton;
  var commandList = "";

  function init() {

    disposeButton = document.getElementById('dispose');
    disposeButton.addEventListener('click', onClickDisposeButton);

    setupButton = document.getElementById('setup');
    setupButton.addEventListener('click', onClickSetupButton);

    stick = document.getElementById('stick');
    command = document.getElementById('command');
    addCommand('');

    setup();
  }

  function setup() {
    zenpad = new Zenpad('myZenpad');

    zenpad.on('clickA', function() {
      addCommand('A');
    });

    zenpad.on('clickB', function() {
      addCommand('B');
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

  function addCommand(commandText) {
    commandList = commandText + commandList;
    commandList = commandList.slice(0, 6);
    command.innerHTML = "commnads : " + commandList;
  }
})()
