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
      property="gap"
      description="Sets the space between flex (or grid) items. Replaces the old margin hacks. You can set row-gap and column-gap independently, or use a single 'gap' shorthand for both."
      appliesTo="flex container / grid container"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-slider
          label="gap"
          [value]="gap()"
          [min]="0"
          [max]="48"
          [step]="4"
          unit="px"
          (valueChange)="gap.set($event)"
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
  protected readonly gap = signal(8);
  protected readonly boxes = [{}, {}, {}, {}];

  protected readonly containerStyle = computed(() => ({
    display: 'flex',
    'flex-wrap': 'wrap',
    gap: `${this.gap()}px`,
    padding: '12px',
  }));

  protected readonly css = computed(() => `display: flex; gap: ${this.gap()}px;`);
}
