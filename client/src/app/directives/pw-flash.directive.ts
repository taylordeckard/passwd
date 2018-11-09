import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EmbeddedViewRef,
  HostListener, Injector, Input, OnDestroy, Renderer2,
} from '@angular/core';
import { PwFlashComponent } from 'app/components';

@Directive({
  selector: '[pwFlash]',
})
export class PwFlashDirective implements OnDestroy {
  @Input() message: string;
  componentRef: ComponentRef<PwFlashComponent>;
  @HostListener('click', ['$event'])
  onClick (event: MouseEvent) {
    this.appendTooltipToBody(event);
  }
  @HostListener('click', ['$event'])
  onTouchStart (event: TouchEvent) {
    this.appendTooltipToBody(event);
  }
  constructor (
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private elem: ElementRef,
    private renderer: Renderer2,
  ) {}

  appendTooltipToBody (event: MouseEvent | TouchEvent) {
    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }
    this.removeTooltip();

    // 1. Create a component reference from the component
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(PwFlashComponent)
      .create(this.injector);
    this.componentRef.instance.message = this.message;
    this.componentRef.instance.positionX = clientX;
    this.componentRef.instance.positionY = clientY;

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);

    // 3. Get DOM element from component
    const domElem: HTMLElement = (<EmbeddedViewRef<any>>this.componentRef.hostView)
      .rootNodes[0];

    // 4. Insert the flash above the host element
    document.body.appendChild(domElem);

    // 5. Show the flash for a second and then remove it
    setTimeout(() => {
      this.renderer.setStyle(domElem, 'opacity', 1);
      this.renderer.setStyle(domElem, 'top', `${clientY - 50}px`);
      setTimeout(() => {
        this.renderer.setStyle(domElem, 'opacity', 0);
        this.renderer.setStyle(domElem, 'top', `${clientY - 46}px`);
        setTimeout(this.removeTooltip.bind(this), 600);
      }, 600);
    });
  }

  ngOnDestroy () {
    this.removeTooltip();
  }

  removeTooltip () {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }

}
