'use strict';

import {setCookie, deleteCookie} from '../network/cookies';
import {update} from '../network/client-requests';

import {setDecreaseMood, setIncreaseMood} from '../mood_actions/mood';
import {sleep, wakeUp, listen} from '../animations/animate';

import {updateStatus} from '../actions';

export const setButtonsActions = (store) => {
    document.querySelector('.restart').addEventListener('click', () => {
        deleteCookie();
        update('/status')
            .then((status) => {
                let action = updateStatus(status);
                store.dispatch(action);

                let {characteristics} = store.getState();
                for (let mood in characteristics) {
                    if (characteristics.hasOwnProperty(mood)) {
                        setDecreaseMood(mood, store, setCookie);
                    }
                }
            })
    }, false);

    document.querySelector('.feed').addEventListener('click', () => {
        setIncreaseMood('fullness', store, setCookie);
    }, false);

    var btnSleep = document.querySelector('.sleep');
    btnSleep.addEventListener('click', () => {
        if (btnSleep.getAttribute('value') === 'Спать') {
            setIncreaseMood('energy', store, setCookie);
            sleep();
            btnSleep.setAttribute('value', 'Разбудить');
        } else {
            setDecreaseMood('energy', store, setCookie);
            wakeUp();
            btnSleep.setAttribute('value', 'Спать');
        }
    }, false);

    document.querySelector('.speak').addEventListener('click', () => {
        listen();
    }, false);
};
