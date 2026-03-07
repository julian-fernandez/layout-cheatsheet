import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

@Component({
  selector: 'lc-order-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent],
  template: `
    <lc-property-demo
      property="order"
      description="Changes the visual order of a flex item without altering the DOM. Lower values appear first. Default is 0. Negative values are valid — useful for moving items to the front."
      appliesTo="flex item"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-slider
          label="Box 1 order"
          [value]="order1()"
          [min]="-2"
          [max]="3"
          (valueChange)="order1.set($event)"
        />
        <lc-control-slider
          label="Box 2 order"
          [value]="order2()"
          [min]="-2"
          [max]="3"
          (valueChange)="order2.set($event)"
        />
        <lc-control-slider
          label="Box 3 order"
          [value]="order3()"
          [min]="-2"
          [max]="3"
          (valueChange)="order3.set($event)"
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
export class OrderDemoComponent {
  protected readonly order1 = signal(0);
  protected readonly order2 = signal(0);
  protected readonly order3 = signal(0);

  protected readonly containerStyle = {
    display: 'flex',
    gap: '8px',
    padding: '12px',
    'align-items': 'center',
  };

  protected readonly boxes = computed(() => [
    { style: { order: String(this.order1()), 'min-height': '64px' } },
    { style: { order: String(this.order2()), 'min-height': '64px' } },
    { style: { order: String(this.order3()), 'min-height': '64px' } },
  ]);

  protected readonly css = computed(
    () =>
      `.box-1 { order: ${this.order1()}; } ` +
      `.box-2 { order: ${this.order2()}; } ` +
      `.box-3 { order: ${this.order3()}; }`
  );
}
