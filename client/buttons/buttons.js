'use strict';

import {setStorage, deleteStorage} from '../network/local-storage';
import {update} from '../network/client-requests';

import {setDecreaseMood, setIncreaseMood} from '../mood_actions/mood';
import {sleep, wakeUp, listen, death, live, eat, reanimate, stopAction} from '../pig-actions';

import {updateStatus} from '../actions';
import {playDeath, setTimeoutForPlay} from '../feature/sounds';

export const changeValueOfBtn = (nameBtn, value) => {
    document.querySelector(`.menu__buttons__${nameBtn}`).setAttribute('value', value);
};

export const setButtonsActions = (store) => {
    document.querySelector('.menu__buttons__restart').addEventListener('click', () => {
        let {characteristic} = store.getState();
        for (let name in characteristic) {
            if (characteristic.hasOwnProperty(name)) {
                deleteStorage(name);
            }
        }
        update('/status')
            .then((status) => {
                let action = updateStatus(status);
                store.dispatch(action);

                let {characteristics} = store.getState();
                for (let mood in characteristics) {
                    if (characteristics.hasOwnProperty(mood)) {
                        setDecreaseMood(mood, store, setStorage);
                    }
                }
            });
        setTimeoutForPlay();
        reanimate(store);
    }, false);

    document.querySelector('.menu__buttons__feed').addEventListener('click', () => {
        changeValueOfBtn('sleep', 'Спать');
        document.querySelector('.phrases').style.border = '';
        eat(store);
    }, false);

    var btnSleep = document.querySelector('.menu__buttons__sleep');
    btnSleep.addEventListener('click', () => {
        if (btnSleep.getAttribute('value') === 'Спать') {
            document.querySelector('.phrases').style.border = '';
            sleep(store);
            changeValueOfBtn('sleep', 'Разбудить');
        } else {
            document.querySelector('.phrases').style.border = '';
            live(store);
            changeValueOfBtn('sleep', 'Спать');
        }
    }, false);

    document.querySelector('.menu__buttons__speak').addEventListener('click', () => {
        changeValueOfBtn('sleep', 'Спать');
        listen(store);
    }, false);

    document.querySelector('.menu__buttons__death').addEventListener('click', () => {
        changeValueOfBtn('sleep', 'Спать');
        document.querySelector('.phrases').style.border = '';
        playDeath();
        death(store);
    }, false);
};
