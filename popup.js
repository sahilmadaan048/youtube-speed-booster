// popup.js
document.getElementById('setSpeed').addEventListener('click', () => {
    const speed = parseFloat(document.getElementById('speedInput').value);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "setSpeed", speed: speed });
    });
});

/*

when user clicks "Set Speed" button, we grab the input value and send a message { active: true, currentWindow: true }
to the content script in the active tab

*/