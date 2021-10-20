import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "./auth/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  icon: string = 'volume_up';
  @ViewChild("themeSong") audio: ElementRef;
  volume: number = 0.2;

  constructor() {
  }

  ngAfterViewInit() {
    this.playBgMusic();
  }

  playBgMusic():void {
    if (!this.audio.nativeElement.playing) {
      let promise = this.audio.nativeElement.play();

      if (promise !== undefined) {
        promise.then(() => {
          // do nothing, autoplay started
        }).catch(() => {
          // catch error and present icons as if there is no music
          this.icon = 'volume_off';
          this.volume = 0;
        });
      }
    }
  }

  toggleMusic(): void {
    this.playBgMusic();

    if (this.icon == 'volume_up') {
      this.icon = 'volume_off';
      // this.audio.nativeElement.pause();
      this.volume = 0;
    } else {
      this.icon = 'volume_up';
      this.volume = 0.2;
    }
  }

}
