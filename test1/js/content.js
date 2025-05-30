document.addEventListener('DOMContentLoaded', function() {
    const version = chrome.runtime.getManifest().version;
    document.getElementById('version').innerText = '(version v' + version + ')';

    chrome.storage.local.get().then(data => {
        document.getElementById('activate').checked = data.__ap;
        document.getElementById('autobook').checked = data.__ab;
        document.getElementById('frequencyValue').value = data.__fq || 30;

        let frequencyType = document.getElementById('frequencyType');
        let selectedType = data.__fqType || 'seconds';
        for (let i = 0; i < frequencyType.options.length; i++) {
            if (frequencyType.options[i].value === selectedType) {
                frequencyType.selectedIndex = i;
                break;
            }
        }

        document.getElementById('start').value = data.__st || new Date().toISOString().split('T')[0];
        document.getElementById('end').value = data.__en || '';
    });

    chrome.storage.onChanged.addListener(async (changes, namespace) => {
        if (changes.__st) {
            let newStartDate = changes.__st.newValue;
            if (!newStartDate) newStartDate = new Date().toISOString().split('T')[0];
            document.getElementById('start').value = newStartDate;
        }
        if (changes.__en) {
            let newEndDate = changes.__en.newValue;
            let currentAppointment = await chrome.storage.local.get('__ad').then(({__ad}) => __ad);
            if (!newEndDate) newEndDate = currentAppointment || '';
            else {
                if (currentAppointment && new Date(currentAppointment) <= new Date(newEndDate))
                    newEndDate = currentAppointment;
                else
                    newEndDate == '';
            }
            document.getElementById('end').value = newEndDate;
        }
    });

    document.getElementById('activate').addEventListener('change', async function() {
        chrome.storage.local.set({ '__ap': this.checked });
        let [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        });
        chrome.tabs.sendMessage(tab.id, {
            action: 'activate',
            status: this.checked
        });
    });

    document.getElementById('autobook').addEventListener('change', async function() {
        chrome.storage.local.set({ '__ab': this.checked });
    });

    document.getElementById('frequencyValue').addEventListener('change', function() {
        chrome.storage.local.set({ '__fq': this.value || 30 });
    });

    document.getElementById('frequencyType').addEventListener('change', function() {
        chrome.storage.local.set({ '__fqType': this.value || 'seconds' });
    });

    document.getElementById('start').addEventListener('change', function() {
        chrome.storage.local.set({ '__st': this.value || new Date().toISOString().split('T')[0] });
    });

    document.getElementById('end').addEventListener('change', async function() {
        let currentAppointment = await chrome.storage.local.get('__ad').then(({__ad}) => __ad);
        if (!this.value) this.value = currentAppointment || '';
        else {
            if (currentAppointment && new Date(currentAppointment) <= new Date(this.value))
                this.value = currentAppointment;
            else
                this.value == '';
        }
        chrome.storage.local.set({ '__en': this.value || '' });
    });

    document.getElementById('contact_us').addEventListener('click', function() {
        chrome.tabs.create({ url: 'https://www.alertmeasap.com/contact' });
    });

    document.getElementById('ais_visa_info').addEventListener('submit', async function(e) {
        e.preventDefault();
        let resetButton = document.getElementById('reset_info');
        resetButton.setAttribute('disabled', 'disabled');
        await new Promise(r => setTimeout(r, 500));
        await chrome.storage.local.clear();
        await chrome.storage.local.set({
            '__ab': false,
            '__ap': true,
            '__fq': 30,
            '__fqType': 'seconds'
        });
        let [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        });
        await chrome.tabs.sendMessage(tab.id, { action: 'logout' });
        resetButton.classList.toggle('btn-success');
        resetButton.innerText = 'Success';
        await new Promise(r => setTimeout(r, 1000));
        resetButton.classList.toggle('btn-success');
        resetButton.removeAttribute('disabled');
        resetButton.innerText = 'Reset';
    });
});