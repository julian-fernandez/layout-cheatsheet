import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lc-control-select',
  standalone: true,
  template: `
    <div class="select-ctrl">
      <label class="select-ctrl__label" [for]="id()">{{ label() }}</label>
      <select
        class="select-ctrl__select"
        [id]="id()"
        [value]="value()"
        (change)="onChange($event)"
      >
        @for (option of options(); track option) {
          <option [value]="option">{{ option }}</option>
        }
      </select>
    </div>
  `,
  styles: `
    @use 'styles/tokens' as t;

    .select-ctrl {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .select-ctrl__label {
      font-size: 0.75rem;
      font-family: t.$font-mono;
      color: t.$color-text-secondary;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .select-ctrl__select {
      padding: 0.375rem 0.625rem;
      background: t.$color-surface-raised;
      border: 1px solid t.$color-border;
      border-radius: t.$radius-sm;
      color: t.$color-text-primary;
      font-size: 0.875rem;
      font-family: t.$font-mono;
      cursor: pointer;
      outline: none;
      transition: border-color 0.15s;

      &:focus {
        border-color: t.$color-accent;
      }

      option {
        background: t.$color-surface-raised;
      }
    }
  `,
})
/**
 * Reusable native <select> dropdown.
 * Stateless: reflects `value` from the parent and emits the new selection via `valueChange`.
 * The `id` input wires the <label> to the <select> element for accessibility.
 */
export class ControlSelectComponent {
  /** Unique HTML id linking the <label> to the <select> — required for accessibility. */
  readonly id = input.required<string>();

  /** Label text displayed above the dropdown. */
  readonly label = input.required<string>();

  /** Options rendered as <option> elements inside the <select>. */
  readonly options = input.required<string[]>();

  /** Currently selected value — pre-selects the matching <option>. */
  readonly value = input.required<string>();

  /** Emits the newly selected string on change so the parent signal can be updated. */
  readonly valueChange = output<string>();

  /**
   * Native `change` events carry string values.
   * Casts to HTMLSelectElement and emits the selected value.
   */
  protected onChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.valueChange.emit(select.value);
  }
}
