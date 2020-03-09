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

function weather() {
    //this might throw a mixed content error, but running it from a local file works
    const apiKey = '3cebe33a9c82f08978b6486c638bb249';
    const json_url = `http://api.openweathermap.org/data/2.5/weather?q=boulder&units=imperial&appid=${apiKey}`;

    $.when(
        $.getJSON(json_url)
    ).done(function (response) {
        const city = response.name;
        const { temp, temp_min, temp_max, humidity } = response.main;
        const temp_curr = temp.toFixed(0);
        const weatherCode = Number(response.weather[0].id);
        const disgusting = (weatherCode > 500 && weatherCode < 800 || temp_min < 30 || temp_max > 95 || humidity > 75);

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

const timeString = () => dayjs().format('hh:mm:ss A')

function time() {
    print(timeString());
}

const dateString = () => dayjs().format('ddd MMM DD, YYYY')

function date() {
    print(dateString());
}

function reddit(s) {
    print('Usage: /r/[subreddit] or /u/[user]');
}

function chan(s) {
    print('Usage: /[board] or /[board]/');
}