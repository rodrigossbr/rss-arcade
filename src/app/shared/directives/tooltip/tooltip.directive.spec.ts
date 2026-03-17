import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {TooltipDirective} from './tooltip.directive';

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: `
    <div id="default" [rss-tooltip]="'Texto do Tooltip'">Botão Padrão</div>
    <div id="bottom" [rss-tooltip]="'Tooltip em Baixo'" rss-tooltip-pos="bottom">Botão Bottom</div>
    <div id="empty" [rss-tooltip]="''">Sem Texto</div>
  `
})
class TestHostComponent {
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let des: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TooltipDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.directive(TooltipDirective));
  });

  afterEach(() => {
    const tooltips = document.querySelectorAll('.rss-tooltip-ui');
    tooltips.forEach(t => t.remove());
  });

  it('deve criar o elemento de tooltip no body ao entrar com o mouse', () => {
    const el = des[0].nativeElement;

    el.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    const tooltip = document.querySelector('.rss-tooltip-ui');
    expect(tooltip).toBeTruthy();
    expect(tooltip?.textContent).toBe('Texto do Tooltip');
  });

  it('deve aplicar a classe de posição correta (padrão top)', () => {
    const el = des[0].nativeElement;
    el.dispatchEvent(new MouseEvent('mouseenter'));

    const tooltip = document.querySelector('.rss-tooltip-ui');
    expect(tooltip?.classList.contains('tooltip-top')).toBe(true);
  });

  it('deve aplicar a classe de posição bottom quando especificado', () => {
    const el = des[1].nativeElement; // O elemento com rss-tooltip-pos="bottom"
    el.dispatchEvent(new MouseEvent('mouseenter'));

    const tooltip = document.querySelector('.rss-tooltip-ui');
    expect(tooltip?.classList.contains('tooltip-bottom')).toBe(true);
  });

  it('não deve criar o tooltip se o texto estiver vazio', () => {
    const el = des[2].nativeElement;
    el.dispatchEvent(new MouseEvent('mouseenter'));

    const tooltip = document.querySelector('.rss-tooltip-ui');
    expect(tooltip).toBeNull();
  });

  it('deve calcular a posição (top e left) e aplicar via renderer', () => {
    const el = des[0].nativeElement;
    el.dispatchEvent(new MouseEvent('mouseenter'));

    const tooltip = document.querySelector('.rss-tooltip-ui') as HTMLElement;

    expect(tooltip.style.top).toContain('px');
    expect(tooltip.style.left).toContain('px');
  });
});
