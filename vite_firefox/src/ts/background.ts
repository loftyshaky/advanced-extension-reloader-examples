import 'advanced-extension-reloader-watch-2/listener';

chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
    sendResponse('This is a message from background.js: Hello, World!');
});

export {};
