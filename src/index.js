import './styles.css';


class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.timerId = null;
        this.days = document.querySelector(`${selector} [data-value="days"]`);
        this.hours = document.querySelector(`${selector} [data-value="hours"]`);
        this.minutes = document.querySelector(`${selector} [data-value="mins"]`);
        this.seconds = document.querySelector(`${selector} [data-value="secs"]`);
        this.startTimer();
       
    }

    startTimer() {
        this.getTime();
        this.timerId = setInterval(() => {
            this.getTime();
        }, 1000);
        
    };

    getTime() {
        const time = new Date(this.targetDate) - Date.now();
        const leftTime = this.timerComponents(time);
        this.timerInterface(leftTime);
    }

    timerComponents(date) {
        const days = Math.floor(date / (1000 * 60 * 60 * 24));
        const hours = Math.floor((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((date % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((date % (1000 * 60)) / 1000);

        if (days < 0 || hours < 0 || mins < 0 || secs < 0) {
            clearInterval(this.timerId);
            return {days: "00", hours: "00", mins: "00", secs: "00"}
        }
        
        if (days === 0 && hours === 0 && mins === 0 && secs === 0) {
            clearInterval(this.timerId);
        }
        
        return { days, hours, mins, secs }; 
    }

    timerInterface(timeData) {
        this.days.textContent = String(timeData.days).padStart(2, '0');
        this.hours.textContent = String(timeData.hours).padStart(2, '0');
        this.minutes.textContent = String(timeData.mins).padStart(2, '0');
        this.seconds.textContent = String(timeData.secs).padStart(2, '0');
    }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2021'),
});

timer.start();