import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private audio: HTMLAudioElement;
  constructor() {
    this.audio = new Audio();
    this.audio.src =
      '../../../../../assets/mixkit-happy-bells-notification-937_2.wav';
  }

  playNotificationSound(): void {
    this.audio.play();
  }
}
