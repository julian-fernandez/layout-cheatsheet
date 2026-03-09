import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

@Component({
  selector: 'lc-grid-auto-columns-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent],
  template: `
    <lc-property-demo
      property="grid-auto-columns"
      description="Controls the size of implicitly-created columns — columns the browser generates when items overflow the explicit grid template. Here, 'grid-auto-flow: column' forces each new item into a new column. Items 1–2 land in the 2 explicit 100px columns; items 3–5 create implicit columns sized by this slider."
      appliesTo="grid container"
      [cssOutput]="css()"
    >
      <lc-control-slider
        controls
        label="grid-auto-columns"
        [value]="autoColWidth()"
        [min]="40"
        [max]="160"
        [step]="10"
        unit="px"
        (valueChange)="autoColWidth.set($event)"
      />
      <lc-preview-box
        preview
        [containerStyle]="containerStyle()"
        [boxes]="boxes"
      />
    </lc-property-demo>
  `,
})
export class GridAutoColumnsDemoComponent {
  /** Width in px for implicitly created column tracks. */
  protected readonly autoColWidth = signal(60);

  // 5 items in a 2-explicit-column grid: items 1–2 land in the explicit 100px columns,
  // items 3–5 spill into implicit columns whose width is controlled by this slider.
  protected readonly boxes = [{}, {}, {}, {}, {}];

  /**
   * grid-auto-flow: column forces each item into a new column track,
   * making explicit vs implicit track sizing clearly visible.
   * overflow-x: auto ensures items are accessible even when implicit columns exceed the container.
   */
  protected readonly containerStyle = computed(() => ({
    display: 'grid',
    'grid-template-columns': 'repeat(2, 100px)',
    'grid-auto-flow': 'column',
    'grid-auto-columns': `${this.autoColWidth()}px`,
    gap: '8px',
    padding: '12px',
    'overflow-x': 'auto',
  }));

  /** Derives the CSS snippet. The comment in the output clarifies explicit vs implicit tracks. */
  protected readonly css = computed(
    () =>
      `display: grid;\ngrid-template-columns: repeat(2, 100px); /* explicit */\ngrid-auto-flow: column;\ngrid-auto-columns: ${this.autoColWidth()}px; /* implicit columns */`,
  );
}
