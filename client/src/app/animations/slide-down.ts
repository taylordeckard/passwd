import { animate, state, style, transition, trigger } from '@angular/animations';
export const slideDown = [
  // the slideDown
  trigger('slideDown', [
    // the "in" style determines the "resting" state of the element when it is visible.
    state('in', style({ opacity: 1 })),
    // fade in when created. this could also be written as transition('void => *')
    transition(
      ':enter',
      [style({ opacity: 0, transform: 'translateY(-100px)' }), animate('.3s ease-out')],
    ),
    // fade out when destroyed. this could also be written as transition('void => *')
    transition(':leave', animate(600, style({ opacity: 0 })))
  ])
];
