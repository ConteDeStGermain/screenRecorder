const { desktopCapturer } = require('electron');
const fs = require('fs');
const moment = require('moment');

// Get today's date.
let now = new Date();

// Set the recording time.
let recordDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0);

let duration = 10*1000; // Recording for 10 seconds.

// Initiate timer
setTimeout(startRecording, 100);


function startRecording() {  
  desktopCapturer.getSources({types: ['screen']}).then(async sources => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sources[0].id,
        }
      }
    });

    const options = { mimeType: 'video/webm; codecs=vp9' };
    const mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;

    // Starts recording
    mediaRecorder.start();

    // Stops recording after 10 seconds
    setTimeout(() => mediaRecorder.stop(), duration);  
  }).catch(err => {
    console.error('Failed to get sources: ' + err);
  });
}

function handleDataAvailable(e) {
  // Append the data to the file.
  fs.appendFileSync('screencapture.webm', e.data);
}

function handleStop(e) {
  console.log('Recording finished.');
}

