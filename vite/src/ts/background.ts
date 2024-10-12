import Listener from 'advanced-extension-reloader-watch-2/es/listener';

new Listener().listen();

chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
    sendResponse('This is a message from background.js: Hello, World!');
});
