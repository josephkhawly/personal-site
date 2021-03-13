/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
$('#terminal').click(function () {
    if (!editing) $('#input').focus();
});

$(document).ready(function () {
    init();
});

const getName = () => localStorage.getItem('userName') || 'guest'
const getMachine = () => localStorage.getItem('userMachine') || 'start'

// name@machine:$
const getPromptString = () => `${getName()}@${getMachine()}:$&nbsp;`
const prompt = () => document.getElementById('prompt').innerHTML = getPromptString()


function setName(name) {
    if (name == '') {
        print('usage: name [newname]');
        return;
    }
    localStorage.setItem('userName', name);
    prompt()
    print(`Set userName to ${name}.`)
}


function setMachine(str) {
    if (str == '') {
        print('usage: machine [newname]');
        return;
    }
    localStorage.setItem('userMachine', str);
    prompt()
    print(`Set userMachine to ${str}.`)
}

function init() {
    input = document.getElementById('input');
    input.addEventListener('keydown', function (a) {
        var key = a.keyCode;
        if (key == 13) {
            //enter
            a.preventDefault();
            handle(input.value);
            inputIndex = 0;
        } else if (key === 38) {
            //up arrow
            document.getElementById('input').innerHTML = lastInputs[inputIndex];

            inputIndex < lastInputs.length - 1 ? inputIndex++ :
                true;
        } else if (key === 40) {
            //down arrow

            inputIndex > 0 ? inputIndex-- :
                true;
            if (inputIndex > 0) {
                inputIndex--;
                document.getElementById('input').innerHTML = lastInputs[inputIndex];
            } else {
                document.getElementById('input').innerHTML = '';
            }
        } else if (key === 9) {
            //tab
            if (!editing) {
                a.preventDefault();
                autocomplete(document.getElementById('input').innerHTML);
            }
        }
    });

    prompt()
    $('#input').focus()
}

function handle(text) {
    var input = $('#input').html();
    $('#input').html('');
    appendLastInput(input);
    addInput(input);

    if (input == '') return;

    //intercepting the function here to search
    if (searchString(input)) {
        print('Searching for ' + input.slice(0, input.length - 3) + '...');
        return;
    }

    var firstWord = input;
    firstWord = firstWord.split(' ')[0];
    var args = input;
    args = args.split(' ');
    args.shift();

    if (terminalFunctions.indexOf(firstWord) > -1) {
        //call it as a function
        window[firstWord](args);
    } else {
        //outside programs just need to have this function
        if (hook(input.split(' ')[0], args) != true) {
            print('Command ' + '\'' + input + '\' not found. Type \'ls\' for all commands.');
        }
    }

    document.getElementById('input').scrollIntoView();
}

function appendLastInput(text) {
    var inputBlobPre = '<p class="prompt">' + getPromptString() + '</p><pre class="input-old">';
    var inputBlobSuf = '</pre></br>';
    $(inputBlobPre + text + inputBlobSuf).insertBefore('#prompt');
}

function print(text) {
    //you can use multiple args with commas if you're lazy
    var finalText = '';
    var args = arguments;

    for (var a in args) {
        finalText += args[a] + ' ';
    }

    var pre = '<pre class="output">';
    var suf = '</pre>';

    $(pre + finalText + suf).insertBefore('#prompt');
}

//for fancy rendering
function fancyRender(text, color, size) {
    var pre = '<pre class="output" style="';
    if (color == undefined) {
        color = 'inherit';
    }
    if (size == undefined) {
        size = '11';
    }
    pre += 'color:' + color + '; ';
    pre += 'font-size:' + size + 'pt;"';

    pre += '>';
    var suf = '</pre>';
    $(pre + text + suf).insertBefore('#prompt');
}

//====================  TERMINAL FUNCTIONS  ========================
const terminalFunctions = [
    'about',
    'clear',
    'echo',
    'help',
    'history',
    'ls',
    'name',
    'machine',
    're',
    'render',
    'search',
    'local',
];

function local(args) {
    if (args.length === 0) {
        print('usage: local [port] [flag]');
        return;
    }

    const port = args[0]
    let url = `http://localhost:${port}000`
    if (args.length === 1) {
        print(url);
        window.location.href = url
    }

    if (args.length == 2) {
        const flag = args[1]
        if (flag === '-a') url += '/admin'
        else if (flag === '-p') url += '/api'

        window.location.href = url
    }
}

function clear(input) {
    var data =
        '<p id="prompt" class="prompt">' +
        getName() +
        '@' +
        getMachine() +
        ':$&nbsp;</p><pre id="input" contenteditable="true" autofocus="true" spellcheck="false"></pre>';
    document.getElementById('terminal').innerHTML = data;
    init();
}

function about(input) {
    print(
        'Features include tab autocompletion, a file editor, custom web searches and history, searchable with arrow keys.'
    );
}

function history(input) {
    //print in descending order, without printing the history command
    for (let h = lastInputs.length - 1; h >= 0; h--) print(lastInputs[h]);
}


function listCommands(arr) {
    if (typeof arr != 'undefined' && arr.length > 0) print(`> ${arr.join(' > ')}`);
}

function help() {
    //add some kind of help for various functions (like rendering)
    let renderColor = '#00FF9C';
    fancyRender('terminal', renderColor);
    listCommands(terminalFunctions);

    // show bookmark commands
    var items = Object.keys(b);
    for (let i of items) {
        fancyRender(i, renderColor);
        let k = Object.keys(b[i]);
        print(`> ${k.join(' > ')}`);
    }

    // print("\n");

    fancyRender('i/o', renderColor);
    listCommands(fileFunctions);

    var printStr = '';
    if (!$.isEmptyObject(files)) {
        fancyRender('files', renderColor);
        for (var prop in files)
            printStr += '> ' + prop + ' ';

        print(printStr);
    }
}

function ls(input) {
    help()
}

function echo(args) {
    if (args.length == 0) {
        print('usage: echo [text]');
        return;
    }
    var printStr = args.join(' ');
    //greentexting
    if (printStr.indexOf('&gt;') === 0) {
        printStr = cssColor(printStr, '#789922');
    }
    print(printStr);
}

function re() {
    location.reload();
}

function render(args) {
    var usage = 'usage: render [text]; [color] [size]';
    if (args.length === 0) {
        print(usage);
        return;
    }
    args = args.join(' ').split('; ');
    if (args.length === 1) {
        print(usage);
    }
    var cssVars = args[1].split(' ');
    if (args.length != 2) {
        print(usage);
        return;
    }
    fancyRender(args[0], cssVars[0], cssVars[1]);
}

function search() {
    print('Usage: [query] -x');
    print('x is a switch for: ');
    print('a:   amazon');
    print('m:   wolfram alpha');
    print('w:   wikipedia');
    print('y:   youtube');
}

//====================  HISTORY  ===================================
//keep duplicates from being added, change "" to &nbsp;
var lastInputs = [];
var inputIndex = 0;

if (localStorage.getItem('history')) {
    lastInputs = JSON.parse(localStorage.getItem('history'));
}

//adds to the beginning of the array
function addInput(str) {
    if (str === '' || /^[ ]+$/.test(str)) return;

    if (lastInputs[0] === str) return;

    if (lastInputs.length > 0) {
        if (lastInputs[lastInputs.length - 1] != str) lastInputs.unshift(str);
    } else lastInputs.unshift(str);
    localStorage.setItem('history', JSON.stringify(lastInputs));
}

function searchAndComplete(array, string) {
    if (typeof array != 'undefined' && array.length > 0) {
        for (const h of array) {
            if (h.indexOf(string) === 0) {
                document.getElementById('input').innerHTML = h;
                return;
            }
        }
    }
}

//====================  TAB AUTO-COMPLETION ========================
function autocomplete(string) {
    //first search term commands, then maybe hooked commands
    searchAndComplete(terminalFunctions, string)

    //if hook commands exist
    searchAndComplete(hookCommands, string)

    if (typeof bookmarks != 'undefined' && bookmarks.length > 0) {
        for (let i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i][0].indexOf(string) === 0) {
                document.getElementById('input').innerHTML = bookmarks[i][0];
                return;
            }
        }
    }

    searchAndComplete(fileFunctions, string)

    //autocompleting based on filenames
    var tempCommand = string.split(' ')[0];
    if (fileFunctions.indexOf(tempCommand) >= 0 && string.split(' ').length > 1) {
        var beginName = string.split(' ')[1];
        Object.keys(files).forEach(key => {
            if (key.indexOf(beginName) === 0) {
                document.getElementById('input').innerHTML = tempCommand + ' ' + key;
                return;
            }
        });
    }
}

//====================  SEARCHING ==================================
function searchString(query) {
    // var original = query;
    var modifier = query.substr(query.length - 2);
    query = query.slice(0, query.length - 3); //remove " -x"
    switch (modifier) {
        case '-z':
            window.location =
                'http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=' +
                query.replace(' ', '+');
            return true;
        case '-y':
            window.location = `https://www.youtube.com/results?search_query=${query.replace(' ', '+')}`;
            return true;
        case '-w':
            window.location = `https://en.wikipedia.org/w/index.php?search=${query.replace(' ', '%20')}`;
            return true;
    }
    return false;
}

//====================  HELPER FUNCTIONS  ==========================
//returns a span with the color of a string, good for chaining with print()
function cssColor(string, colorName) {
    return '<span style=\'color:' + colorName + '\'>' + string + '</span>';
}