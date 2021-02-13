/* eslint-disable no-unused-expressions */
import React from 'react';
import moment from 'moment';

const Moment = ({ timePosted, type, creatorUsername }) => {
    const now = moment(); // .format('MM/DD/YYYY H:M');
    const then = moment(timePosted);
    const yearsDiff = Math.floor(now.diff(then, 'years', true));
    const monthsDiff = Math.floor(now.diff(then, 'months', true));
    const weeksDiff = Math.floor(now.diff(then, 'weeks', true));
    const daysDiff = Math.floor(now.diff(then, 'days', true));
    const hoursDiff = Math.floor(now.diff(then, 'hours', true));
    const minutesDiff = Math.floor(now.diff(then, 'minutes', true));

    const submitString = 'submitted ';
    const { creator } = creatorUsername;
    let timeSince = '';
    const getTimeOnly = type === 'time';

    if (yearsDiff >= 1) {
        if (yearsDiff > 1)
            getTimeOnly
                ? (timeSince = `${yearsDiff} years ago`)
                : (timeSince = `${
                      submitString + yearsDiff
                  }years ago by ${creator}`);
        else if (yearsDiff === 1)
            getTimeOnly
                ? (timeSince = `${yearsDiff} year ago`)
                : (timeSince = `${
                      submitString + yearsDiff
                  } year ago by ${creator}`);
        return timeSince;
    }
    if (monthsDiff >= 1) {
        if (monthsDiff > 1)
            getTimeOnly
                ? (timeSince = `${monthsDiff} months ago`)
                : (timeSince = `${
                      submitString + monthsDiff
                  } months ago by ${creator}`);
        else if (monthsDiff === 1)
            getTimeOnly
                ? (timeSince = `${monthsDiff} month ago`)
                : (timeSince = `${
                      submitString + monthsDiff
                  } month ago by${creator}`);
        return timeSince;
    }
    if (weeksDiff >= 1) {
        // console.log('timesince' + timeSince)
        if (weeksDiff > 1)
            getTimeOnly
                ? (timeSince = `${weeksDiff} weeks ago`)
                : (timeSince = `${
                      submitString + weeksDiff
                  } weeks ago by ${creator}`);
        else if (weeksDiff === 1)
            getTimeOnly
                ? (timeSince = `${weeksDiff} week ago`)
                : (timeSince = `${
                      submitString + weeksDiff
                  } week ago by ${creator}`);
        return timeSince;
    }
    if (daysDiff >= 1) {
        if (daysDiff > 1)
            getTimeOnly
                ? (timeSince = `${daysDiff} days ago`)
                : (timeSince = `${
                      submitString + daysDiff
                  } days ago by ${creator}`);
        else if (daysDiff === 1)
            getTimeOnly
                ? (timeSince = `${daysDiff} day ago`)
                : (timeSince = `${
                      submitString + daysDiff
                  } day ago by ${creator}`);
        return timeSince;
    }
    if (hoursDiff >= 1) {
        if (hoursDiff > 1)
            getTimeOnly
                ? (timeSince = `${hoursDiff} hours ago`)
                : (timeSince = `${
                      submitString + hoursDiff
                  } hours ago by ${creator}`);
        else if (hoursDiff === 1)
            getTimeOnly
                ? (timeSince = `${hoursDiff} hour ago`)
                : (timeSince = `${
                      submitString + hoursDiff
                  } hour ago by ${creator}`);
        return timeSince;
    }
    if (minutesDiff >= 1) {
        if (minutesDiff > 1)
            getTimeOnly
                ? (timeSince = `${minutesDiff}minutes ago`)
                : (timeSince = `${
                      submitString + minutesDiff
                  } minutes ago by ${creator}`);
        else if (minutesDiff === 1)
            getTimeOnly
                ? (timeSince = `${minutesDiff}minute ago`)
                : (timeSince = `${
                      submitString + minutesDiff
                  } minute ago by ${creator}`);
        return timeSince;
    }
    if (minutesDiff < 1) {
        timeSince = 'now';
        return timeSince;
    }
    return <p>TIMEERROR</p>;
};
export default Moment;
