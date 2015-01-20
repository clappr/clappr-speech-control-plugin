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

  recognitionStarted() {}

  recognitionEnded() {}

  recognitionTalked(event) {
    var message = this.getMessage(event)
    if (message.match(/play/)) {
      if (!this.container.isPlaying()) this.container.play()
    }
  }

  getMessage(event) {
    if (event.results && event.results.length) {
      for (var i = 0; i <= event.results.length; i++) {
        if (!!event.results[i] && event.results[i][0]) {
          return event.results[i][0].transcript
        }
      }
    }
    return undefined
  }
}

module.exports = window.SpeechControl = SpeechControl;
