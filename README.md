# Clappr Speech Control Plugin

[![Greenkeeper badge](https://badges.greenkeeper.io/clappr/clappr-speech-control-plugin.svg)](https://greenkeeper.io/)

Control [Clappr player](http://github.com/globocom/clappr) using your voice. See it working [here](https://vimeo.com/117335085) or give you a [try](http://flv.io/speech_control.html).

## How to use

Import speech_control.min.js

```javascript
<script type="text/javascript" src="http://flv.io/speech_control.min.js"></script>
```
and create Clappr Player adding the external plugin:

```javascript
var player = new Clappr.Player({
      source: "http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4", 
      parentId: "#player-wrapper", 
      plugins: {'container': [SpeechControl]}
    );
```

It uses HTML5 [Speech Recognition](http://shapeshed.com/html5-speech-recognition-api/) API and only Chrome supports it for now.
