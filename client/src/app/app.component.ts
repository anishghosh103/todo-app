import { Component, OnInit } from '@angular/core';
import { EventService } from './core/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLoadingScreen = false;
  constructor(private eventService: EventService) {}
  ngOnInit() {
    this.eventService.globalListener('show-loading-screen', () => {
      this.showLoadingScreen = true;
    });
    this.eventService.globalListener('hide-loading-screen', () => {
      this.showLoadingScreen = false;
    });
  }
}
