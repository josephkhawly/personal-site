/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//initializing commands
$(document).ready(function () {
    weather();
});

//==================== CHALLENGE COMMANDS ==========================
function name(str) {
    setName(str);
}

function machine(str) {
    setMachine(str);
}

function k_to_f(kelvin) {
    return ((9 / 5) * (kelvin - 273) + 32).toFixed(0);
}

function weather() {
    //this might throw a mixed content error, but running it from a local file works
    const apiKey = '3cebe33a9c82f08978b6486c638bb249';
    const json_url = `http://api.openweathermap.org/data/2.5/weather?q=boulder&appid=${apiKey}`;

    $.when(
        $.getJSON(json_url)
    ).done(function (response) {
        const city = response.name;
        const temp_curr = k_to_f(response.main.temp);
        const temp_low = k_to_f(response.main.temp_min);
        const temp_high = k_to_f(response.main.temp_max);
        const weatherCode = Number(response.weather[0]['id']);
        const humidity = Number(response.main.humidity);
        const disgusting = (weatherCode > 500 && weatherCode < 800 || temp_low < 30 || temp_high > 95 || humidity > 75);

        let description = response.weather[0].description;
        description = description.charAt(0).toUpperCase() + description.slice(1);
        let weatherString = `It\'s ${temp_curr}&deg; in ${city}. ${description}. ${disgusting ? 'Disgusting.' : 'Not bad.'}`;
        print(weatherString);
    });
}

function loadURL(url) {
    print('Loading ' + url + '...');
    window.location = url;
}

function timeString() {
    let today = new Date();
    let h = today.getHours();
    //america
    if (h >= 13) h -= 12;
    else if (h < 1) h += 12;

    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    return `${h}:${m}:${s}`;
}

function time() {
    print(timeString());
}

function checkTime(i) {
    // add zero in front of numbers < 10
    return i < 10 ? i = '0' + i : i;
}

function dateString() {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    const date = new Date();
    const day = date.getDate();
    const weekday = date.getDay();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return days[weekday] + ' ' + monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function date() {
    print(dateString());
}

function reddit(s) {
    print('Usage: /r/[subreddit] or /u/[user]');
}

function chan(s) {
    print('Usage: /[board] or /[board]/');
}