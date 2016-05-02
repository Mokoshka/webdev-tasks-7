'use strict';

import {setCookie} from '../network/cookies';

var soundsTimeout;
const surgeDomain = 'http://mokona.surge.sh/';
var sounds = [
    `${surgeDomain}moan1.mp3`,
    `${surgeDomain}moan2.mp3`,
    `${surgeDomain}moan6.mp3`,
    `${surgeDomain}moan7.mp3`,
    `${surgeDomain}death.mp3`
];

var player = document.querySelector('.player');

export const setVolumeControl = (clientVolume) => {
    var changeInput = document.querySelector('.volume__control');
    var changeLabel = document.querySelector('.volume__display');

    if (clientVolume) {
        changeInput.value = clientVolume;
        changeLabel.innerText = clientVolume;
        player.volume = clientVolume / 100;
    }
    changeInput.addEventListener('input', () => {
        changeLabel.innerText = changeInput.value;
    }, false);

    changeInput.addEventListener('change', () => {
        player.volume = changeInput.value / 100;
        setCookie('volume', changeInput.value);
    }, false);
};

export const setTimeoutForPlay = () => {
    let delay = Math.random() * (10000 - 3000) + 3000;
    let soundNumber = Math.floor(Math.random() * 4);
    setTimeout(() => {
        play(sounds[soundNumber]);
        setTimeoutForPlay();
    }, delay);
};

const play = (source) => {
    player.src = source;
    player.play();
};

export const playDeath = () => {
    deleteSounds();
    player.src = sounds[4];
    player.play();
};
