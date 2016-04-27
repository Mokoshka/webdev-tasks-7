'use strict';

export const update = (path) => {
    return new Promise((resolve, reject) => {
        fetch(path)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json());
                }

                reject(res.status);
            })
    })
};
