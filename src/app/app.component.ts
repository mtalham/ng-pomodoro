import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-pomodoro';
  time = 0;
  play = false;
  timeType = 0;
  private readonly formatTypes = [
    {type: 'code', time: 1500},
    {type: 'social', time: 300},
    {type: 'coffee', time: 900}
  ];
  interval = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.setDefaultTime();
    // this.startShortcuts();
    // Notification.requestPermission();
  }


  elapseTime(): void {
    if (this.time === 0) {
      this.reset(0);
      // this.alert();
    }
    if (this.play) {
      this.time = this.time - 1;
      this.title = this.getTitle(this.time);
    }
  }

  format(seconds: number): string {
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  formatType(timeType: number): string | null {
    for (const timeObj of this.formatTypes) {
      if (timeObj.time === timeType) {
        return timeObj.type;
      }
    }
    return null;
  }

  restartInterval(): void {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
  }

  handlePlay(): void {
    if (this.play) {
      return;
    }

    this.restartInterval();
    this.play = true;
  }

  reset(resetFor = this.time): void {
    clearInterval(this.interval);
    // let time = this.format(resetFor);
    this.play = false;
  }

  // togglePlay() {
  //   if (true === play) {
  //     return this.reset();
  //   }
  //
  //   return this.play();
  // }

  setTime(newTime: number): void {
    this.restartInterval();
    this.time = newTime;
    this.timeType = newTime;
    this.title = this.getTitle(newTime);
    this.play = true;
  }

  setDefaultTime(): void {
    this.time = 1500;
    this.timeType = 1500;
    this.title = this.getTitle(1500);
    this.play = false;
  }

  getTitle(time: number): string {
    time = typeof time === 'undefined' ? this.time : time;
    return this.format(time) + ' | Pomodoro timer';
  }

  // startShortcuts() {
  //   Mousetrap.bind('space', this.togglePlay.bind(this));
  //   Mousetrap.bind(['ctrl+left', 'meta+left'], this.toggleMode.bind(this, -1));
  //   Mousetrap.bind(['ctrl+right', 'meta+right'], this.toggleMode.bind(this, 1));
  // }
  //
  // toggleMode(gotoDirection) {
  //   let timeTypes = this.getFormatTypes();
  //   let currentPosition = -1;
  //
  //
  //   for (let i = 0; i < timeTypes.length; i++) {
  //     if (timeTypes[i].time === timeType) {
  //       currentPosition = i;
  //       break;
  //     }
  //
  //   }
  //
  //
  //   if (currentPosition !== -1) {
  //     let newMode = timeTypes[currentPosition + gotoDirection];
  //     if (newMode) {
  //       this.setTime(newMode.time);
  //     }
  //   }
  //
  // }

  // setLocalStorage(item, element) {
  //   let value = element.target.checked;
  //   localStorage.setItem('ng-pomodoro-' + item, value);
  // }
  //
  // getLocalStorage(item) {
  //   return (localStorage.getItem('ng-pomodoro-' + item) == 'true') ? true : false;
  // }

  // alert() {
  //   // vibration
  //   if (this.refs.vibrate.checked) {
  //     window.navigator.vibrate(1000);
  //   }
  //   // audio
  //   if (this.refs.audio.checked) {
  //     let audio = new Audio('songs/alarm.mp3');
  //     audio.play();
  //     setTimeout(() => audio.pause(), 1400);
  //   }
  //   // notification
  //   if (this.refs.notification.checked) {
  //     if (timeType === 1500) {
  //       let notification = new Notification('Relax :)', {
  //         icon: 'img/coffee.png',
  //         lang: 'en',
  //         body: 'Go talk or drink a coffee.'
  //       });
  //     } else {
  //       let notification = new Notification('The time is over!', {
  //         icon: 'img/code.png',
  //         lang: 'en',
  //         body: "Hey, back to code!"
  //       });
  //     }
  //   }
  // }
}
