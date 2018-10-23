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
  constructor (
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private elem: ElementRef,
    private renderer: Renderer2,
  ) {}

  appendTooltipToBody (mouseEvent: MouseEvent) {
    this.removeTooltip();

    // 1. Create a component reference from the component
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(PwFlashComponent)
      .create(this.injector);
    this.componentRef.instance.message = this.message;
    this.componentRef.instance.positionX = mouseEvent.clientX;
    this.componentRef.instance.positionY = mouseEvent.clientY;

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
      this.renderer.setStyle(domElem, 'top', `${mouseEvent.clientY - 50}px`);
      setTimeout(() => {
        this.renderer.setStyle(domElem, 'opacity', 0);
        this.renderer.setStyle(domElem, 'top', `${mouseEvent.clientY - 46}px`);
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
