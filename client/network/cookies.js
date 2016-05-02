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

export const deleteCookie = (name) => {
    Cookie.remove(name);
};
