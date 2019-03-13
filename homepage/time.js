function startTime() {
    var today = new Date();
    var h = today.getHours();
    //america
    if (h >= 13) {
        h -= 12;
    } else if (h < 1) {
        h += 12;
    }
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
        h + ':' + m + ':' + s;
    setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) i = '0' + i;
    // add zero in front of numbers < 10
    return i;
}

function startDate() {
    const monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
    ];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date();
    const day = date.getDate();
    const weekday = date.getDay();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    document.getElementById('date').innerHTML = days[weekday] + ', ' + monthNames[monthIndex] + ' ' + day + ', ' + year;
}

startTime();
startDate();