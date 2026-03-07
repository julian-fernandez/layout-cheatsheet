import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

@Component({
  selector: 'lc-grid-column-span-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent],
  template: `
    <lc-property-demo
      property="grid-column / grid-row"
      description="Controls how many columns or rows an item spans. 'grid-column: span 2' means the item takes up 2 column tracks. This is how you build asymmetric grid layouts."
      appliesTo="grid item"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-slider
          label="Box 1 column span"
          [value]="span()"
          [min]="1"
          [max]="3"
          (valueChange)="span.set($event)"
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
export class GridColumnSpanDemoComponent {
  protected readonly span = signal(2);

  protected readonly containerStyle = {
    display: 'grid',
    'grid-template-columns': 'repeat(3, 1fr)',
    gap: '8px',
    padding: '12px',
  };

  protected readonly boxes = computed(() => [
    { style: { 'grid-column': `span ${this.span()}` } },
    {},
    {},
    {},
    {},
  ]);

  protected readonly css = computed(() => `.item-1 { grid-column: span ${this.span()}; }`);
}
