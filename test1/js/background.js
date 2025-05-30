chrome['runtime']['onConnect']['addListener'](function (a) {
    a['onMessage']['addListener'](async function (b) {
        let c = new Object();
        c['action'] = b['action'];
        if (b['action'] == 'fetch_info') {
            let {__un: d} = await chrome['storage']['local']['get']('__un'), {__pw: e} = await chrome['storage']['local']['get']('__pw'), {__id: f} = await chrome['storage']['local']['get']('__id'), {__ap: g} = await chrome['storage']['local']['get']('__ap'), {__il: h} = await chrome['storage']['local']['get']('__il'), {__ad: i} = await chrome['storage']['local']['get']('__ad'), {__al: j} = await chrome['storage']['local']['get']('__al'), {__ar: k} = await chrome['storage']['local']['get']('__ar'), {__st: l} = await chrome['storage']['local']['get']('__st'), {__en: m} = await chrome['storage']['local']['get']('__en'), n = await new Promise(o => chrome['management']['getSelf'](p => o(p['version'])));
            c['data'] = {
                '$username': d,
                '$password': e,
                '$appid': f,
                '$active': g,
                '$apptCenter': h,
                '$apptDate': i,
                '$ascCenter': j,
                '$ascReverse': k,
                '$start': l,
                '$end': m,
                '$version': n
            };
        }
        a['postMessage'](c);
    });
}), chrome['runtime']['onInstalled']['addListener'](async ({reason: a}) => {
    chrome['action']['disable'](), chrome['declarativeContent']['onPageChanged']['removeRules'](undefined, () => {
        let b = {
                'conditions': [new chrome['declarativeContent']['PageStateMatcher']({ 'pageUrl': { 'hostEquals': 'ais.usvisa-info.com' } })],
                'actions': [new chrome['declarativeContent']['ShowAction']()]
            }, c = [b];
        chrome['declarativeContent']['onPageChanged']['addRules'](c);
    }), a === 'install' && (chrome['tabs']['create']({ 'url': 'https://www.alertmeasap.com' }), await chrome['storage']['local']['set']({
        '__ab': ![],
        '__ap': !![],
        '__cr': 0x0,
        '__fq': 0x1e,
        '__fqType': 'seconds'
    }), chrome['tabs']['create']({ 'url': 'https://ais.usvisa-info.com/en-us/countries_list/niv' }));
});
var a0a = null, a0b = null, a0c = (a, b, c) => {
        chrome['tabs']['sendMessage'](a, { 'ping': !![] }, function (d) {
            d && d['pong'] && chrome['tabs']['sendMessage'](a, b, c);
        });
    };
chrome['notifications']['onButtonClicked']['addListener'](function (a, b) {
    a === a0a && (chrome['tabs']['get'](a0b, function (c) {
        chrome['tabs']['highlight']({ 'tabs': c['index'] }, function () {
        });
    }), a0c(a0b, { 'bookNow': b === 0x0 }));
}), chrome['runtime']['onMessage']['addListener']((a, b, c) => {
    chrome['notifications']['create'](a['options'], function (d) {
        a0a = d, a0b = b['tab']['id'];
    }), c(!![]);
}), chrome['runtime']['onMessage']['addListener'](function (a, b, c) {
    a['type'] === 'log' && a0d(a['message']);
});
function a0d(a) {
    const b = new Date()['toLocaleString'](), c = b + ':\x20' + a;
    chrome['storage']['local']['get']({ 'logs': '' }, function (d) {
        const e = d['logs'] + c + '\x0a';
        chrome['storage']['local']['set']({ 'logs': e }, () => {
            console['log']('Log\x20updated\x20successfully');
        });
    });
}
chrome['runtime']['onMessage']['addListener'](function (a, b, c) {
    a['action'] === 'downloadLogs' && a0e();
});
function a0e() {
    chrome['storage']['local']['get']('logs', function (a) {
        const b = new Blob([a['logs']], { 'type': 'text/plain' }), c = URL['createObjectURL'](b);
        chrome['downloads']['download']({
            'url': c,
            'filename': 'logs.txt',
            'saveAs': !![]
        });
    });
}