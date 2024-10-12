const extension_name = document.querySelector('.extension_name');

if (extension_name) {
    extension_name.innerHTML = `This is the popup page. Extension Name: ${
        chrome.runtime.getManifest().name
    }`;
}

chrome.runtime.sendMessage('message', (response) => {
    const message_from_background = document.querySelector('.message_from_background');

    if (message_from_background) {
        message_from_background.innerHTML = response;
    }
});
