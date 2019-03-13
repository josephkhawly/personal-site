/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//initializing commands
$(document).ready(function () {
    // Disabled until fixed
    // weather();
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
    let json_url = 'http://api.openweathermap.org/data/2.5/weather?q=Morningside+Heights,ny&appid=6e131a2916d5d45d8367b72a4675be0a';
    let city;
    let temp_curr;
    let temp_low;
    let temp_high;
    let description;
    let weatherCode;
    let humidity;

    $.when(
        $.getJSON(json_url)
    ).done(function (json_obj) {
        city = json_obj['name'];
        temp_curr = k_to_f(json_obj['main']['temp']);
        temp_low = k_to_f(json_obj['main']['temp_min']);
        temp_high = k_to_f(json_obj['main']['temp_max']);
        description = json_obj.weather[0].description;
        weatherCode = Number(json_obj['weather'][0]['id']);
        humidity = Number(json_obj['main']['humidity']);
        let disgusting = (weatherCode > 500 &&
            weatherCode < 800 ||
            Number(temp_low) < 30 ||
            Number(temp_high) > 95 ||
            humidity > 75);
        description = description.charAt(0).toUpperCase() + description.slice(1);
        let weatherString = 'It\'s ' + temp_curr + '&deg; out. ' + description + '. ';
        disgusting ? weatherString += 'Disgusting.' : weatherString += 'Not bad.';
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

    return h + ':' + m + ':' + s;
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