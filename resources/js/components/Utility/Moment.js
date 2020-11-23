import ReactDOM from 'react-dom';

import React, { useState, useEffect } from 'react';
import moment, { months } from 'moment';

    function Moment(){

        //fix this absolute travesty
        var now = moment() //.format('MM/DD/YYYY H:M');
        var then = moment("Nov/02/1928 12:44:08") //.format('MM/DD/YYYY H:M');

        var totalSec = now.diff(then);
        var yearsDiff = Math.floor(now.diff(then, 'years', true));
        var monthsDiff = Math.floor(now.diff(then, 'months', true));
        var weeksDiff = Math.floor(now.diff(then, 'weeks', true));
        var daysDiff = Math.floor(now.diff(then, 'days', true));
        var hoursDiff = Math.floor(now.diff(then,' hours', true));
        var minutesDiff = Math.floor(now.diff(then, 'minutes', true));
        console.log(yearsDiff)
        console.log(monthsDiff)
        console.log(weeksDiff)
        console.log(daysDiff)
        console.log(hoursDiff);
        console.log(minutesDiff)

        var timeSince;

        if (yearsDiff >= 1){
            if(yearsDiff > 1 )
                timeSince = yearsDiff + "years ago"
            else if (yearsDiff == 1)
               timeSince = yearsDiff + "year ago"
            
            return timeSince;
        }
        if(monthsDiff >=1){
            if(monthsDiff > 1 )
                timeSince = monthsDiff + "months ago"
            else if (monthsDiff == 1)
               timeSince = monthsDiff + "month ago"
            
            return timeSince;
        }
        if(weeksDiff >=1){
            if(weeksDiff > 1 )
                timeSince = weeksDiff + "weeks ago"
            else if (weeksDiff == 1)
               timeSince = weeksDiff + "week ago"
            
            return timeSince;
        }
        if(daysDiff >=1){
            if(daysDiff > 1 )
                timeSince = daysDiff + "days ago"
            else if (daysDiff == 1)
               timeSince = daysDiff + "day ago"
            
            return timeSince;
        }
        if(hoursDiff >=1){
            if(hoursDiff > 1 )
                timeSince = hoursDiff + "hours ago"
            else if (hoursDiff == 1)
               timeSince = hoursDiff + "hour ago"
            
            return timeSince;
        }
        if(minutesDiff >=1){
            if(minutesDiff > 1 )
                timeSince = minutesDiff + "minutes ago"
            else if (minutesDiff == 1)
               timeSince = minutesDiff + "minute ago"
            
            return timeSince;
        }
        if(minutesDiff < 1)
            timeSince = "now"

        var hours = parseInt(totalSec / 3600) % 24;
        var minutes = parseInt(totalSec / 60) % 60;
        var seconds = totalSec % 60;
        console.log(timeSince)
        console.log("minutes" + minutes)
        console.log("seconds" + seconds)
        //var hours = moment.duration((now).diff(then)).hours();
        console.log("hours" + hours);

        // if minutes < 1 and hours, days, years, and months == 0 string = now

       // if minutes >= 1  and hours, days, years, and months == 0 string == x minutes
        return(
            <p>yee</p>
        )
    }
export default Moment ;