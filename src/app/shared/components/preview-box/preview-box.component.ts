import { Component, input } from '@angular/core';

const BOX_COLORS = ['#7c83ff', '#f472b6', '#4ade80', '#fbbf24', '#38bdf8', '#fb923c'];

@Component({
  selector: 'lc-preview-box',
  standalone: true,
  template: `
    <div class="preview-container" [style]="containerStyle()">
      @for (box of boxes(); track $index) {
        <div
          class="preview-item"
          [style.background]="BOX_COLORS[$index % BOX_COLORS.length]"
          [style]="box.style ?? {}"
        >
          {{ $index + 1 }}
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .preview-container {
      width: 100%;
      min-height: 160px;
      border: 1px dashed rgba(255,255,255,0.1);
      border-radius: 8px;
      transition: all 0.25s ease;
    }

    .preview-item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      min-height: 48px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.7);
      transition: all 0.25s ease;
    }
  `,
})
/**
 * Renders a set of numbered, coloured boxes whose layout reacts to style changes.
 * Used inside the `[preview]` slot of PropertyDemoComponent.
 *
 * `containerStyle` drives the layout under test (e.g. display:flex, gap, align-items).
 * Each box can receive per-item overrides via its optional `style` property,
 * enabling demos like flex-grow or align-self to target individual items.
 *
 * :host { display: block } is set so the component doesn't stay inline by default.
 */
export class PreviewBoxComponent {
  /**
   * Inline style object applied to the wrapper div.
   * The parent demo sets CSS layout properties here (display, flex-direction, etc.)
   * to drive whatever property is being demonstrated.
   */
  readonly containerStyle = input.required<Record<string, string>>();

  /**
   * Array of box descriptors — length controls how many boxes are rendered.
   * Each entry can include an optional `style` object for per-item CSS overrides.
   * Defaults to four plain boxes when not provided.
   */
  readonly boxes = input<{ style?: Record<string, string> }[]>([
    {}, {}, {}, {},
  ]);

  /** Fixed colour palette cycled through by box index using modulo. */
  protected readonly BOX_COLORS = BOX_COLORS;
}
