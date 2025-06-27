// what i want is to load any previosuusly stored value (if any)
chrome.storage.local.get(['lastSpeed']).then(result => {
    let speed = result.lastSpeed || 1.0;
    let video = document.querySelector('video');
    if(video) video.playbackRate = speed; 
}); 

// then listen for messages from popup or background
chrome.runtime.onMessage.addEventListener((message, sender, sendResponse) => {
    let video = document.querySelector('video');
    if(!video) return; 

    if(message.action === "setSpeed") {
        video.playbackRate = message.speed;
        chrome.storage.local.set({lastSpeed: message.speed});
    } 
    else if(message.action === "increase speed") {
        // increase by 0.5 on increase speed
        let newRate = Math.min(video.playbackRate + 0.5, 5.0);
        video.playbackRate = newRate;
        chrome.storage.local.set({lastSpeed: newRate});
    }
    else if(message.action === "decrease speed") {
        // decrease by 0.5 on decrease speed
        let newRate = Math.min(video.playbackRate - 0.5, 0.1);
        video.playbackRate = newRate;
        chrome.storage.local.set({lastSpeed: newRate});
    }
});