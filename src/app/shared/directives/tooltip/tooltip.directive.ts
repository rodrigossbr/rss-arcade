import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[rss-tooltip]'
})
export class TooltipDirective {
  @Input('rss-tooltip') tooltipText: string = '';
  @Input('rss-tooltip-pos') position: TooltipPosition = 'top';

  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.tooltipText) return;
    this.createTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.removeTooltip();
  }

  private createTooltip() {
    // 1. Criar o elemento
    this.tooltipElement = this.renderer.createElement('span');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltipElement, text);

    // 2. Adicionar classes e estilos
    this.renderer.addClass(this.tooltipElement, 'rss-tooltip-ui');
    this.renderer.addClass(this.tooltipElement, `tooltip-${this.position}`);
    this.renderer.appendChild(document.body, this.tooltipElement);

    // 3. Posicionar
    this.setPosition();
  }

  private setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltipElement!.getBoundingClientRect();

    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.position === 'top') {
      top = hostPos.top - tooltipPos.height - 10;
      left = (hostPos.left + 12) + (hostPos.width - tooltipPos.width) / 2;
    } else if (this.position === 'bottom') {
      top = hostPos.bottom + 10;
      left = (hostPos.left + 12) + (hostPos.width - tooltipPos.width) / 2;
    } else if (this.position === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - 5;
    } else {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + 30;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }

  private removeTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
