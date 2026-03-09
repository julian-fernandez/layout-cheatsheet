import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

@Component({
  selector: 'lc-grid-template-rows-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent],
  template: `
    <lc-property-demo
      property="grid-template-rows"
      description="Explicitly sets the height of each row track in pixels. Unlike columns, rows don't auto-size to fill width — they size to content by default. Defining explicit heights gives you rigid, predictable rows."
      appliesTo="grid container"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-slider
          label="Row 1 height"
          [value]="row1()"
          [min]="30"
          [max]="160"
          [step]="10"
          unit="px"
          (valueChange)="row1.set($event)"
        />
        <lc-control-slider
          label="Row 2 height"
          [value]="row2()"
          [min]="30"
          [max]="160"
          [step]="10"
          unit="px"
          (valueChange)="row2.set($event)"
        />
        <lc-control-slider
          label="Row 3 height"
          [value]="row3()"
          [min]="30"
          [max]="160"
          [step]="10"
          unit="px"
          (valueChange)="row3.set($event)"
        />
      </div>
      <lc-preview-box
        preview
        [containerStyle]="containerStyle()"
        [boxes]="boxes"
      />
    </lc-property-demo>
  `,
})
export class GridTemplateRowsDemoComponent {
  /** Height in px for the first explicit row track. */
  protected readonly row1 = signal(60);
  /** Height in px for the second explicit row track. */
  protected readonly row2 = signal(100);
  /** Height in px for the third explicit row track. */
  protected readonly row3 = signal(60);

  // 6 items in a 2-column grid fills exactly 3 rows — one item per explicit row track.
  protected readonly boxes = [{}, {}, {}, {}, {}, {}];

  /**
   * grid-template-columns: 2 columns to keep the grid compact.
   * grid-template-rows: derives from the three independent height signals.
   */
  protected readonly containerStyle = computed(() => ({
    display: 'grid',
    'grid-template-columns': 'repeat(2, 1fr)',
    'grid-template-rows': `${this.row1()}px ${this.row2()}px ${this.row3()}px`,
    gap: '8px',
    padding: '12px',
  }));

  /** Derives the CSS snippet shown in the code footer. */
  protected readonly css = computed(
    () =>
      `grid-template-rows: ${this.row1()}px ${this.row2()}px ${this.row3()}px;`
  );
}
