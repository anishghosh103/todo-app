import { Component, OnInit, HostListener } from '@angular/core';
import { EventService } from '../../core/event.service';
import { trigger, query, style, animate, group, transition } from '@angular/animations';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('* => *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' })),
        group([
          query(':enter', [
            style({ opacity: 0 }),
            animate('200ms')
          ], { optional: true }),
          query(':leave', [
            animate('100ms', style({ opacity: 0 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class RootComponent implements OnInit {

  private windowHeight = 0;

  @HostListener('click')
  onRootClicked() {
    this.eventService.globalEmit('root-component-clicked');
  }

  @HostListener('document:keyup', ['$event']) onHomeKeydown(e) {
    if (e.ctrlKey && e.keyCode === 90) {
      this.eventService.globalEmit('ctrl+z');
    }
  }

  constructor(
    private userService: UserService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.socketConnect(this.userService.userId);
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
