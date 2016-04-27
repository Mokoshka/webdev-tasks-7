'use strict';

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const getRecognizer = () => {
    var recognizer = new SpeechRecognition();
    recognizer.lang = 'en-US';
    recognizer.continious = true;

    return recognizer;
};


