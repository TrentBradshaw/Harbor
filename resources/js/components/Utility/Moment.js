import ReactDOM from 'react-dom';

import React, { useState, useEffect } from 'react';
import moment, { months } from 'moment';
    
    const Moment = (props) => {

        //fix this absolute travesty
        var now = moment() //.format('MM/DD/YYYY H:M');
        var then = moment(props.timePosted)
        
        //console.log(props)
       // console.log(props.timePosted)
        //moment("Nov/02/1928 12:44:08") //.format('MM/DD/YYYY H:M');

       // var totalSec = now.diff(then);
       // console.log(totalSec)
        var yearsDiff = Math.floor(now.diff(then, 'years', true));
        var monthsDiff = Math.floor(now.diff(then, 'months', true));
        var weeksDiff = Math.floor(now.diff(then, 'weeks', true));
        var daysDiff = Math.floor(now.diff(then, 'days', true));
        var hoursDiff = Math.floor(now.diff(then, 'hours', true));
        var minutesDiff = Math.floor(now.diff(then, 'minutes', true));

        /*
        console.log('years' + yearsDiff)
        console.log('months' + monthsDiff)
        console.log('weeks' + weeksDiff)
        console.log('days' + daysDiff)
        console.log('hours' + hoursDiff)
        */

        var submitString = 'submitted ';
        var creator = props.creator;
        var timeSince = '';
        var getTimeOnly = (props.type == 'time')

       // console.log('timesince' + timeSince)

        if (yearsDiff >= 1){
            //console.log('timesince' + timeSince)
            if(yearsDiff > 1 )
                getTimeOnly ? timeSince = yearsDiff + " years ago" : timeSince = submitString +  yearsDiff + "years ago by " + creator;
            else if (yearsDiff == 1)
                getTimeOnly ? timeSince = yearsDiff + " year ago" : timeSince = submitString +  yearsDiff + " year ago by " + creator;
            return startOfString + timeSince;
        }
        if(monthsDiff >=1){
            //console.log('timesince' + timeSince)
            if(monthsDiff > 1 )
                getTimeOnly ? timeSince = monthsDiff + " months ago" : timeSince = submitString + monthsDiff + ' months ago by ' + creator;
            else if (monthsDiff == 1)
                getTimeOnly ? timeSince = monthsDiff + " month ago" : timeSince = submitString + monthsDiff + ' month ago by' + creator;
            return timeSince;
        }
        if(weeksDiff >=1){
           //console.log('timesince' + timeSince)
            if(weeksDiff > 1 )
                getTimeOnly ? timeSince = weeksDiff + " weeks ago" : timeSince = submitString + weeksDiff + ' weeks ago by ' + creator;
            else if (weeksDiff == 1)
                getTimeOnly ? timeSince = weeksDiff + " week ago" : timeSince = submitString + weeksDiff + " week ago by " + creator;
            return timeSince;
        }
        if(daysDiff >=1){
            if(daysDiff > 1 )
            getTimeOnly ? timeSince = daysDiff + " days ago" : timeSince = submitString + daysDiff + " days ago by " + creator;
            else if (daysDiff == 1)
            getTimeOnly ? timeSince = daysDiff + " day ago" : timeSince = submitString + daysDiff + " day ago by " + creator;
            return timeSince;
        }
        if(hoursDiff >=1){
            if(hoursDiff > 1 )
            getTimeOnly ? timeSince = hoursDiff + " hours ago" : timeSince = submitString + hoursDiff + " hours ago by " + creator
            else if (hoursDiff == 1)
            getTimeOnly ? timeSince = hoursDiff + " hour ago" : timeSince = submitString + hoursDiff + " hour ago by " + creator
            return timeSince;
        }
        if(minutesDiff >=1){
            if(minutesDiff > 1 )
            getTimeOnly ? timeSince = minutesDiff + "minutes ago" : timeSince = submitString + minutesDiff + " minutes ago by " + creator
            else if (minutesDiff == 1)
            getTimeOnly ? timeSince = minutesDiff + "minute ago" : timeSince = submitString + minutesDiff + " minute ago by " + creator
            return timeSince;
        }
        if(minutesDiff < 1){
            timeSince = "now"
            return timeSince;
        }
           
        /*
        var hours = parseInt(totalSec / 3600) % 24;
        var minutes = parseInt(totalSec / 60) % 60;
        var seconds = totalSec % 60;
        console.log(timeSince)
        console.log("minutes" + minutes)
        console.log("seconds" + seconds)
        //var hours = moment.duration((now).diff(then)).hours();
        console.log("hours" + hours);

        */
        // if minutes < 1 and hours, days, years, and months == 0 string = now

       // if minutes >= 1  and hours, days, years, and months == 0 string == x minutes
        return(
            <p>TIMEERROR</p>
        )
    }
export default Moment ;