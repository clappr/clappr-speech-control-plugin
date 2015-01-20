var ContainerPlugin = require('container_plugin');
var JST = require('./jst');
var _ = require('underscore');

class SpeechControl extends ContainerPlugin {
  get name() { return 'speech_control' }

  constructor(options) {
    super(options)
    if ('webkitSpeechRecognition' in window) {
      this.createRecognition()
    }
  }

  createRecognition() {
    this.recognition = new webkitSpeechRecognition()
    this.recognition.continuous = true
    this.recognition.interimResults = true
    this.recognition.addEventListener('start', () => this.recognitionStarted())
    this.recognition.addEventListener('end', () => this.recognitionEnded())
    this.recognition.addEventListener('result', (event) => this.recognitionTalked(event))
    this.recognition.addEventListener('error', function (error) { console.log(error) })
    this.recognition.start()
  }

  recognitionStarted() { console.log('start receiving voice commands') }

  recognitionEnded() { console.log('done receiving voice commands') }

  recognitionTalked(event) { this.handleCommand(event) }

  executeCommand(message) {
    if (message.match(/play/)) {
      console.log("playing")
      if (!this.container.isPlaying()) this.container.play()
    } else if (message.match(/stop/)) {
      console.log("stopping")
      this.container.stop()
    } else if (message.match(/pause/)) {
      console.log("pausing")
      this.container.pause()
    } else if (message.match(/mute/)) {
      console.log("muting")
      this.container.setVolume(0)
    } else {
      console.log('unrecognized command:', message)
    }
  }

  handleCommand(event) {
    if (event.results && event.results.length) {
      for (var i = event.resultIndex; i <= event.results.length; ++i) {
        if (_.has(event.results[i], 0)) {
          this.executeCommand(event.results[i][0].transcript)
        }
      }
    }
  }
}

module.exports = window.SpeechControl = SpeechControl;
