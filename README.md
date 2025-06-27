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
