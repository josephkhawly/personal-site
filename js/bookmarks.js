/* eslint-disable no-unused-vars */
// Place all bookmarks here
// Format is ['<command>', '<URL>']
const hookCommands = [
    'date',
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
]

// new model for adding bookmarks
const b = {
    'general': {
        'inbox': 'https://inbox.google.com/',
        'cal': 'https://calendar.google.com/',
        'drive': 'https://drive.google.com/',
        'amazon': 'https://amazon.com/',
        'amazon-jp': 'https://amazon.co.jp/',
    },
    
    'media': {
        'yt': 'https://youtube.com/feed/subscriptions',
        'netflix': 'https://netflix.com/',
        'plex': 'https://app.plex.tv',
    },
    
    'tech': {
        'github': 'http://github.com/',
        'speedtest': 'http://speedtest.net/',
        'mdn': 'https://developer.mozilla.org/en-US/',
    },
    
    'work': {
        'notion': 'https://www.notion.so/',
        'jira': 'https://mwmdigital.atlassian.net/jira/projects?selectedProjectType=software',
        'bitbucket': 'https://bitbucket.org/',
    },

    'social': {
        'twitter': 'https://twitter.com/',
        'linkedin': 'https://linkedin.com/in/josephkhawly',
    },
}