'use strict';

var Notification = window.Notification || window.webkitNotification;

export const setNotification = () => {
    if (Notification)
        return true;
};

const messages = {
    fullness: 'Your pet is hungry! Rather, come back and feed him!',
    energy: 'Your pet is tired! Rather, come back and put him to bed!',
    mood: 'Your pet is bored! Come back to it!'
};

var title   = 'Hey';

export const sendNotification = (mood) => {
    new Notification(title, {
        body: messages[mood],
        icon: 'http://mokona.surge.sh/mokona_icon.jpg'
    });
};
