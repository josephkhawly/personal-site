/* eslint-disable no-undef */
function startTime() {
    document.getElementById('clock').innerHTML = timeString();
    setTimeout(startTime, 500);
}

function startDate() {
    document.getElementById('date').innerHTML = dateString();
}

startTime();
startDate();