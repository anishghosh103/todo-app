import { transition, trigger, stagger, style, animate, query, state } from '@angular/animations';

export const ListAnimation = trigger('listAnim', [
  transition('* => *', [
    query(':enter', style({ opacity: 0, transform: 'translateY(-20px)' }), { optional: true }),
    query(':enter', stagger('100ms', [
      style({ opacity: 0, transform: 'translateY(-20px)' }),
      animate('200ms')
    ]), { optional: true })
  ])
]);

export const CreateListAnimation = trigger('createListAnim', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms')
  ]),
  transition(':leave', [
    animate('150ms', style({ opacity: 0, position: 'fixed' }))
  ])
]);
