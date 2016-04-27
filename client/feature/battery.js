'use strict';

import {setIncreaseMood, setDecreaseMood} from '../mood_actions/mood';
import {setCookie} from '../network/cookies';

export const setBattery = (store) => {
    if (!navigator.getBattery) {
        return;
    }

    const initBattery = (battery) => {
        battery.onchargingchange = () => {
            //console.log('change charging');
            if (battery.charging) {
                setIncreaseMood('fullness', store, setCookie);
            } else {
                setDecreaseMood('fullness', store, setCookie);
            }
        };
        battery.onchargingchange();
    };

    navigator
        .getBattery()
        .then(initBattery);
};
