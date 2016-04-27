'use strict';

const initialState = {
    characteristics: {}
};

exports.hrunoApp = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'UPDATE_STATUS':
            return {
                characteristics: action.characteristics
            };

        case 'CHANGE_INDICATE':
            let newState = Object.assign({}, state);
            newState.characteristics[action.name] = action.value;

            return newState;

        default:
            return state;
    }
};
