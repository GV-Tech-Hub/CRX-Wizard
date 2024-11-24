chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'downloadExtension') {
        const extensionId = request.extensionId;
        const format = request.format;
        const extensionName = request.extensionName;
        const safeFileName = extensionName.replace(/[^a-z0-9]/gi, '_');
        const crxUrl = `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&prodversion=100.0&x=id%3D${extensionId}%26installsource%3Dondemand%26uc`;

        if (format === 'crx') {
            chrome.downloads.download({
                url: crxUrl,
                filename: `${safeFileName}.crx`,
                saveAs: true
            });
        } else if (format === 'zip') {
            fetch(crxUrl)
                .then(response => response.arrayBuffer())
                .then(buffer => {
                    // Find the ZIP start marker (PK..)
                    const array = new Uint8Array(buffer);
                    let zipStartIndex = 0;
                    for (let i = 0; i < array.length - 4; i++) {
                        if (array[i] === 0x50 && array[i + 1] === 0x4B && array[i + 2] === 0x03 && array[i + 3] === 0x04) {
                            zipStartIndex = i;
                            break;
                        }
                    }
                    
                    // Extract ZIP content
                    const zipContent = buffer.slice(zipStartIndex);
                    const blob = new Blob([zipContent], { type: 'application/zip' });
                    const url = URL.createObjectURL(blob);
                    
                    chrome.downloads.download({
                        url: url,
                        filename: `${safeFileName}.zip`,
                        saveAs: true
                    }, () => {
                        URL.revokeObjectURL(url);
                    });
                })
                .catch(error => {
                    console.error('Download failed:', error);
                });
        }
    }
    return true;
});