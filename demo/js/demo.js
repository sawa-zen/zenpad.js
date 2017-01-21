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
    displayStickData(0, 0, 0, 0);

    command = document.getElementById('command');
    addCommand('');

    setup();
  }

  function setup() {
    zenpad = new Zenpad('myZenpad');

    zenpad.on('touchstartA', function() {
      addCommand('A');
      console.info('touchstartA');
    });
    zenpad.on('touchendA', function() {
      console.info('touchendA');
    });

    zenpad.on('touchstartB', function() {
      addCommand('B');
      console.info('touchstartB');
    });
    zenpad.on('touchendB', function() {
      console.info('touchendB');
    });

    zenpad.on('moveStick', function(event) {
      console.info('moveStick');
      displayStickData(event.x, event.y, event.angle, event.length);
    });

    zenpad.on('releaseStick', function() {
      console.info('releaseStick');
      displayStickData(0, 0, 0, 0);
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

  function displayStickData(x, y, angle, length) {
    text = "x : " + x + "<br/>" +
           "y : " + y + "<br/>" +
           "angle : " + Math.floor(angle) + "<br/>" +
           "length : " + Math.floor(length);
    stick.innerHTML = text;
  }

  function addCommand(commandText) {
    commandList = commandText + commandList;
    commandList = commandList.slice(0, 10);
    command.innerHTML = "commands : " + commandList;
  }
})()
