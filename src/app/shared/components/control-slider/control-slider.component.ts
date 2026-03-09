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
/**
 * Reusable range-slider control.
 * Stateless: reflects `value` from the parent and emits numeric changes via `valueChange`.
 * Displays the live value next to the label and min/max bounds below the track.
 */
export class ControlSliderComponent {
  /** Label shown above the slider (e.g. "column-gap"). */
  readonly label = input.required<string>();

  /** Current numeric value — reflected directly onto the native range input. */
  readonly value = input.required<number>();

  /** Minimum allowed value. Defaults to 0. */
  readonly min = input(0);

  /** Maximum allowed value. Defaults to 10. */
  readonly max = input(10);

  /** Step increment between slider positions. Defaults to 1. */
  readonly step = input(1);

  /** Optional unit suffix appended to the displayed value (e.g. "px", "fr"). */
  readonly unit = input('');

  /** Emits the new numeric value whenever the slider moves. */
  readonly valueChange = output<number>();

  /**
   * Native `input` events always carry string values.
   * This handler casts the string to a Number before emitting
   * so parent signals can stay typed as `number`.
   */
  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(Number(input.value));
  }
}
