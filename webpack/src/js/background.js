import Listener from 'advanced-extension-reloader-watch-2/umd/listener';

new Listener().listen();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendResponse('This is a message from background.js: Hello, World!');
});
