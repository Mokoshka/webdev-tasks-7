'use strict';

import {sleep, wakeUp} from '../animations/animate';

export const setDeviceLight = (store, lightCb, darkCb) => {
    if (!('ondevicelight' in window)) {
        return;
    }

    window.ondevicelight = event => {
        if (event.value < 40) {
            darkCb(store);
        } else {
            lightCb(store);
        }
    };

    return true;
};
