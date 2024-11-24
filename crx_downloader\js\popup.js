document.addEventListener('DOMContentLoaded', function() {
    const downloadCrx = document.getElementById('downloadCrx');
    const convertToZip = document.getElementById('convertToZip');
    const convertToCrx = document.getElementById('convertToCrx');
    const extensionInfo = document.getElementById('extensionInfo');

    function extractExtensionId(url) {
        const patterns = [
            /chromewebstore\.google\.com\/detail\/[^\/]+\/([a-z0-9]{32})/i,
            /chrome\.google\.com\/webstore\/detail\/[^\/]+\/([a-z0-9]{32})/i
        ];

        for (let pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    }

    function updateButtons(enabled) {
        downloadCrx.disabled = !enabled;
        convertToZip.disabled = !enabled;
        convertToCrx.disabled = !enabled;
    }

    function updateMessage(message, type = '') {
        extensionInfo.textContent = message;
        extensionInfo.className = type;
    }

    async function getCurrentTab() {
        const tabs = await chrome.tabs.query({active: true, currentWindow: true});
        return tabs[0];
    }

    async function getExtensionName(tab) {
        return tab.title.replace(' - Chrome Web Store', '').trim();
    }

    async function checkCurrentPage() {
        try {
            const tab = await getCurrentTab();
            const currentUrl = tab.url;
            
            if (currentUrl.includes('chromewebstore.google.com/detail/')) {
                const extensionName = await getExtensionName(tab);
                if (extensionName) {
                    updateMessage(`Ready to download: ${extensionName}`);
                    updateButtons(true);
                } else {
                    updateMessage('Error: Could not find extension name.', 'warning');
                    updateButtons(false);
                }
            } else {
                updateMessage('Please navigate to a Chrome Web Store extension page to download.', 'warning');
                updateButtons(false);
            }
        } catch (error) {
            console.error('Error:', error);
            updateMessage('Error: Please make sure you are on a Chrome Web Store page.', 'warning');
            updateButtons(false);
        }
    }

    async function handleDownload(format) {
        try {
            const tab = await getCurrentTab();
            const extensionId = extractExtensionId(tab.url);
            
            if (!extensionId) {
                updateMessage('Error: Invalid extension page.', 'warning');
                return;
            }

            const extensionName = await getExtensionName(tab);
            if (extensionName) {
                chrome.runtime.sendMessage({
                    action: 'downloadExtension',
                    extensionId: extensionId,
                    extensionName: extensionName,
                    format: format
                });
                updateMessage(`Downloading ${extensionName} as ${format.toUpperCase()}...`, 'success');
            }
        } catch (error) {
            console.error('Download error:', error);
            updateMessage('Error: Could not download extension.', 'warning');
        }
    }

    downloadCrx.addEventListener('click', () => handleDownload('crx'));
    convertToZip.addEventListener('click', () => handleDownload('zip'));
    convertToCrx.disabled = true; // Disable ZIP to CRX for now

    checkCurrentPage();
});