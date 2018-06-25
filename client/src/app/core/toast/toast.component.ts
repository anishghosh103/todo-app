import { Component, OnInit, trigger, transition, style, animate, keyframes } from '@angular/core';
import { ToastService } from '../toast.service';
import { query } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnim', [
      transition('state1 <=> state2', [
        animate('300ms ease-in', keyframes([
          style({transform: 'translateX(-5px)', offset: 0}),
          style({transform: 'translateX(5px)', offset: 0.25}),
          style({transform: 'translateX(-5px)',  offset: 0.5}),
          style({transform: 'translateX(5px)',  offset: 0.75}),
          style({transform: 'translateX(0)',     offset: 1.0}),
        ]))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ]),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {

  valid = false;
  type = '';
  message = '';
  timer = null;
  state = 'state1';

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toast$.subscribe(
      (data: any) => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.type = data.type;
        this.message = data.message;
        this.state = this.state === 'state1' || this.state === 'hidden' ? 'state2' : 'state1';
        this.valid = true;
        this.timer = setTimeout(() => this.valid = false, 3000);
      }
    );
  }

  close() {
    if (this.timer) { clearTimeout(this.timer); }
    this.valid = false;
  }

}
