import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hotkeys} from './hotKeys.service';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  time = 0;
  play = false;
  timeType = 0;
  private readonly formatTypes = [
    {type: 'code', time: 1500},
    {type: 'social', time: 300},
    {type: 'coffee', time: 900}
  ];
  private interval = 0;
  private subs: Subscription;

  constructor(private hotKeys: Hotkeys, private titleService: Title) {
  }

  ngOnInit(): void {
    this.setDefaultTime();
    this.subs = this.hotKeys.addShortcut({keys: 'space'}).subscribe(e => {
      this.togglePlay();
    });
    // Notification.requestPermission();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.pause();
        // this.alert();
      }
      if (this.play) {
        this.time = this.time - 1;
        this.setTitle(this.time);
      }
    }, 1000);
  }

  handlePlay(): void {
    if (this.play) {
      return;
    }

    this.play = true;
    this.restartInterval();
  }

  pause(): void {
    clearInterval(this.interval);
    this.play = false;
  }

  togglePlay(): void {
    if (true === this.play) {
      return this.pause();
    }

    return this.handlePlay();
  }

  setTime(newTime: number): void {
    this.restartInterval();
    this.time = newTime;
    this.timeType = newTime;
    this.setTitle(newTime);
    this.play = true;
  }

  setDefaultTime(): void {
    this.time = 1500;
    this.timeType = 1500;
    this.setTitle(1500);
    this.play = false;
  }

  setTitle(time: number): void {
    time = typeof time === 'undefined' ? this.time : time;
    const title = this.format(time) + ' | Pomodoro timer';
    this.titleService.setTitle(title);
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
