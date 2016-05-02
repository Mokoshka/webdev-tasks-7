'use strict';

var bodyParts;
var blinking;

const setBodyParts = () => {
    bodyParts = {
        img: {obj: Snap('#mokona'), coords: Snap('#mokona').getBBox()},
        body: {obj: Snap('#body'), coords: Snap('#body').getBBox()},
        torso: {obj: Snap('#torso'), coords: Snap('#torso').getBBox()},
        leftLeg: {obj: Snap('#left_leg'), coords: Snap('#left_leg').getBBox()},
        rightLeg: {obj: Snap('#right_leg'), coords: Snap('#right_leg').getBBox()},
        rightEar: {obj: Snap('#right_ear'), coords: Snap('#right_ear').getBBox()},
        leftEar: {obj: Snap('#left_ear'), coords: Snap('#left_ear').getBBox()},
        crystal: {obj: Snap('#crystal'), coords: Snap('#crystal').getBBox()},
        closeEyes: {obj: Snap('#normal_eyes'), coords: Snap('#normal_eyes').getBBox()},
        openEyes: {obj: Snap('#open_eyes'), coords: Snap('#open_eyes').getBBox()},
        deathEyes: {obj: Snap('#death_eyes'), coords: Snap('#death_eyes').getBBox()},
        sadEyes: {obj: Snap('#sad_eyes'), coords: Snap('#sad_eyes').getBBox()},
        sleepEyes: {obj: Snap('#sleep_eyes'), coords: Snap('#sleep_eyes').getBBox()},
        leftEyelid: {obj: Snap('#left_eyelid'), coords: Snap('#left_eyelid').getBBox()},
        rightEyelid: {obj: Snap('#right_eyelid'), coords: Snap('#right_eyelid').getBBox()},
        cheeks: {obj: Snap('#cheeks'), coords: Snap('#cheeks').getBBox()},
        normalMouth: {obj: Snap('#normal_mouth'), coords: Snap('#normal_mouth').getBBox()},
        eatMouth: {obj: Snap('#eat_mouth'), coords: Snap('#eat_mouth').getBBox()},
        eatLips: {obj: Snap('#eat_lips'), coords: Snap('#eat_lips').getBBox()},
        eatCheek: {obj: Snap('#eat_cheek'), coords: Snap('#eat_cheek').getBBox()},
        normalLips: {obj: Snap('#normal_lips'), coords: Snap('#normal_lips').getBBox()},
        sadLips: {obj: Snap('#sad_lips'), coords: Snap('#sad_lips').getBBox()},
        leftHand: {obj: Snap('#left_hand'), coords: Snap('#left_hand').getBBox()},
        rightHand: {obj: Snap('#right_hand'), coords: Snap('#right_hand').getBBox()}
    };
};

export const setImg = (file) => {
    var svgContainer = Snap('#mokona_svg');
    Snap.load(file, (loadedFragment) => {
        svgContainer.append(loadedFragment.select('#mokona'));
        setBodyParts();
    })
};

function openLids() {
    bodyParts.leftEyelid.obj.animate({transform: `s1, ${bodyParts.leftEyelid.coords.x}, ${bodyParts.leftEyelid.coords.y} t0,0`}, 200);
    bodyParts.leftEyelid.obj.animate({ry: '3'}, 200);
    bodyParts.rightEyelid.obj.animate({transform: `s1, ${bodyParts.rightEyelid.coords.cx}, ${bodyParts.rightEyelid.coords.y} t0,0`}, 200);
    bodyParts.rightEyelid.obj.animate({ry: '2'}, 200);
}

function closeLids() {
    bodyParts.leftEyelid.obj.animate({transform: `s2, ${bodyParts.leftEyelid.coords.x}, ${bodyParts.leftEyelid.coords.y} t-10,0`}, 100);
    bodyParts.leftEyelid.obj.animate({ry: '11'}, 100);
    bodyParts.rightEyelid.obj.animate({transform: `s2, ${bodyParts.rightEyelid.coords.cx}, ${bodyParts.rightEyelid.coords.y} t4,2`}, 100);
    bodyParts.rightEyelid.obj.animate({ry: '8'}, 100, openLids);
}

function closeEyes() {
    clearInterval(blinking);
    bodyParts.openEyes.obj.attr({opacity: 0});
    bodyParts.deathEyes.obj.attr({opacity: 0});
    bodyParts.closeEyes.obj.attr({opacity: 1});
    bodyParts.sadEyes.obj.attr({opacity: 0});
}

function openEyes() {
    blinking = setInterval(closeLids, 3000);
    bodyParts.openEyes.obj.attr({opacity: 1});
    bodyParts.deathEyes.obj.attr({opacity: 0});
    bodyParts.closeEyes.obj.attr({opacity: 0});
    bodyParts.sadEyes.obj.attr({opacity: 0});
}

function deathEyes() {
    clearInterval(blinking);
    bodyParts.openEyes.obj.attr({opacity: 0});
    bodyParts.deathEyes.obj.attr({opacity: 1});
    bodyParts.closeEyes.obj.attr({opacity: 0});
    bodyParts.sadEyes.obj.attr({opacity: 0});
}

function sadEyes() {
    clearInterval(blinking);
    bodyParts.openEyes.obj.attr({opacity: 0});
    bodyParts.deathEyes.obj.attr({opacity: 0});
    bodyParts.closeEyes.obj.attr({opacity: 0});
    bodyParts.sadEyes.obj.attr({opacity: 1});
}

function sadLips() {
    closeMouth();
    bodyParts.sadLips.obj.attr({opacity: 1});
    bodyParts.normalLips.obj.attr({opacity: 0});
    bodyParts.eatMouth.obj.attr({opacity: 0});
}

function normalLips() {
    bodyParts.sadLips.obj.attr({opacity: 0});
    bodyParts.normalLips.obj.attr({opacity: 1});
    bodyParts.eatMouth.obj.attr({opacity: 0});
}

function eatMouth() {
    closeMouth();
    bodyParts.sadLips.obj.attr({opacity: 0});
    bodyParts.normalLips.obj.attr({opacity: 0});
    bodyParts.eatMouth.obj.attr({opacity: 1});
}

function closeMouth(callback = () => {}) {
    bodyParts.normalMouth.obj.animate({opacity: 0}, 500, callback);
    bodyParts.normalMouth.obj.animate({transform: `s0.5, ${bodyParts.normalMouth.coords.cx}, ${bodyParts.normalMouth.coords.y}`}, 500);
}

function openMouth(callback = () => {}) {
    bodyParts.normalMouth.obj.animate({transform: `s1,${bodyParts.normalMouth.coords.cx}, ${bodyParts.normalMouth.coords.y}`}, 500);
    bodyParts.normalMouth.obj.animate({opacity: 1}, 500, callback);
}

function waveRightHand() {
    bodyParts.rightHand.obj.animate({transform: `r-25, ${bodyParts.rightHand.coords.x}, ${bodyParts.rightHand.coords.y2}`}, 1000, () => {
        bodyParts.rightHand.obj.animate({transform: `r0, ${bodyParts.rightHand.coords.x}, ${bodyParts.rightHand.coords.y2}`}, 1000, waveRightHand)
    });
}

function chew() {
    bodyParts.eatLips.obj.animate({transform: `r5, ${bodyParts.eatLips.coords.cx}, ${bodyParts.eatLips.coords.y}`}, 400, () => {
        bodyParts.eatLips.obj.animate({transform: `r-5, ${bodyParts.eatLips.coords.cx}, ${bodyParts.eatLips.coords.y}`}, 400, chew);
    });
    bodyParts.eatCheek.obj.animate({transform: `r3, ${bodyParts.eatCheek.coords.x2}, ${bodyParts.eatCheek.coords.cy}`}, 400, () => {
        bodyParts.eatCheek.obj.animate({transform: `r0, ${bodyParts.eatCheek.coords.x2}, ${bodyParts.eatCheek.coords.cy}`}, 400)
    });
    bodyParts.leftEar.obj.animate({transform: `r5, ${bodyParts.leftEar.coords.x2}, ${bodyParts.leftEar.coords.y}`}, 400, () => {
        bodyParts.leftEar.obj.animate({transform: `r0, ${bodyParts.leftEar.coords.x2}, ${bodyParts.leftEar.coords.y}`}, 400)
    });
    bodyParts.rightEar.obj.animate({transform: `r-5, ${bodyParts.rightEar.coords.x}, ${bodyParts.rightEar.coords.y} t-4,0`}, 400, () => {
        bodyParts.rightEar.obj.animate({transform: `r0, ${bodyParts.rightEar.coords.x}, ${bodyParts.rightEar.coords.y} t0,0`}, 400);
    });
}

function jump(count = 1) {
    let currentCount = 1;

    function action() {
        bodyParts.leftLeg.obj.animate({transform: `r-15, ${bodyParts.leftLeg.coords.x2}, ${bodyParts.leftLeg.coords.y}, t5,-20`}, 500);
        bodyParts.rightLeg.obj.animate({transform: `r20, ${bodyParts.rightLeg.coords.x}, ${bodyParts.rightLeg.coords.y}, t-10,-20`}, 500);
        bodyParts.body.obj.animate({transform: 't0, -20'}, 500, () => {
            if (currentCount < count) {
                bodyParts.body.obj.animate({transform: 't0, 0'}, 500, action);
            } else {
                bodyParts.body.obj.animate({transform: 't0, 0'}, 500);
            }
            currentCount += 1;
            bodyParts.leftLeg.obj.animate({transform: `r0, ${bodyParts.leftLeg.coords.x2}, ${bodyParts.leftLeg.coords.y}, t0,0`}, 500);
            bodyParts.rightLeg.obj.animate({transform: `r0, ${bodyParts.rightLeg.coords.x}, ${bodyParts.rightLeg.coords.y}, t0,0`}, 500);
        });
    }
    action();
}

export const reanimate = () => {
    stopAllAnimate();
    closeEyes();
    openMouth();
    normalLips();
    bodyParts.img.obj.animate({transform: `r0, ${bodyParts.img.coords.cx}, ${bodyParts.img.coords.y2}`}, 500, mina.backout, () => {
        waveRightHand();
    });
};

export const stopAllAnimate = () => {
    for (let part in bodyParts) {
        if (bodyParts.hasOwnProperty(part)) {
            bodyParts[part].obj.stop();
        }
    }
};

export const live = () => {
    closeEyes();
    openMouth();
    normalLips();
    waveRightHand();
};

export const sleep = () => {
    stopAllAnimate();
    closeEyes();

    const dream = () => {
        bodyParts.body.obj.animate({transform: `t0,-4 r15,${bodyParts.body.coords.cx}, ${bodyParts.body.coords.y2}`}, 2000, () => {
            bodyParts.body.obj.animate({transform: `t0,0 r15,${bodyParts.body.coords.cx}, ${bodyParts.body.coords.y2}`}, 2000, dream);
        });
    };

    bodyParts.body.obj.animate({transform: `r15,${bodyParts.body.coords.cx}, ${bodyParts.body.coords.y2}`}, 1000, dream);
    closeMouth();

    bodyParts.leftLeg.obj.animate({transform: 't10,-3'}, 1000);
    bodyParts.rightHand.obj.animate({transform: `r45, ${bodyParts.rightHand.coords.x},${bodyParts.rightHand.coords.y}`}, 1000);
    bodyParts.leftHand.obj.animate({transform: `r-30, ${bodyParts.leftHand.coords.cx}, ${bodyParts.leftHand.coords.y}`}, 1000);

    bodyParts.leftEar.obj.animate({transform: `r-10, ${bodyParts.leftEar.coords.x2}, ${bodyParts.leftEar.coords.y} t-5,0`}, 1000);
    bodyParts.rightEar.obj.animate({transform: `r20, ${bodyParts.rightEar.coords.x}, ${bodyParts.rightEar.coords.y}`}, 1000);
};

export const wakeUp = (callback = () => {}) => {
    stopAllAnimate();

    bodyParts.body.obj.animate({transform: `r0,${bodyParts.body.coords.cx}, ${bodyParts.body.coords.y2}`}, 1000, () => {
        openMouth(callback);
    });
    bodyParts.leftLeg.obj.animate({transform: 't0,0'}, 1000);
    bodyParts.rightHand.obj.animate({transform: `r0, ${bodyParts.rightHand.coords.x}, ${bodyParts.rightHand.coords.y}`}, 1000);
    bodyParts.leftHand.obj.animate({transform: `r0, ${bodyParts.leftHand.coords.cx}, ${bodyParts.leftHand.coords.y}`}, 1000);
    bodyParts.leftEar.obj.animate({transform: `r0, ${bodyParts.leftEar.coords.x2}, ${bodyParts.leftEar.coords.y} t0,0`}, 1000);
    bodyParts.rightEar.obj.animate({transform: `r0, ${bodyParts.rightEar.coords.x}, ${bodyParts.rightEar.coords.y}`}, 1000);
};

export const listen = () => {
    stopAllAnimate();
    openEyes();
};

export const stopListen = (callback = waveRightHand) => {
    closeEyes();
    callback();
};

export const death = () => {
    stopAllAnimate();
    for (let part in bodyParts) {
        if (bodyParts.hasOwnProperty(part)) {
            bodyParts[part].obj.transform('t0,0');
        }
    }
    bodyParts.img.obj.animate({transform: `r-90, ${bodyParts.img.coords.cx}, ${bodyParts.img.coords.y2}`}, 1000, mina.elastic);
    deathEyes();
    sadLips();
};

export const eat = () => {
    stopAllAnimate();
    eatMouth();
    chew();
};

export const stopEat = (callback = waveRightHand) => {
    stopAllAnimate();
    openMouth();
    normalLips();
    callback();
};

export const happy = () => {
    jump(3);
};
