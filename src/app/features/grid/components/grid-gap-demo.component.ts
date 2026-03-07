import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

@Component({
  selector: 'lc-grid-gap-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent],
  template: `
    <lc-property-demo
      property="row-gap / column-gap"
      description="Controls spacing between rows and columns independently. 'gap' is shorthand for both. Unlike margins, gap only applies between items — never on the outer edges."
      appliesTo="grid container"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-slider
          label="column-gap"
          [value]="colGap()"
          [min]="0"
          [max]="48"
          [step]="4"
          unit="px"
          (valueChange)="colGap.set($event)"
        />
        <lc-control-slider
          label="row-gap"
          [value]="rowGap()"
          [min]="0"
          [max]="48"
          [step]="4"
          unit="px"
          (valueChange)="rowGap.set($event)"
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
export class GridGapDemoComponent {
  protected readonly colGap = signal(8);
  protected readonly rowGap = signal(8);
  protected readonly boxes = [{}, {}, {}, {}, {}, {}];

  protected readonly containerStyle = computed(() => ({
    display: 'grid',
    'grid-template-columns': 'repeat(3, 1fr)',
    'column-gap': `${this.colGap()}px`,
    'row-gap': `${this.rowGap()}px`,
    padding: '12px',
  }));

  protected readonly css = computed(
    () => `column-gap: ${this.colGap()}px; row-gap: ${this.rowGap()}px;`
  );
}
