'use strict';

const Cookie = require('js-cookie');

export const setCookie = (name, value) => {
    Cookie.set(name, value, {expires: 7});
};

export const getCookie = (name) => {
    if (name) {
        return Cookie.get(name);
    }

    return Cookie.get();
};

export const deleteCookie = () => {
    let coockies = getCookie();
    for (let name in coockies) {
        if (coockies.hasOwnProperty(name)) {
            Cookie.remove(name);
        }
    }
};
