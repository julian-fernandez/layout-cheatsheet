import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

const OPTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];

@Component({
  selector: 'lc-flex-direction-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="flex-direction"
      description="Defines the main axis — the direction flex children are placed. 'row' goes left-to-right, 'column' goes top-to-bottom. The -reverse variants flip the order."
      appliesTo="flex container"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="flex-direction"
        [options]="options"
        [value]="value()"
        (valueChange)="value.set($event)"
      />
      <lc-preview-box
        preview
        [containerStyle]="containerStyle()"
      />
    </lc-property-demo>
  `,
})
export class FlexDirectionDemoComponent {
  /** Declared outside the class to avoid re-allocating the array on every change detection cycle. */
  protected readonly options = OPTIONS;

  /** Currently selected flex-direction value. Drives both the preview and CSS output. */
  protected readonly value = signal('row');

  /**
   * Derives the full inline style object applied to the preview container.
   * Angular re-evaluates this automatically whenever `value` changes —
   * no manual subscription or change detection trigger needed.
   */
  protected readonly containerStyle = computed(() => ({
    display: 'flex',
    'flex-direction': this.value(),
    gap: '8px',
    padding: '12px',
  }));

  /** Derives the CSS snippet shown in the code footer. Updates in sync with `containerStyle`. */
  protected readonly css = computed(() => `display: flex; flex-direction: ${this.value()};`);
}
