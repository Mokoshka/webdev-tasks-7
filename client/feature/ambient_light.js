'use strict';

import {sleep, wakeUp} from '../animations/animate';

export const setDeviceLight = () => {
    if (!('ondevicelight' in window)) {
        return;
    }

    window.ondevicelight = event => {
        if (event.value < 40) {
            sleep();
        } else {
            wakeUp();
        }
    };
};
