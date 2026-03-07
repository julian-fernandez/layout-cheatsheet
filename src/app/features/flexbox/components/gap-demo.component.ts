import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

@Component({
  selector: 'lc-gap-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent],
  template: `
    <lc-property-demo
      property="row-gap / column-gap"
      description="Controls spacing between items independently on each axis. 'gap' is the shorthand for both. Works on flex (when wrapping) and grid — replaces the old margin-based spacing hacks. Try increasing row-gap with flex-wrap active to see it affect wrapped rows."
      appliesTo="flex container / grid container"
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
export class GapDemoComponent {
  protected readonly colGap = signal(8);
  protected readonly rowGap = signal(8);
  protected readonly boxes = [{}, {}, {}, {}, {}, {}];

  protected readonly containerStyle = computed(() => ({
    display: 'flex',
    'flex-wrap': 'wrap',
    'column-gap': `${this.colGap()}px`,
    'row-gap': `${this.rowGap()}px`,
    padding: '12px',
  }));

  protected readonly css = computed(
    () =>
      `display: flex;\nflex-wrap: wrap;\ncolumn-gap: ${this.colGap()}px;\nrow-gap: ${this.rowGap()}px;`,
  );
}
