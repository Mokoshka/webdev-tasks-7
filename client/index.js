'use strict';

require('./index.styl');
require('./images/Mokona.svg');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import {hrunoApp} from './reducer';

import Characteristics from './blocks/characteristics';

import {updateStatus} from './actions';

import {update} from './network/client-requests';
import {setButtonsActions} from './buttons/buttons';
import {setCookie, getCookie} from './network/cookies';
import {setDecreaseMood, setIncreaseMood} from './mood_actions/mood';

import {animate, sleep, wakeUp, listen, stopListen, death, happy, eat} from './animations/animate';

import {setBattery} from './feature/battery';
import {getRecognizer} from './feature/speach_recognition';
import {setDeviceLight} from './feature/ambient_light';
import {setPageVisibility} from './feature/page_visibility';

const store = createStore(hrunoApp);

function render() {
    ReactDom.render(
        <Characteristics store={store} />,
        document.querySelector('.wrapper')
    );
}


update('/status')
    .then((status) => {
        let cookieMood;
        for (let name in status) {
            cookieMood = getCookie(name);
            if (status.hasOwnProperty(name) && cookieMood) {
                status[name] = cookieMood;
            }
        }

        let action = updateStatus(status);
        store.dispatch(action);

        let {characteristics} = store.getState();
        for (let mood in characteristics) {
            if (characteristics.hasOwnProperty(mood)) {
                setDecreaseMood(mood, store, setCookie);
            }
        }
    });

store.subscribe(render);
setButtonsActions(store);

setBattery(store);
setDeviceLight();

setPageVisibility(() => {
    setIncreaseMood('energy', store, setCookie);
    sleep();
}, () => {
    setDecreaseMood('energy', store, setCookie);
    wakeUp();
});

getRecognizer().onresult = event => {
    let index = event.resultIndex;
    let result = event.results[index][0].transcript.trim();
    let log = document.querySelector('.phrases');

    log.innerHTML = result;

    let indicate = document.querySelector('.mood > .statusbar__indicate').innerText - 0 + 10;
    document.querySelector('.mood > .statusbar__indicate').innerText = `${indicate}`;

    if (indicate >= 100) {
        stopListen();
        recognizer.stop();
    }
};








var SpeechRecognition = window.SpeechRecognition     ||
    window.webkitSpeechRecognition;

var recognizer = new SpeechRecognition();


recognizer.lang = 'en-US';

// продолжает слушать и расопзнавать речь даже после паузы
recognizer.continuous = true;     // false по умолчанию

// повзоляет получать промежуточные результаты
recognizer.interimResults = true; // false по умолчанию





let mokona = document.querySelector('#mokona');
mokona.addEventListener('click', event => {
    listen();
}, false);


