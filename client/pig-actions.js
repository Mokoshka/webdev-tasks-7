'use strict';

import {stopAllAnimate, sleep as animateSleep, wakeUp as animateWakeUp, death as animateDeath,
    live as animateLive, eat as animateEat, stopEat as animateStopEat, listen as animateListen,
    stopListen as animateStopListen, reanimate as animateReanimate, happy as animateHappy} from './animations/animate';
import {setIncreaseMood, setDecreaseMood} from './mood_actions/mood';
import {setStorage} from './network/local-storage';

var state = 'live';

function stopAction(name, store, callback = live) {
    switch (name) {
        case 'sleep': {
            wakeUp(store, callback);
            break;
        }
        case 'eat': {
            stopEat(store, callback);
            break;
        }
        case 'listen': {
            stopListen(store, callback);
            break;
        }
        case 'live': {
            callback();
            break;
        }
        default: break;
    }
}

export const live = (store) => {
    stopAction(state, store, animateLive);
};

export const reanimate = () => {
    state = 'live';
    animateReanimate();
};

export const sleep = (store) => {
    stopAction(state, store, animateSleep);
    if (state !== 'death') {
        state = 'sleep';
    }
    setIncreaseMood('energy', store, setStorage);
};

const wakeUp = (store, callback) => {
    state = 'live';
    animateWakeUp(callback);
    setDecreaseMood('energy', store, setStorage);
};

export const eat = (store) => {
    stopAction(state, store, animateEat);
    if (state !== 'death') {
        state = 'eat';
    }
    setIncreaseMood('fullness', store, setStorage);
};

const stopEat = (store, callback) => {
    state = 'live';
    animateStopEat(callback);
    setDecreaseMood('fullness', store, setStorage);
};

export const listen = (store) => {
    stopAction(state, store, animateListen);
    if (state !== 'death') {
        state = 'listen';
    }

    setDecreaseMood('fullness', store, setStorage);
    setDecreaseMood('energy', store, setStorage);
};

const stopListen = (store, callback) => {
    state = 'live';
    animateStopListen(callback);

    setDecreaseMood('mood', store, setStorage);
};

export const death = (store) => {
    stopAction(state, store);
    state = 'death';
    if (state !== 'death') {
        animateDeath();
    }
};

export const happy = () => {
    animateHappy();
};
