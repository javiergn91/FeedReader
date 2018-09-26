const formatDate = {};

var monthToStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

formatDate.format = (d) => {
    let date = new Date(d);
    let today = new Date();

    let todayDay = today.getDate();
    let todayMonth = today.getMonth();
    let todayYear = today.getFullYear();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    //Check if date is today
    if(day == todayDay && month == todayMonth && year == todayYear) 
    {
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }   
    //Check if date is yesterday
    else if(day == (todayDay - 1) && month == todayMonth && year == todayYear) {
        return "Yesterday";
    }
    //Default displaying
    else {
        return day + " " + monthToStr[month];
    }
};

module.exports = formatDate;