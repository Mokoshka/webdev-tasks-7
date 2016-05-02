'use strict';

var localStorage = window.localStorage;
var changeListener = (event) => {};

export const setStorage = (name, value) => {
    let oldValue = localStorage.getItem(name);
    localStorage.setItem(name, value);
    changeListener({
        oldValue,
        value,
        name
    });
};

export const getStorage = (name) => {
    return localStorage.getItem(name);
};

export const deleteStorage = (name) => {
    if (name) {
        localStorage.removeItem(name);
    } else {
        localStorage.clear();
    }
};

export const setChangeListener = (handler) => {
    changeListener = handler;
};

