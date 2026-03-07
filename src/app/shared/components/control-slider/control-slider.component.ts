import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lc-control-slider',
  standalone: true,
  template: `
    <div class="slider">
      <div class="slider__header">
        <span class="slider__label">{{ label() }}</span>
        <span class="slider__value">{{ value() }}{{ unit() }}</span>
      </div>
      <input
        class="slider__input"
        type="range"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="value()"
        (input)="onInput($event)"
      />
      <div class="slider__range-labels">
        <span>{{ min() }}{{ unit() }}</span>
        <span>{{ max() }}{{ unit() }}</span>
      </div>
    </div>
  `,
  styles: `
    @use 'styles/tokens' as t;

    .slider {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .slider__header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .slider__label {
      font-size: 0.75rem;
      font-family: t.$font-mono;
      color: t.$color-text-secondary;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .slider__value {
      font-size: 0.875rem;
      font-family: t.$font-mono;
      color: t.$color-accent;
      font-weight: 600;
    }

    .slider__input {
      width: 100%;
      height: 4px;
      cursor: pointer;
    }

    .slider__range-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.7rem;
      color: t.$color-text-muted;
      font-family: t.$font-mono;
    }
  `,
})
export class ControlSliderComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly min = input(0);
  readonly max = input(10);
  readonly step = input(1);
  readonly unit = input('');
  readonly valueChange = output<number>();

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(Number(input.value));
  }
}
