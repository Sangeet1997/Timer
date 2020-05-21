class Timer{
    constructor(durationInput,startButton,pauseButton,callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        
        //only executes if callbacks is present
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener("click",this.start);
        this.pauseButton.addEventListener("click",this.pause);
    }



    start = () => {
        //if callback is present
        if(this.onStart){
            //this is "timeRemaining" when start button is pressed
            //therefore this sends the total time
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick,10);
    }

    tick = () => {
        
        if(this.timeRemaining>0){

            if(this.onTick)
            {
                this.onTick(this.timeRemaining);
            }
            
            this.timeRemaining = this.timeRemaining - 0.01 ;
            console.log('tick');
        }
        else{
            if(this.onComplete)
            {
                this.onComplete();
            }
            this.pause();
        }
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time){
        //setting to 2 decimal places
        this.durationInput.value = time.toFixed(2);
    }

    pause = () => {
        if(this.onComplete)
        {
            this.onComplete();
        }
        clearInterval(this.interval);
    }
}
