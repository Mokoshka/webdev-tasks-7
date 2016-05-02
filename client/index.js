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
import {setButtonsActions, changeValueOfBtn} from './buttons/buttons';
import {setStorage, getStorage, setChangeListener} from './network/local-storage';
import {setCookie, getCookie} from './network/cookies';
import {setDecreaseMood, setIncreaseMood} from './mood_actions/mood';
import {setImg} from './animations/animate';

import {setBattery} from './feature/battery';
import {getRecognizer} from './feature/speach_recognition';
import {setDeviceLight} from './feature/ambient_light';
import {setPageVisibility} from './feature/page_visibility';
import {setVolumeControl, setTimeoutForPlay, playDeath} from './feature/sounds';
import {setNotification, sendNotification} from './feature/notification';

import {live, sleep, listen, eat, death, happy} from './pig-actions';

const store = createStore(hrunoApp);

function render() {
    ReactDom.render(
        <Characteristics store={store} />,
        document.querySelector('.menu__wrapper')
    );
}

update('/status')
    .then((status) => {
        let clientMood;
        for (let name in status) {
            clientMood = getStorage(name);
            if (status.hasOwnProperty(name) && clientMood) {
                status[name] = clientMood;
            }
        }

        let action = updateStatus(status);
        store.dispatch(action);

        let {characteristics} = store.getState();
        for (let mood in characteristics) {
            if (characteristics.hasOwnProperty(mood)) {
                setDecreaseMood(mood, store, setStorage);
            }
        }
    });

setImg('./mokona.svg');
store.subscribe(render);
setButtonsActions(store);

var recognizer = getRecognizer();
if (recognizer) {
    recognizer.onresult = event => {
        let index = event.resultIndex;
        let result = event.results[index][0].transcript.trim();
        let log = document.querySelector('.phrases');

        log.innerHTML = result;
        happy();

        let indicate = document.querySelector('.mood > .statusbar__indicate').innerText - 0 + 10;
        if (indicate > 100) {
            indicate = 100;
        }
        document.querySelector('.mood > .statusbar__indicate').innerText = `${indicate}`;

        if (indicate >= 100) {
            recognizer.stop();
        }
    };

    let detected = document.querySelector('.support__speech .support__detected');
    detected.innerText = 'On';
    detected.setAttribute('class', 'support__detected support__detected_on');
}

function eatAction(store) {
    if (recognizer) {
        recognizer.stop();
    }
    document.querySelector('.phrases').style.border = '';
    changeValueOfBtn('sleep', 'Спать');
    eat(store);
}

function sleepAction(store) {
    if (recognizer) {
        recognizer.stop();
    }
    document.querySelector('.phrases').style.border = '';
    sleep(store);
}

var isHasBattery = setBattery(store, eatAction, live);
if (isHasBattery) {
    let detected = document.querySelector('.support__battery .support__detected');
    detected.innerText = 'On';
    detected.setAttribute('class', 'support__detected support__detected_on');
}

var isHasDeviceLight = setDeviceLight(store, live, sleepAction);
if (isHasDeviceLight) {
    let detected = document.querySelector('.support__light .support__detected');
    detected.innerText = 'On';
    detected.setAttribute('class', 'support__detected support__detected_on');
}

var isHasPageVisibility = setPageVisibility(store, sleepAction, live);
if (isHasPageVisibility) {
    let detected = document.querySelector('.support__visibility .support__detected');
    detected.innerText = 'On';
    detected.setAttribute('class', 'support__detected support__detected_on');
}

setVolumeControl(getCookie('volume'));
setTimeoutForPlay();

const ableToNotify = setNotification();
if (ableToNotify) {
    let detected = document.querySelector('.support__notification .support__detected');
    detected.innerText = 'On';
    detected.setAttribute('class', 'support__detected support__detected_on');
}

let mokona = document.querySelector('.hrunogochi');
mokona.addEventListener('click', () => {
    changeValueOfBtn('sleep', 'Спать');
    listen(store);
    document.querySelector('.phrases').style.border = 'solid 4px black';
}, false);

setChangeListener((event) => {
    let {characteristics} = store.getState();
    let counter = 0;
    for (let name in characteristics) {
        if (characteristics.hasOwnProperty(name)) {
            if (characteristics[name] === 0) {
                counter += 1;
            }
        }
    }

    if (event.value === 10 && ableToNotify && event.value - event.oldValue < 0) {
        Notification.requestPermission(sendNotification(event.name));
    }

    if (event.value - event.oldValue > 0 && event.value === 100) {
        live(store);
        document.querySelector('.phrases').style.border = '';
        changeValueOfBtn('sleep', 'Спать');
    }

    if (counter > 1) {
        document.querySelector('.phrases').style.border = '';
        changeValueOfBtn('sleep', 'Спать');
        playDeath();
        death(store);
    }
});
