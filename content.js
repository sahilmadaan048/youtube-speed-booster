(function () {
    'use strict';

    let speedController = null;
    let currentVideo = null;

    function createSpeedController() {
        if (speedController) return;

        speedController = document.createElement('div');
        speedController.id = 'youtube-speed-booster';
        speedController.innerHTML = `
            <div class="speed-booster-panel draggable">
                <div class="speed-booster-title">Speed Control</div>
                <div class="speed-booster-controls">
                    <button class="speed-btn" data-speed="0.1">0.1x</button>
                    <button class="speed-btn" data-speed="0.25">0.25x</button>
                    <button class="speed-btn" data-speed="0.5">0.5x</button>
                    <button class="speed-btn" data-speed="0.75">0.75x</button>
                    <button class="speed-btn active" data-speed="1">1x</button>
                    <button class="speed-btn" data-speed="1.25">1.25x</button>
                    <button class="speed-btn" data-speed="1.5">1.5x</button>
                    <button class="speed-btn" data-speed="1.75">1.75x</button>
                    <button class="speed-btn" data-speed="2">2x</button>
                    <button class="speed-btn" data-speed="3">3x</button>
                    <button class="speed-btn" data-speed="4">4x</button>
                    <button class="speed-btn" data-speed="5">5x</button>
                    <button class="speed-btn" data-speed="10">10x</button>
                </div>
                <div class="speed-booster-custom">
                    <input type="number" id="custom-speed" min="0.1" max="10" step="0.1" placeholder="Custom">
                    <button id="apply-custom">Apply</button>
                </div>
                <div class="speed-booster-current">Current: <span id="current-speed">1x</span></div>
            </div>
        `;

        document.body.appendChild(speedController);

        addEventListeners();
        makeDraggable(speedController.querySelector('.speed-booster-panel'));
    }

    function addEventListeners() {
        speedController.querySelectorAll('.speed-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const speed = parseFloat(e.target.dataset.speed);
                setVideoSpeed(speed);
                updateActiveButton(e.target);
            });
        });

        const customInput = speedController.querySelector('#custom-speed');
        const applyBtn = speedController.querySelector('#apply-custom');

        applyBtn.addEventListener('click', () => {
            const speed = parseFloat(customInput.value);
            if (speed >= 0.1 && speed <= 10) {
                setVideoSpeed(speed);
                updateActiveButton(null, speed);
                customInput.value = '';
            }
        });

        customInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyBtn.click();
            }
        });
    }

    function setVideoSpeed(speed) {
        const video = document.querySelector('video');
        if (video) {
            video.playbackRate = speed;
            document.querySelector('#current-speed').textContent = speed + 'x';
            console.log(`YouTube Speed set to: ${speed}x`);
        } else {
            console.log('No video element found');
        }
    }

    function updateActiveButton(clickedBtn, customSpeed = null) {
        speedController.querySelectorAll('.speed-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        if (clickedBtn) {
            clickedBtn.classList.add('active');
        } else if (customSpeed) {
            const matchingBtn = speedController.querySelector(`[data-speed="${customSpeed}"]`);
            if (matchingBtn) {
                matchingBtn.classList.add('active');
            }
        }
    }

    function waitForVideo() {
        const video = document.querySelector('video');
        if (video && video !== currentVideo) {
            currentVideo = video;
            createSpeedController();

            console.log('YouTube Speed Booster: Video detected');

            video.addEventListener('loadstart', () => {
                setTimeout(() => {
                    const currentSpeed = video.playbackRate;
                    document.querySelector('#current-speed').textContent = currentSpeed + 'x';
                    updateActiveButton(null, currentSpeed);
                }, 1000);
            });
        }
    }

    function init() {
        const checkForVideo = setInterval(() => {
            waitForVideo();
        }, 1000);

        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                setTimeout(waitForVideo, 2000);
            }
        }).observe(document, { subtree: true, childList: true });
    }

    function makeDraggable(el) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        el.style.position = 'fixed';
        el.style.zIndex = '9999';
        el.style.top = '100px';
        el.style.left = '100px';
        el.style.cursor = 'move';

        el.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - el.offsetLeft;
            offsetY = e.clientY - el.offsetTop;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                el.style.left = `${e.clientX - offsetX}px`;
                el.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        el.addEventListener('touchstart', (e) => {
            isDragging = true;
            const touch = e.touches[0];
            offsetX = touch.clientX - el.offsetLeft;
            offsetY = touch.clientY - el.offsetTop;
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const touch = e.touches[0];
                el.style.left = `${touch.clientX - offsetX}px`;
                el.style.top = `${touch.clientY - offsetY}px`;
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.altKey && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3];
            const speed = speeds[parseInt(e.key) - 1];
            if (speed) {
                setVideoSpeed(speed);
                updateActiveButton(null, speed);
            }
        }
    });

})();


// ------------------------ function FLOW


/*
1. Why IIFE ?
to avoid polluting the global scope,
functions defined here including speedController, currentVideo
are local to the functiojn and do nnot need to interfere wirh the other
scripts on youtube or browser, so keep them local

2. 'use strict' is something new i learnt, basically it prevents silent errors like 
undeclared variables, etc

3. Dom Controller variables
    1. speedConroller => to store the UI panel so we dont duplicate it
    2. currentVideo => to store the current vdeo elemenr on youtube tab we are in

4. createSpeedController()
    1. ccuilds a custom HTML panel using innerHTML (again dom)
    2. buttons add for various speeds (already ther for users to choose from)
    3. option to use custom speed between (0.1 abd 10.0)

5. addEventListeners()\
    1. press speed buttons => update playback speed
    2. custom input => to apply custom speed

6. setVideoSpeed(speed)
    uses playbackRate property of 'video' element

7. updateActiveButton(clickedBtn, customSpeed)
    add and remove the active class on the button selected or when changed to shift speed control

8. waitForVideo()
    1. search for 'video' elemet (dom)
    2. if navigate between videos, reinitialise the controller making it dynamic

9. innit()
    1. use setInterval to keep checking for new video (here qwith a internval of 1 sec)
    2. MutationObserver to detect changes in url ot dom

10. keydown handler (shortcut key)
    1. aloowing user to press Alt + (1 - 9) to quixkly switch speeds 

*/



/*

Browser loads script → IIFE is immediately invoked
                        ↓
                    init() is called
                        ↓
          Sets up interval + MutationObserver
                        ↓
           waitForVideo() called every 1 second
                        ↓
   If video found → createSpeedController() called
                        ↓
         Adds DOM + addEventListeners() triggered
                        ↓
     User interactions or keyboard triggers setVideoSpeed()


*/