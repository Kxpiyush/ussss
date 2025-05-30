(async function (a) {
    document['head']['insertAdjacentHTML']('beforeend', '<style>.swal2-modal\x20:is(h2,\x20p){color:\x20initial;\x20margin:\x200;line-height:\x201.25;}.swal2-modal\x20p+p{margin-top:\x201rem;}#consulate_date_time,#asc_date_time{display:block!important;}.swal2-select{width:auto!important;}.swal2-timer-progress-bar{background:rgba(255,255,255,0.6)!important;}.swal2-toast.swal2-show{background:rgba(0,0,0,0.75)!important;}</style>');
    
    function b() {
        const D = document['querySelector']('h1') ? document['querySelector']('h1')['textContent'] : '';
        return D['includes']('Doing\x20Maintenance') || D['includes']('405\x20Not\x20Allowed');
    }

    b() && setTimeout(() => {
        location = a['replace'](/\/schedule.*/g, '/users/sign_out');
    }, 0x1388);

    const c = navigator ? navigator['language'] : 'xx-xx';

    const d = (D, E, F) => {
        let [G, H, I] = D['split']('-'), 
            [J, K, L] = E['split']('-'), 
            [M, N, O] = F['split']('-'),
            P = new Date(G, H - 0x1, I, '00', '00', '00'),
            Q = new Date(J, K - 0x1, L, '00', '00', '00'),
            R = new Date(M, N - 0x1, O, '00', '00', '00');
        
        if (Q < P) return ![];
        return R < Q && P <= R;
    };

    bookNow = () => document['querySelector']('.reveal-overlay:last-child\x20[data-reveal]\x20.button.alert')['click']();
    
    delay = async (D = 0x7d0) => await new Promise(E => setTimeout(E, D));
    
    toast = async D => {
        let E = await new Promise(F => {
            chrome['storage']['local']['get']([
                '__fq',
                '__fqType'
            ], G => {
                let H = G['__fq'], I = G['__fqType'];
                if (H) {
                    if (I === 'seconds') H /= 0x3c;
                    else I === 'hours' && (H *= 0x3c);
                    F(H * 0xea60);
                } else F(0x61a8);
            });
        });

        Swal['fire']({
            'toast': !![],
            'position': 'bottom-start',
            'timer': E,
            'showConfirmButton': ![],
            'timerProgressBar': !![],
            'html': D
        });
    };

    toast2 = async D => {
        Swal['fire']({
            'toast': !![],
            'position': 'bottom-start',
            'timer': 0x3e8 * 0x3c * 0xf,
            'showConfirmButton': ![],
            'timerProgressBar': !![],
            'html': D
        });
    };

    headers = { 'x-requested-with': 'XMLHttpRequest' };

    throwNotification = async (D, E) => {
        chrome['runtime']['sendMessage']({
            'type': 'notification',
            'options': {
                'type': 'basic',
                'iconUrl': '../icon128.png',
                'buttons': [
                    { 'title': 'Book' },
                    { 'title': 'Ignore' }
                ],
                'title': D,
                'message': E
            }
        });
    };

    let e = null,
        f = null,
        g = null,
        h = null,
        i = null,
        j = null,
        k = undefined,
        l = null,
        m = null,
        n = null,
        o = !![],
        p = ![],
        v = 'seconds';

    async function x(D, E, F, G) {
        if (!o) return;
        await delay(E);

        let H = new Date(),
            I = H['toLocaleString'](),
            J = F || document['getElementById']('appointments_consulate_appointment_facility_id')['value'],
            K = G ? G : document['getElementById']('appointments_asc_appointment_facility_id') ? document['getElementById']('appointments_asc_appointment_facility_id')['value'] : null;

        const [L, N, O, P, T, U] = await Promise['all']([
            fetch(a + '/days/' + J + '.json?appointments[expedite]=false', { 'headers': headers })['then'](Z => Z['json']())['catch'](Z => null),
            chrome['storage']['local']['get']('__fq')['then'](Z => Z['__fq']),
            chrome['storage']['local']['get']('__fqType')['then'](Z => Z['__fqType']),
            chrome['storage']['local']['get']('__ab')['then'](Z => Z['__ab']),
            chrome['storage']['local']['get']('__st')['then'](Z => Z['__st']),
            chrome['storage']['local']['get']('__en')['then'](Z => Z['__en'])
        ]);

        if ('seconds' == O && (N /= 0x3c), 'hours' == O && (N *= 0x3c), !U || U == null || U == '' || !U['match'](/\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/)) {
            n = await Swal['fire']({
                'title': 'Attention\x20please.',
                'html': 'Your\x20appointment\x20date\x20is\x20not\x20detected.\x20Please\x20enter\x20the\x20date\x20in\x20YYYY-MM-DD\x20format\x20to\x20proceed.',
                'input': 'text',
                'inputPlaceholder': 'YYYY-MM-DD',
                'allowEscapeKey': ![],
                'allowEnterKey': ![],
                'allowOutsideClick': ![],
                'icon': 'warning',
                'confirmButtonText': 'Confirm',
                'inputValidator': Z => {
                    if (!Z || !Z['match'](/\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/))
                        return 'Enter\x20date\x20in\x20YYYY-MM-DD\x20format\x20please.';
                }
            })['then'](async Z => {
                return await chrome['storage']['local']['set']({ '__en': Z['value'] }), Z['value'];
            });
        }

        const V = document['querySelector']('#appointments_consulate_appointment_facility_id');
        const W = document['querySelector']('#appointments_consulate_appointment_facility_id\x20option[selected]')?.['innerText'] || 'Selected Location';

        if (!L || L['error']) {
            if (p) location = a['replace'](/\/schedule.*/g, '/users/sign_out');
            else p = !![];
            return x(D, 0x3e8 * 0x3c * 0.017, J, K);
        }

        p = ![];

        if (L['length'] == 0x0) {
            toast('<span\x20style=\x22color:\x20white\x22>Checking\x20for:\x20' + W + '</span><br><br><span\x20style=\x22color:\x20red;\x22>No\x20dates\x20found.</span><br><br><span\x20style=\x22color:\x20white\x22>Looking\x20for\x20slot\x20from\x20' + T + '\x20to\x20' + U + '</span><br><span\x20style=\x22color:\x20orange\x22>Current\x20booked\x20date\x20:\x20' + D + '</span>\x20<br><br><span\x20style=\x22color:\x20yellow;\x22>Checked\x20@\x20' + I + '</span><br>');
            return x(D, 0x3e8 * 0x3c * N, J, K);
        }

        let X = L['map'](a0 => a0['date'])['sort']((a0, a1) => new Date(a0) - new Date(a1))['find'](a0 => d(T, U, a0));

        if (!X) {
            toast('<span\x20style=\x22color:\x20white\x22>Checking\x20for:\x20' + W + '</span><br><br><span\x20style=\x22color:\x20lightgreen;\x22>Latest\x20availability:\x20' + L[0x0]['date'] + '.</span><br><span\x20style=\x22color:\x20white\x22>Looking\x20for\x20slot\x20from\x20' + T + '\x20to\x20' + U + '</span><br><span\x20style=\x22color:\x20orange\x22>Current\x20booked\x20date\x20:\x20' + D + '</span><br><br><span\x20style=\x22color:\x20yellow;\x22>Checked\x20@\x20' + I + '</span>');
            return x(D, 0x3e8 * 0x3c * N, J, K);
        }

        toast('<span\x20style=\x22background:green;color:white;font-size:16px;\x22>Earlier\x20date\x20found:\x20' + X + '.</span>');

        document['getElementById']('appointments_consulate_appointment_date')['value'] = X;
        document['getElementById']('appointments_consulate_appointment_time')['innerHTML'] = '<option></option>';

        try {
            let a0 = await fetch(a + '/times/' + J + '.json?date=' + X + '&appointments[expedite]=false', { 'headers': headers })['then'](a1 => {
                if (!a1['ok']) throw new Error('Network\x20response\x20was\x20not\x20ok');
                return a1['json']();
            });

            if (a0['available_times']['length'] == 0x0) {
                toast('<span\x20style=\x22color:\x20white\x22>Checking\x20for:\x20' + W + '</span><br><br><span\x20style=\x22color:\x20red;\x22>No\x20time\x20slots\x20found\x20on\x20date\x20' + X + '.</span><br><span\x20style=\x22color:\x20yellow;\x22>Checked\x20@\x20' + I + '</span><br><span\x20style=\x22color:\x20orange\x22>Current\x20booked\x20date\x20:\x20' + D + '</span>\x20<br><span\x20style=\x22color:\x20white\x22>Looking\x20for\x20slot\x20from\x20' + T + '\x20to\x20' + U + '</span>');
                return x(D, 0x3e8 * 0x3c * N, J, K);
            }

            var Y = a0['available_times'][0x0];
            document['getElementById']('appointments_consulate_appointment_time')['innerHTML'] = '<option\x20value=\x22' + Y + '\x22>' + Y + '</option>';
            document['getElementById']('appointments_consulate_appointment_time')['value'] = Y;

        } catch (a1) {
            console['error']('Failed\x20to\x20fetch\x20time\x20slots:', a1);
            setTimeout(() => {
                location = a['replace'](/\/schedule.*/g, '/users/sign_out');
            }, 0x1388);
        }

        if (document['getElementById']('asc-appointment-fields')) {
            document['getElementById']('appointments_asc_appointment_facility_id')['removeAttribute']('disabled');
            document['getElementById']('appointments_asc_appointment_date')['removeAttribute']('disabled');
            document['getElementById']('appointments_asc_appointment_time')['removeAttribute']('disabled');

            let a3 = await fetch(a + '/days/' + K + '.json?consulate_id=' + J + '&consulate_date=' + X + '&consulate_time=' + Y + '&appointments[expedite]=false', { 'headers': headers })['then'](a8 => a8['json']())['catch'](a8 => null);

            if (!a3 || a3['error']) return x(D, 0x3e8 * 0x3c * N, J, K);

            k && (a3 = a3['reverse']());

            let a4 = a3?.['sort']((a8, a9) => new Date(a8['date']) - new Date(a9['date']))?.[0x0]?.['date'];

            if (!a4) {
                console['warn']('No\x20valid\x20ASC\x20dates\x20found.');
                return x(D, 0x3e8 * 0x3c * N, J, K);
            }

            document['getElementById']('appointments_asc_appointment_date')['value'] = a4;
            document['getElementById']('appointments_asc_appointment_time')['innerHTML'] = '<option></option>';

            let a5 = await fetch(a + '/times/' + K + '.json?date=' + a4 + '&consulate_id=' + J + '&consulate_date=' + X + '&consulate_time=' + Y + '&appointments[expedite]=false', { 'headers': headers })['then'](a8 => a8['json']())['catch'](a8 => null);

            if (!a5 || a5['available_times']['length'] === 0x0) {
                toast('<span\x20style=\x22color:\x20red;\x22>No\x20time\x20slots\x20found\x20on\x20date\x20' + a4 + '.</span><br><span\x20style=\x22color:\x20yellow;\x22>Checked\x20@\x20' + I + '</span><br><span\x20style=\x22color:\x20orange\x22>Current\x20booked\x20date\x20:\x20' + D + '</span>\x20<br><span\x20style=\x22color:\x20white\x22>Looking\x20for\x20slot\x20from\x20' + T + '\x20to\x20' + U + '</span>');
                return x(D, 0x3e8 * 0x3c * N, J, K);
            }

            let a6 = a5['available_times'][0x0];
            if (!a6) {
                console['warn']('No\x20valid\x20ASC\x20time\x20slots\x20found.');
                return x(D, 0x3e8 * 0x3c * N, J, K);
            }

            document['getElementById']('appointments_asc_appointment_time')['innerHTML'] = '<option\x20value=\x22' + a6 + '\x22>' + a6 + '</option>';
            document['getElementById']('appointments_asc_appointment_time')['value'] = a6;
        }

        P ? (document['getElementById']('appointments_submit')['removeAttribute']('disabled'), document['getElementById']('appointments_submit')['click'](), bookNow()) : throwNotification('New\x20Appointment\x20Found', 'Hi\x20there.\x20The\x20extension\x20found\x20a\x20new\x20appointment\x20on\x20' + X + '.\x20Book\x20now\x20before\x20it\x27s\x20gone!');
    }

    async function z() {
        let D = !!a['match'](/^\/[a-z]{2}-[a-z]{2}\/(n|)iv\/users\/sign_in/),
            E = !!a['match'](/^\/[a-z]{2}-[a-z]{2}\/(n|)iv$/),
            F = !!a['match'](/^\/[a-z]{2}-[a-z]{2}\/(n|)iv\/groups\/\d{1,}/),
            G = !!a['match'](/^\/[a-z]{2}-[a-z]{2}\/(n|)iv\/schedule\/\d{1,}\/appointment$/),
            H = !!a['match'](/^\/[a-z]{2}-[a-z]{2}\/(n|)iv\/schedule\/\d{1,}\/appointment\/instructions$/),
            I = (D || E || F || G || H) && !a['match'](/^\/en-/),
            J = await chrome['storage']['local']['get']('__uc')['then'](({__uc: P}) => P),
            K = await chrome['storage']['local']['get']('__it')['then'](({__it: P}) => P);

        if ((D || E || F || G || H) && !K) {
            return Swal['fire']({
                'title': 'Application\x20Type\x20Confirmation',
                'html': 'Please\x20select\x20if\x20you\x20applying\x20for\x20the\x20Immigrant\x20Visa\x20or\x20Non-Immigrant\x20Visa\x20to\x20proceed.',
                'icon': 'warning',
                'showDenyButton': !![],
                'confirmButtonText': 'Non-Immigrant\x20Visa',
                'confirmButtonColor': '#3F458E',
                'denyButtonText': 'Immigrant\x20Visa',
                'denyButtonColor': '#357856',
                'allowEscapeKey': ![],
                'allowEnterKey': ![],
                'allowOutsideClick': ![]
            })['then'](async P => {
                return await chrome['storage']['local']['set']({ '__it': !![] }), location['href'] = a['replace'](/\/(n|)iv/, P['isDenied'] ? '/iv' : '/niv');
            });
        }

        if (I) {
            let P = await chrome['storage']['local']['get']('__lc')['then'](({__lc: Q}) => Q);
            if (!P) {
                await Swal['fire']({
                    'title': 'Language\x20Confirmation',
                    'html': '<p>This\x20extension\x20is\x20designed\x20and\x20optimized\x20to\x20work\x20with\x20the\x20English\x20version\x20of\x20the\x20site.\x20This\x20is\x20because\x20of\x20the\x20different\x20ways\x20a\x20calendar\x20date\x20is\x20written\x20in\x20different\x20langauges.</p><p>It\x20is\x20highly\x20recommended\x20to\x20switch\x20to\x20the\x20English\x20version.</p>',
                    'icon': 'warning',
                    'showDenyButton': !![],
                    'confirmButtonText': 'Switch\x20to\x20English',
                    'denyButtonText': 'Don\x27t\x20switch',
                    'allowEscapeKey': ![],
                    'allowEnterKey': ![],
                    'allowOutsideClick': ![],
                    'reverseButtons': !![]
                })['then'](async Q => {
                    if (Q['isDenied']) return chrome['storage']['local']['set']({ '__lc': !![] });
                    return location['href'] = '/en' + a['substring'](0x3);
                });
            }
        }

        (D || F || G) && !J && await Swal['fire']({
            'title': 'Terms\x20&\x20Conditions',
            'html': '<p>By\x20using\x20this\x20extension,\x20you\x20acknowledge\x20and\x20agree\x20that\x20the\x20developer\x20is\x20not\x20responsible\x20for\x20any\x20rescheduling\x20that\x20may\x20occur\x20due\x20to\x20glitches,\x20site\x20changes,\x20or\x20other\x20unforeseen\x20circumstances.\x20Users\x20are\x20solely\x20responsible\x20for\x20any\x20actions\x20taken\x20by\x20the\x20extension,\x20and\x20should\x20be\x20aware\x20of\x20this\x20risk\x20before\x20using\x20it.</p><p>This\x20extension\x20will\x20not\x20auto\x20reschedule\x20your\x20appointment\x20unless\x20the\x20auto\x20book\x20feature\x20is\x20enabled\x20or\x20you\x20manually\x20click\x20on\x20the\x20notification\x20when\x20an\x20earlier\x20date\x20is\x20found.</p>',
            'icon': 'warning',
            'confirmButtonText': 'I\x20Understand',
            'allowEscapeKey': ![],
            'allowEnterKey': ![],
            'allowOutsideClick': ![]
        })['then'](() => {
            return chrome['storage']['local']['set']({ '__uc': !![] });
        });

        await delay();

        if (E) return document['querySelector']('.homeSelectionsContainer\x20a[href*=\x27/sign_in\x27]')['click']();
        if (!D && (!e || !f)) return;

        if (D) {
            if (!e) {
                e = await Swal['fire']({
                    'title': 'Attention\x20please.',
                    'html': 'Please\x20provide\x20the\x20email\x20to\x20login',
                    'input': 'email',
                    'inputLabel': 'Your\x20email\x20address',
                    'inputPlaceholder': 'Enter\x20your\x20email\x20address',
                    'allowEscapeKey': ![],
                    'allowEnterKey': ![],
                    'allowOutsideClick': ![],
                    'icon': 'warning',
                    'confirmButtonText': 'Next'
                })['then'](Q => {
                    return chrome['storage']['local']['set']({ '__un': Q['value'] }), Q['value'];
                });
            }

            if (!f) {
                f = await Swal['fire']({
                    'title': 'Attention\x20please.',
                    'html': 'Please\x20provide\x20the\x20password\x20to\x20login',
                    'input': 'password',
                    'inputLabel': 'Your\x20password',
                    'inputPlaceholder': 'Enter\x20your\x20password',
                    'allowEscapeKey': ![],
                    'allowEnterKey': ![],
                    'allowOutsideClick': ![],
                    'icon': 'warning',
                    'confirmButtonText': 'Submit'
                })['then'](Q => {
                    return chrome['storage']['local']['set']({ '__pw': Q['value'] }), Q['value'];
                });
            }

            document['getElementById']('user_email')['value'] = e;
            document['getElementById']('user_password')['value'] = f;
            document['querySelector']('[for=\x22policy_confirmed\x22]')['click']();
            document['querySelector']('#sign_in_form\x20input[type=submit]')['click']();
        } else {
            if (F) {
                if (document['querySelectorAll']('p.delivery\x20[href]')['length'] > 0x1 && !g) {
                    let R = 'There\x20are\x20multiple\x20appointments\x20in\x20your\x20account.\x20Please\x20select\x20the\x20appointment\x20you\x20wish\x20to\x20run\x20the\x20script\x20for.<br>',
                        S = new Object();

                    document['querySelectorAll']('p.delivery\x20[href]')['forEach'](T => {
                        if (T['href']) {
                            let U = T['href']['replace'](/\D/g, ''),
                                V = T['parentElement']['parentElement']['parentElement']['querySelector']('td'),
                                W = V ? V['innerText'] : 'Unknown\x20Name';
                            S[U] = W + '\x20:\x20' + U;
                        }
                    });

                    g = await Swal['fire']({
                        'title': 'Attention\x20please.',
                        'html': R,
                        'input': 'select',
                        'inputOptions': S,
                        'allowEscapeKey': ![],
                        'allowEnterKey': ![],
                        'allowOutsideClick': ![],
                        'inputValue': document['querySelector']('p.delivery\x20[href]')['href']['replace'](/\D/g, ''),
                        'icon': 'warning',
                        'confirmButtonText': 'Confirm'
                    })['then'](T => {
                        return chrome['storage']['local']['set']({ '__id': T['value'] }), T['value'];
                    });
                } else {
                    if (!g) {
                        let T = 'There\x20are\x20multiple\x20appointments\x20in\x20your\x20account.\x20Please\x20select\x20the\x20appointment\x20you\x20wish\x20to\x20run\x20the\x20script\x20for.<br>',
                            U = new Object();

                        document['querySelectorAll']('a.button.primary.small[href*=\x27/continue_actions\x27]')['forEach'](V => {
                            if (V['href']) {
                                let W = V['href']['replace'](/\D/g, ''),
                                    X = document['querySelector']('a[href*=\x27' + W + '\x27]')?.['closest']('.application');
                                if (X) {
                                    let Y = X['querySelector']('table\x20tbody\x20tr\x20td');
                                    if (Y && Y['innerText']) {
                                        let Z = Y['innerText'];
                                        U[W] = Z + '\x20:\x20' + W;
                                    } else console['warn']('No\x20valid\x20name\x20element\x20found\x20for\x20id:\x20' + W);
                                } else console['warn']('No\x20row\x20found\x20for\x20id:\x20' + W);
                            }
                        });

                        Object['keys'](U)['length'] > 0x1 ? g = await Swal['fire']({
                            'title': 'Attention\x20please.',
                            'html': T,
                            'input': 'select',
                            'inputOptions': U,
                            'allowEscapeKey': ![],
                            'allowEnterKey': ![],
                            'allowOutsideClick': ![],
                            'inputValue': Object['keys'](U)[0x0],
                            'icon': 'warning',
                            'confirmButtonText': 'Confirm'
                        })['then'](V => {
                            return chrome['storage']['local']['set']({ '__id': V['value'] }, () => {}), V['value'];
                        }) : (g = document['querySelector']('p.delivery\x20[href]')['href']['replace'](/\D/g, ''), chrome['storage']['local']['set']({ '__id': g }));
                    }
                }

                let Q = document['querySelector']('p.delivery\x20[href*=\x27' + g + '\x27]');
                if (Q) {
                    Q = Q['parentNode']['parentNode']['parentNode'];
                    let V, W, X = new Date(),
                        Y = Q['querySelector']('h4')['innerText']['toLowerCase']()['trim']();

                    if (Y['includes']('attend\x20appointment')) {
                        V = new Date(Q['querySelector']('p.consular-appt')['innerText']['match'](/\d{1,2} \w{1,}, \d{4}/)[0x0]);
                        W = Q['querySelector']('p.delivery\x20[href]')['getAttribute']('href')['replace']('/addresses/delivery', '/appointment');
                        await chrome['storage']['local']['set']({ '__ad': V['getFullYear']() + '-' + (V['getMonth']() + 0x1 + '')['padStart'](0x2, 0x0) + '-' + (V['getDate']() + '')['padStart'](0x2, 0x0) })['then'](Z => {
                            V > X && (location = W);
                        });
                    } else Y['includes']('schedule\x20appointment') && (W = Q['querySelector']('p.delivery\x20[href]')['getAttribute']('href')['replace']('/addresses/delivery', '/appointment'), location = W);
                } else console['log']('Appointment\x20element\x20not\x20found\x20for\x20$appid:', g);
            } else {
                if (G) {
                    const Z = document['querySelector']('.callout.secondary.animate.bounce-in\x20p');
                    if (Z) {
                        const a1 = document['querySelector']('input[type=\x22checkbox\x22]');
                        a1 && !a1['checked'] && a1['click']();
                        const a2 = document['querySelector']('input[type=\x22submit\x22][value=\x22Continue\x22]');
                        a2 && a2['click']();
                    }

                    let a0 = document['querySelector']('form[action*=\x22' + a + '\x22]');
                    if (a0 && a0['method']['toLowerCase']() == 'get') return a0['submit']();
                    if (!document['getElementById']('consulate_date_time')) return;

                    if (!n || n == null || n == '') {
                        n = await Swal['fire']({
                            'title': 'Attention\x20please.',
                            'html': 'Your\x20appointment\x20date\x20is\x20not\x20detected.\x20Please\x20enter\x20your\x20current\x20appointment\x20date\x20or\x20your\x20target\x20date\x20in\x20YYYY-MM-DD\x20format\x20to\x20proceed.\x20we\x20will\x20use\x20it\x20to\x20find\x20earlier\x20appointments.',
                            'input': 'text',
                            'inputPlaceholder': 'YYYY-MM-DD',
                            'allowEscapeKey': ![],
                            'allowEnterKey': ![],
                            'allowOutsideClick': ![],
                            'icon': 'warning',
                            'confirmButtonText': 'Confirm',
                            'inputValidator': a3 => {
                                if (!a3 || !a3['match'](/\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/))
                                    return 'Enter\x20date\x20in\x20YYYY-MM-DD\x20format\x20please.';
                            }
                        })['then'](async a3 => {
                            return await chrome['storage']['local']['set']({
                                '__ad': a3['value'],
                                '__en': a3['value']
                            }), a3['value'];
                        });
                    }

                    if (!h) {
                        var L = document['querySelector']('#appointments_consulate_appointment_facility_id\x20[selected]'),
                            M = L ? L['innerText'] : null,
                            N;
                        M ? N = 'Your\x20current\x20interview\x20location\x20is\x20set\x20to\x20<b>' + M + '</b>.\x20To\x20change\x20your\x20location,\x20select\x20the\x20City\x20in\x20the\x20box\x20below\x20and\x20submit.<br>' : N = 'Please\x20select\x20the\x20location\x20you\x20want\x20to\x20book\x20your\x20date.';
                        O = new Object();
                        document['querySelectorAll']('#appointments_consulate_appointment_facility_id\x20option')['forEach'](a3 => {
                            a3['innerText'] && (O[a3['value']] = a3['innerText']);
                        });

                        h = await Swal['fire']({
                            'title': 'Attention\x20please.',
                            'html': N,
                            'input': 'select',
                            'inputOptions': O,
                            'allowEscapeKey': ![],
                            'allowEnterKey': ![],
                            'allowOutsideClick': ![],
                            'inputValue': document['querySelector']('#appointments_consulate_appointment_facility_id')['value'],
                            'icon': 'warning',
                            'confirmButtonText': 'Confirm'
                        })['then'](a3 => {
                            return chrome['storage']['local']['set']({ '__il': a3['value'] }), a3['value'];
                        });
                    }

                    if (!j && document['getElementById']('asc-appointment-fields')) {
                        var N = 'Your\x20current\x20ASC\x20location\x20is\x20set\x20to\x20<b>' + document['querySelector']('#appointments_asc_appointment_facility_id\x20[selected]')['innerText'] + '</b>.\x20To\x20change\x20your\x20location,\x20select\x20the\x20City\x20in\x20the\x20box\x20below\x20and\x20submit.<br>',
                            O = new Object();

                        document['querySelectorAll']('#appointments_asc_appointment_facility_id\x20option')['forEach'](a3 => {
                            a3['innerText'] && (O[a3['value']] = a3['innerText']);
                        });

                        j = await Swal['fire']({
                            'title': 'Attention\x20please.',
                            'html': N,
                            'input': 'select',
                            'inputOptions': O,
                            'allowEscapeKey': ![],
                            'allowEnterKey': ![],
                            'allowOutsideClick': ![],
                            'inputValue': document['querySelector']('#appointments_asc_appointment_facility_id')['value'],
                            'icon': 'warning',
                            'confirmButtonText': 'Confirm'
                        })['then'](a3 => {
                            return chrome['storage']['local']['set']({ '__al': a3['value'] }), a3['value'];
                        });
                    }

                    if (k === undefined && document['getElementById']('asc-appointment-fields')) {
                        var N = 'When\x20would\x20you\x20like\x20to\x20schedule\x20your\x20ASC\x20appointment?<br>',
                            O = {
                                'false': 'First\x20available\x20date',
                                'true': 'Closest\x20to\x20VISA\x20appointment'
                            };

                        k = await Swal['fire']({
                            'title': 'Attention\x20please.',
                            'html': N,
                            'input': 'select',
                            'inputOptions': O,
                            'allowEscapeKey': ![],
                            'allowEnterKey': ![],
                            'allowOutsideClick': ![],
                            'inputValue': ![],
                            'icon': 'warning',
                            'confirmButtonText': 'Confirm'
                        })['then'](a3 => {
                            return chrome['storage']['local']['set']({ '__ar': a3['value'] == 'true' }), a3['value'] == 'true';
                        });
                    }

                    (function (a3) {
                        return Swal['fire']({
                            'title': 'Attention\x20Please',
                            'html': '<p>The\x20extension\x20found\x20your\x20current\x20appointment\x20on\x20<strong>' + a3 + '</strong>\x20and\x20will\x20use\x20it\x20to\x20find\x20earlier\x20appointments.</p><p>If\x20this\x20is\x20not\x20correct,\x20please\x20stop\x20using\x20the\x20extension\x20and\x20contact\x20the\x20developer\x20immediately.\x20This\x20message\x20will\x20automatically\x20close\x20in\x207\x20seconds.</p>',
                            'timer': 0x1b58,
                            'timerProgressBar': !![],
                            'showConfirmButton': ![],
                            'allowOutsideClick': ![]
                        });
                    }(n));

                    x(i, 0x0, h, j);
                } else H && (await delay(0xa * 0x3e8), location = a['replace'](/schedule.*/g, ''));
            }
        }
    }

    chrome['runtime']['onMessage']['addListener'](function (D, E, F) {
        if (D['ping']) return F({ 'pong': !![] });
        if (D['bookNow']) return bookNow();
        if (D['action'] == 'logout') {
            let G = a['split']('/');
            location = G['length'] < 0x3 ? '/en-us/niv/users/sign_out' : '/' + G[0x1] + '/' + G[0x2] + '/users/sign_out';
        }
        if (D['action'] == 'activate') {
            o = D['status'];
            if (o) z();
        }
        F(!![]);
    });

    const A = chrome['runtime']['connect']({ 'name': 'ais-us-visa' });
    A['onMessage']['addListener'](async function (D) {
        if (D['action'] == 'fetch_info') {
            e = D['data']['$username'];
            f = D['data']['$password'];
            g = D['data']['$appid'];
            h = D['data']['$apptCenter'];
            i = D['data']['$apptDate'];
            j = D['data']['$ascCenter'];
            k = D['data']['$ascReverse'];
            o = D['data']['$active'];
            l = D['data']['$version'];
            m = D['data']['$start'];
            n = D['data']['$end'];

            (!n || n == null || n == '' || new Date(i) <= new Date(n)) && (n = i, await chrome['storage']['local']['set']({ '__en': n }));
            (!m || n == null || n == '') && (m = new Date()['toISOString']()['split']('T')[0x0], await chrome['storage']['local']['set']({ '__st': m }));

            if (o && a['includes']('countries_list')) {
                Swal['fire']({
                    'title': 'Attention\x20please.',
                    'html': 'Please\x20select\x20the\x20country\x20on\x20this\x20page,\x20I\x20recommend\x20you\x20to\x20use\x20English\x20language.',
                    'allowEscapeKey': ![],
                    'allowEnterKey': ![],
                    'allowOutsideClick': ![],
                    'icon': 'warning',
                    'confirmButtonText': 'Confirm'
                });
            }

            if (o) z();
        }
    });

    A['postMessage']({ 'action': 'fetch_info' });
}(location['pathname']));