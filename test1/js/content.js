(async function () {
    const a = await new Promise(b => chrome['management']['getSelf'](c => b(c['version'])));
    document['getElementById']('version')['innerText'] = '(version\x20v' + a + ')', await chrome['storage']['local']['get']()['then'](b => {
        document['getElementById']('activate')['checked'] = b['__ap'], document['getElementById']('autobook')['checked'] = b['__ab'], document['getElementById']('frequencyValue')['value'] = b['__fq'] || 0x1e;
        let c = document['getElementById']('frequencyType'), d = b['__fqType'] || 'seconds';
        for (let f = 0x0; f < c['options']['length']; f++)
            if (c['options'][f]['value'] === d) {
                c['selectedIndex'] = f;
                break;
            }
        document['getElementById']('start')['value'] = b['__st'] || new Date()['toISOString']()['split']('T')[0x0], document['getElementById']('end')['value'] = b['__en'] || '';
        const e = b['__isProUser'];
        console['log'](e), e ? (document['getElementById']('credits')['innerText'] = 'Unlimited\x20', document['querySelector']('.credits-left\x20p')['innerText'] = '\x20Credits') : document['getElementById']('credits')['innerText'] = b['__cr'] || '--';
    }), chrome['storage']['onChanged']['addListener'](async (b, c) => {
        b['__cr'] && (document['getElementById']('credits')['innerText'] = b['__cr']['newValue']);
        if (b['__st']) {
            let d = b['__st']['newValue'];
            if (!d)
                d = new Date()['toISOString']()['split']('T')[0x0];
            document['getElementById']('start')['value'] = d;
        }
        if (b['__en']) {
            let e = b['__en']['newValue'], f = await chrome['storage']['local']['get']('__ad')['then'](({__ad: g}) => g);
            if (!e)
                e = f || '';
            else {
                if (f && new Date(f) <= new Date(e))
                    e = f;
                else
                    e == '';
            }
            document['getElementById']('end')['value'] = e;
        }
    }), document['getElementById']('activate')['addEventListener']('change', async function () {
        chrome['storage']['local']['set']({ '__ap': this['checked'] });
        let [b] = await chrome['tabs']['query']({
            'active': !![],
            'lastFocusedWindow': !![]
        });
        chrome['tabs']['sendMessage'](b['id'], {
            'action': 'activate',
            'status': this['checked']
        });
    }), document['getElementById']('autobook')['addEventListener']('change', async function () {
        chrome['storage']['local']['set']({ '__ab': this['checked'] });
    }), document['getElementById']('frequencyValue')['addEventListener']('change', function () {
        chrome['storage']['local']['set']({ '__fq': this['value'] || 0x1e });
    }), document['getElementById']('frequencyType')['addEventListener']('change', function () {
        chrome['storage']['local']['set']({ '__fqType': this['value'] || 'seconds' });
    }), document['getElementById']('start')['addEventListener']('change', function () {
        chrome['storage']['local']['set']({ '__st': this['value'] || new Date()['toISOString']()['split']('T')[0x0] });
    }), document['getElementById']('end')['addEventListener']('change', async function () {
        let b = await chrome['storage']['local']['get']('__ad')['then'](({__ad: c}) => c);
        if (!this['value'])
            this['value'] = b || '';
        else {
            if (b && new Date(b) <= new Date(this['value']))
                this['value'] = b;
            else
                this['value'] == '';
        }
        chrome['storage']['local']['set']({ '__en': this['value'] || '' });
    }), document['getElementById']('contact_us')['addEventListener']('click', function () {
        chrome['tabs']['create']({ 'url': 'https://www.alertmeasap.com/contact' });
    }), document['getElementById']('ais_visa_info')['addEventListener']('submit', async function (b) {
        b['preventDefault']();
        let c = document['getElementById']('reset_info');
        c['setAttribute']('disabled', 'disabled'), await new Promise(f => setTimeout(f, 0x1f4)), await chrome['storage']['local']['clear'](), await chrome['storage']['local']['set']({
            '__ab': ![],
            '__ap': !![],
            '__cr': 0x0,
            '__fq': 0x1e,
            '__fqType': 'seconds'
        });
        let [d] = await chrome['tabs']['query']({
            'active': !![],
            'lastFocusedWindow': !![]
        });
        await chrome['tabs']['sendMessage'](d['id'], { 'action': 'logout' }), c['classList']['toggle']('btn-success'), c['innerText'] = 'Success', await new Promise(f => setTimeout(f, 0x3e8)), c['classList']['toggle']('btn-success'), c['removeAttribute']('disabled'), c['innerText'] = 'Reset';
    });
}());