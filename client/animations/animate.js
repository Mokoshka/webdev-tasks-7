'use strict';

const bodyParts = {
    img: Snap('#mokona'),
    body: Snap('#body'),
    torso: Snap('#torso'),
    leftLeg: Snap('#left_leg'),
    rightLeg: Snap('#right_leg'),
    rightEar: Snap('#right_ear'),
    leftEar: Snap('#left_ear'),
    crystal: Snap('#crystal'),
    closeEyes: Snap('#close_eyes'),
    openEyes: Snap('#open_eyes'),
    leftEyelid: Snap('#left_eyelid'),
    rightEyelid: Snap('#right_eyelid'),
    leftCheek: Snap('#left_cheek'),
    rightCheek: Snap('#right_cheek'),
    mouth: Snap('#mouth'),
    lips: Snap('#lips'),
    leftHand: Snap('#left_hand'),
    rightHand: Snap('#right_hand')
};


export const animate = () => {
    //bodyParts.img.stop();

    function up() {
        bodyParts.rightHand.animate({transform: 'r-25,173,132'}, 1000, () => {
            bodyParts.rightHand.animate({transform: 'r0,173,132'}, 1000, up)
        });
    }
    up();
};

export const sleep = () => {
    bodyParts.rightHand.stop();

    const dream = () => {
        bodyParts.body.animate({transform: 't0,-4 r15,115,200'}, 2000, () => {
            bodyParts.body.animate({transform: 't0,0 r15,115,200'}, 2000, dream);
        });
    };
    bodyParts.body.animate({transform: 'r15,115,200'}, 1000, dream);

    bodyParts.leftLeg.animate({transform: 't10,0'}, 1000);
    bodyParts.rightHand.animate({transform: 'r45, 170,112'}, 1000);
    bodyParts.leftHand.animate({transform: 'r-30,64, 140'}, 1000);
    bodyParts.mouth.animate({opacity: 0}, 500);
    bodyParts.mouth.animate({transform: 's0.5,133,120'}, 500);
    bodyParts.leftEar.animate({transform: 'r-30,115,90'}, 1000);
    bodyParts.rightEar.animate({transform: 'r30,100,100'}, 1000);
};

export const wakeUp = () => {
    bodyParts.body.stop();

    bodyParts.body.animate({transform: 'r0,115,200'}, 1000, () => {
        bodyParts.mouth.animate({transform: 's1,133,120'}, 500);
        bodyParts.mouth.animate({opacity: 1}, 500, animate);
    });
    bodyParts.leftLeg.animate({transform: 't0,0'}, 1000);
    bodyParts.rightHand.animate({transform: 'r0, 170,112'}, 1000);
    bodyParts.leftHand.animate({transform: 'r0,64, 140'}, 1000);
    bodyParts.leftEar.animate({transform: 'r0,115,90'}, 1000);
    bodyParts.rightEar.animate({transform: 'r0,100,100'}, 1000);
};

export const listen = () => {
    bodyParts.closeEyes.attr({opacity: '0'});
    bodyParts.openEyes.attr({opacity: '1'});
    //bodyParts.rightEyelid.attr({height: '163'}); //Она будет моргать, честно
    //bodyParts.leftEyelid.attr({height: '163'});
};

export const stopListen = () => {
    bodyParts.closeEyes.attr({opacity: '1'});
    bodyParts.openEyes.attr({opacity: '0'});
};

export const death = () => {
    bodyParts.img.animate({transform: 'r-90, 100, 200'}, 1000, mina.elastic);
};

export const eat = () => {

};

export const happy = () => {

};
