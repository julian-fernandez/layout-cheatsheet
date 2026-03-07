import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

@Component({
  selector: 'lc-flex-grow-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent],
  template: `
    <lc-property-demo
      property="flex-grow"
      description="Defines how much a flex item grows relative to its siblings when free space is available. A value of 2 means it takes twice as much free space as a sibling with value 1. 0 means it won't grow at all."
      appliesTo="flex item"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-slider
          label="Box 1 flex-grow"
          [value]="grow1()"
          [min]="0"
          [max]="4"
          (valueChange)="grow1.set($event)"
        />
        <lc-control-slider
          label="Box 2 flex-grow"
          [value]="grow2()"
          [min]="0"
          [max]="4"
          (valueChange)="grow2.set($event)"
        />
        <lc-control-slider
          label="Box 3 flex-grow"
          [value]="grow3()"
          [min]="0"
          [max]="4"
          (valueChange)="grow3.set($event)"
        />
      </div>
      <lc-preview-box
        preview
        [containerStyle]="containerStyle"
        [boxes]="boxes()"
      />
    </lc-property-demo>
  `,
})
export class FlexGrowDemoComponent {
  protected readonly grow1 = signal(1);
  protected readonly grow2 = signal(1);
  protected readonly grow3 = signal(1);

  protected readonly containerStyle = {
    display: 'flex',
    gap: '8px',
    padding: '12px',
    'align-items': 'center',
  };

  protected readonly boxes = computed(() => [
    { style: { 'flex-grow': String(this.grow1()), 'min-height': '64px' } },
    { style: { 'flex-grow': String(this.grow2()), 'min-height': '64px' } },
    { style: { 'flex-grow': String(this.grow3()), 'min-height': '64px' } },
  ]);

  protected readonly css = computed(
    () =>
      `.box-1 { flex-grow: ${this.grow1()}; } ` +
      `.box-2 { flex-grow: ${this.grow2()}; } ` +
      `.box-3 { flex-grow: ${this.grow3()}; }`
  );
}
