new Listener().listen();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendResponse('This is a message from background.js: Hello, World!');
});
