'use strict';

import React from 'react';
import Characteristic from './characteristic.js';

export default ({store}) => {
    const {characteristics} = store.getState();
    const names = [];

    for (var name in characteristics) {
        if (characteristics.hasOwnProperty(name))
            names.push(name);
    }

    return (
        <div className="statusbar">
            {names.map(name => (
                <Characteristic store={store} name={name}
                    value={characteristics[name]}
                    key={name} />
            ))}
        </div>
    );
};
