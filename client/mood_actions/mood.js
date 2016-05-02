'use strict';

import {changeIndicate} from '../actions.js';

var intervals = {};

export const setDecreaseMood = (mood, store, save, delay = 3000) => {
    clearInterval(intervals[mood]);

    intervals[mood] = setInterval(() => {
        let indicate = document.querySelector(`.${mood} > .statusbar__indicate`);
        let value = indicate.innerText - 1;

        if (value >= 0) {
            let action = changeIndicate(mood, value);
            store.dispatch(action);
            save(mood, value);
        }
    }, delay);
};

export const setIncreaseMood = (mood, store, save, delay = 1000) => {
    for (let interval in intervals) {
        if (intervals.hasOwnProperty(interval)) {
            clearInterval(intervals[interval]);
            if (interval !== mood) {
                setDecreaseMood(interval, store, save);
            }
        }
    }

    intervals[mood] = setInterval(() => {
        let indicate = document.querySelector(`.${mood} > .statusbar__indicate`);
        let value = indicate.innerText - 0 + 1;

        if (value <= 100) {
            let action = changeIndicate(mood, value);
            store.dispatch(action);
            save(mood, value);
        }
    }, delay);
};
