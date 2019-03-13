// Place all bookmarks here
// Format is ['<command>', '<URL>']
const hookCommands = [
    'chan',
    'date',
    'dice',
    'reddit',
    'time',
    'weather',
];

const bookmarks = [
    ['inbox', 'https://inbox.google.com/'],
    ['cal', 'https://calendar.google.com/'],
    ['drive', 'https://drive.google.com/'],
    ['amazon', 'https://amazon.com/'],
    ['amazon-jp', 'https://amazon.co.jp/'],
    ['trello', 'https://trello.com/'],
];

const media = [
    ['yt', 'https://youtube.com/feed/subscriptions'],
    ['netflix', 'https://netflix.com/'],
    ['plex', 'https://app.plex.tv'],
    ['music', 'https://play.google.com/music/listen?hl=en&u=0#/wmp'],
];

const tech = [
    ['github', 'http://github.com/'],
    ['speedtest', 'http://speedtest.net/'],
    ['leetcode', 'https://leetcode.com/'],
    ['mdn', 'https://developer.mozilla.org/en-US/'],
];

const social = [
    ['twitter', 'https://twitter.com/'],
    ['linkedin', 'https://linkedin.com/in/josephkhawly'],
    ['groupme', 'https://app.groupme.com/'],
];

// new model for adding bookmarks
const b = {
    'general': {
        'inbox': 'https://inbox.google.com/',
        'cal': 'https://calendar.google.com/',
        'drive': 'https://drive.google.com/',
        'amazon': 'https://amazon.com/',
        'amazon-jp': 'https://amazon.co.jp/',
        'trello': 'https://trello.com/',
    },

    'media': {
        'yt': 'https://youtube.com/feed/subscriptions',
        'netflix': 'https://netflix.com/',
        'plex': 'https://app.plex.tv',
    },

    'tech': {
        'github': 'http://github.com/',
        'speedtest': 'http://speedtest.net/',
        'leetcode': 'https://leetcode.com/',
        'mdn': 'https://developer.mozilla.org/en-US/',
    },

    'social': {
        'twitter': 'https://twitter.com/',
        'linkedin': 'https://linkedin.com/in/josephkhawly',
    }
};