import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

@Component({
  selector: 'lc-grid-auto-rows-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent],
  template: `
    <lc-property-demo
      property="grid-auto-rows"
      description="Controls the height of implicitly-created row tracks — rows the browser generates when items overflow the explicit grid template. With no grid-template-rows defined, every row is implicit and is sized by this value."
      appliesTo="grid container"
      [cssOutput]="css()"
    >
      <lc-control-slider
        controls
        label="grid-auto-rows"
        [value]="rowHeight()"
        [min]="40"
        [max]="160"
        [step]="10"
        unit="px"
        (valueChange)="rowHeight.set($event)"
      />
      <lc-preview-box
        preview
        [containerStyle]="containerStyle()"
        [boxes]="boxes"
      />
    </lc-property-demo>
  `,
})
export class GridAutoRowsDemoComponent {
  /** Height in px for all implicitly created row tracks. */
  protected readonly rowHeight = signal(60);

  // 6 items in a 3-column grid → 2 rows, both implicit (no grid-template-rows set).
  // Adjusting the slider uniformly changes every row's height.
  protected readonly boxes = [{}, {}, {}, {}, {}, {}];

  /**
   * No grid-template-rows is set, so all rows are implicit and sized by grid-auto-rows.
   * This makes the effect immediately visible — every row reacts to the slider.
   */
  protected readonly containerStyle = computed(() => ({
    display: 'grid',
    'grid-template-columns': 'repeat(3, 1fr)',
    'grid-auto-rows': `${this.rowHeight()}px`,
    gap: '8px',
    padding: '12px',
  }));

  /** Derives the CSS snippet shown in the code footer. */
  protected readonly css = computed(
    () => `grid-auto-rows: ${this.rowHeight()}px; /* implicit row height */`,
  );
}
