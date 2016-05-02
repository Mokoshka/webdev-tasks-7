'use strict';

export const setPageVisibility = (store, cbIfHidden, cbIfNotHidden) => {
    var hidden = null;
    var visibilityState = null;
    var visibilityChange = null;

    if ('hidden' in document) {
        hidden = 'hidden';
        visibilityState = 'visibilityState';
        visibilityChange = 'visibilitychange';
    } else if ('mozHidden' in document) {
        hidden = 'mozHidden';
        visibilityState = 'mozVisibilityState';
        visibilityChange = 'mozvisibilitychange';
    } else if ('webkitHidden' in document) {
        hidden = 'webkitHidden';
        visibilityState = 'webkitVisibilityState';
        visibilityChange = 'webkitvisibilitychange';
    }

    document.addEventListener(visibilityChange, () => {
        if (document[hidden]) {
            cbIfHidden(store);
        } else {
            cbIfNotHidden(store);
        }
    });

    return true;
};
