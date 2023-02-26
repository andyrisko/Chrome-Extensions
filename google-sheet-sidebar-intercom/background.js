console.log("background.js started")
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse({ backgroundRx: "OK" });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const response = chrome.tabs.sendMessage(tabs[0].id, request);
  });
});

