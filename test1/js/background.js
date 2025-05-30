chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(async function(msg) {
        let response = new Object();
        response.action = msg.action;
        if (msg.action == 'fetch_info') {
            let {__un} = await chrome.storage.local.get('__un'),
                {__pw} = await chrome.storage.local.get('__pw'),
                {__id} = await chrome.storage.local.get('__id'),
                {__ap} = await chrome.storage.local.get('__ap'),
                {__il} = await chrome.storage.local.get('__il'),
                {__ad} = await chrome.storage.local.get('__ad'),
                {__al} = await chrome.storage.local.get('__al'),
                {__ar} = await chrome.storage.local.get('__ar'),
                {__st} = await chrome.storage.local.get('__st'),
                {__en} = await chrome.storage.local.get('__en'),
                version = await new Promise(resolve => chrome.management.getSelf(info => resolve(info.version)));
            response.data = {
                $username: __un,
                $password: __pw,
                $appid: __id,
                $active: __ap,
                $apptCenter: __il,
                $apptDate: __ad,
                $ascCenter: __al,
                $ascReverse: __ar,
                $start: __st,
                $end: __en,
                $version: version
            };
        }
        port.postMessage(response);
    });
});

chrome.runtime.onInstalled.addListener(async ({reason}) => {
    chrome.action.disable();
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        let rule = {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostEquals: 'ais.usvisa-info.com' }
                })
            ],
            actions: [new chrome.declarativeContent.ShowAction()]
        };
        let rules = [rule];
        chrome.declarativeContent.onPageChanged.addRules(rules);
    });

    if (reason === 'install') {
        chrome.tabs.create({ url: 'https://www.alertmeasap.com' });
        await chrome.storage.local.set({
            '__ab': false,
            '__ap': true,
            '__fq': 30,
            '__fqType': 'seconds'
        });
        chrome.tabs.create({ url: 'https://ais.usvisa-info.com/en-us/countries_list/niv' });
    }
});

let notificationId = null;
let notificationTabId = null;

const sendMessageIfPingSucceeds = (tabId, message, callback) => {
    chrome.tabs.sendMessage(tabId, { ping: true }, function(response) {
        if (response && response.pong) {
            chrome.tabs.sendMessage(tabId, message, callback);
        }
    });
};

chrome.notifications.onButtonClicked.addListener(function(id, buttonIndex) {
    if (id === notificationId) {
        chrome.tabs.get(notificationTabId, function(tab) {
            chrome.tabs.highlight({ tabs: tab.index }, function() {});
        });
        sendMessageIfPingSucceeds(notificationTabId, { bookNow: buttonIndex === 0 });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.notifications.create(request.options, function(id) {
        notificationId = id;
        notificationTabId = sender.tab.id;
    });
    sendResponse(true);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'log') {
        logMessage(request.message);
    }
});

function logMessage(message) {
    const timestamp = new Date().toLocaleString();
    const logEntry = timestamp + ': ' + message;
    chrome.storage.local.get({ logs: '' }, function(data) {
        const updatedLogs = data.logs + logEntry + '\n';
        chrome.storage.local.set({ logs: updatedLogs }, () => {
            console.log('Log updated successfully');
        });
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'downloadLogs') {
        downloadLogs();
    }
});

function downloadLogs() {
    chrome.storage.local.get('logs', function(data) {
        const blob = new Blob([data.logs], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url,
            filename: 'logs.txt',
            saveAs: true
        });
    });
}