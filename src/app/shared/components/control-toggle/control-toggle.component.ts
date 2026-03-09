import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lc-control-toggle',
  standalone: true,
  template: `
    <div class="toggle-group" role="group" [attr.aria-label]="label()">
      <span class="toggle-group__label">{{ label() }}</span>
      <div class="toggle-group__options">
        @for (option of options(); track option) {
          <button
            class="toggle-group__btn"
            type="button"
            [class.toggle-group__btn--active]="value() === option"
            (click)="valueChange.emit(option)"
          >
            {{ option }}
          </button>
        }
      </div>
    </div>
  `,
  styles: `
    @use 'styles/tokens' as t;

    .toggle-group {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .toggle-group__label {
      font-size: 0.75rem;
      font-family: t.$font-mono;
      color: t.$color-text-secondary;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .toggle-group__options {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .toggle-group__btn {
      padding: 0.25rem 0.625rem;
      border: 1px solid t.$color-border;
      border-radius: t.$radius-sm;
      background: transparent;
      color: t.$color-text-secondary;
      font-size: 0.8rem;
      font-family: t.$font-mono;
      transition: background 0.15s, color 0.15s, border-color 0.15s;

      &:hover {
        border-color: t.$color-accent;
        color: t.$color-accent;
      }

      &--active {
        background: t.$color-accent;
        border-color: t.$color-accent;
        color: #fff;
      }
    }
  `,
})
/**
 * Reusable button-group control.
 * Renders a labelled row of pill buttons where exactly one can be active at a time.
 * Fully stateless — the parent owns the selected value and updates it via `valueChange`.
 */
export class ControlToggleComponent {
  /** Accessible label shown above the button group (e.g. "flex-direction"). */
  readonly label = input.required<string>();

  /** The list of string options to render as individual buttons. */
  readonly options = input.required<string[]>();

  /** Currently selected value — the matching button receives the active style. */
  readonly value = input.required<string>();

  /** Emits the clicked option string so the parent can update its signal. */
  readonly valueChange = output<string>();
}
