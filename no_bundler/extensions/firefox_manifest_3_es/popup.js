document.querySelector('.extension_name').innerHTML = `This is the popup page. Extension Name: ${
    chrome.runtime.getManifest().name
}`;

chrome.runtime.sendMessage('message', (response) => {
    document.querySelector('.message_from_background').innerHTML = response;
});
