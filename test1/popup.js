document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('downloadLogs').addEventListener('click', function() {
        chrome.storage.local.get('logs', function(data) {
            if (!data.logs) {
                alert('No logs to download.');
                return;
            }
            const blob = new Blob([data.logs], {type: 'text/plain'});
            const url = URL.createObjectURL(blob);
            chrome.downloads.download({
                url: url,
                filename: 'logs.txt',
                saveAs: true
            }, function(downloadId) {
                console.log('Log file download started with ID: ' + downloadId);
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const startDateInput = document.getElementById('start');
    if (startDateInput) {
        // Calculate today's date in the correct format (YYYY-MM-DD)
        const today = new Date().toISOString().split('T')[0];
        console.log("Today's date set as min:", today);
        // Set the minimum date for the date picker
        startDateInput.setAttribute('min', today);
    } else {
        console.error("Start date input not found");
    }
});