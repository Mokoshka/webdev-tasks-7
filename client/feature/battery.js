'use strict';

import {setIncreaseMood, setDecreaseMood} from '../mood_actions/mood';
import {setCookie} from '../network/cookies';

export const setBattery = (store, chargeCb, dischargeCb) => {
    if (!navigator.getBattery) {
        return;
    }

    const initBattery = (battery) => {
        battery.onchargingchange = () => {
            if (battery.charging) {
                //setIncreaseMood('fullness', store, setCookie);
                chargeCb(store);
            } else {
                //setDecreaseMood('fullness', store, setCookie);
                dischargeCb(store);
            }
        };
        battery.onchargingchange();
    };

    navigator
        .getBattery()
        .then(initBattery);

    return true;
};
