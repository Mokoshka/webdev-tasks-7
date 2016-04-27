'use strict';

import React from 'react';

function template(name, value, level) {
    return (
        <div className={name}>
            <p className="statusbar__name">{name}:</p>
            <div className={`statusbar__indicate statusbar__indicate_${level}`}>
                {value}
            </div>
        </div>
    )
}

export default ({store, name, value}) => {
    if (value > 75) {
        return template(name, value, 'high')
    }

    if (value > 50) {
        return template(name, value, 'normal')
    }

    if (value > 25) {
        return template(name, value, 'low')
    }

    return template(name, value, 'critical')
}
