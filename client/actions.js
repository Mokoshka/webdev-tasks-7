'use strict';

export const updateStatus = (characteristics) => {
    return {
        type: 'UPDATE_STATUS',
        characteristics
    }
};

export const changeIndicate = (name, value) => {
    return {
        type: 'CHANGE_INDICATE',
        name,
        value
    }
};
