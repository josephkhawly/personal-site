/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function hook(str, args) {

    var url;
    if (str[0] == '~') {
        eval(str.slice(1, str.length));
        return true;
    }

    //check for a subreddit or reddit user
    if (str.slice(0, 3) === '/r/' || str.slice(0, 3) === '/u/') {
        url = 'https://www.reddit.com' + str;
    }

    if (hookCommands.indexOf(str) > -1 || fileFunctions.indexOf(str) > -1) {
        //call it as a function
        //args are an array
        window[str](args.join(' '));
        return true;
    }

    //and now check for bookmarks
    Object.keys(b).forEach(function (key) {
        if (b[key][str]) url = b[key][str];
    });

    const modifier = url.substring(url.length - 3);

    if (modifier === '-t') { // Open in new tab
        url = url.slice(0, url.length - 3); //remove " -t"
        window.open(url, '_blank');
        return true;
    } else {
        loadURL(url);
        return true;
    }

}