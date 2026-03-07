import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

@Component({
  selector: 'lc-flex-shrink-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent],
  template: `
    <lc-property-demo
      property="flex-shrink"
      description="Defines how much an item will shrink relative to siblings when the container is too small to fit everyone at their natural size. 0 means the item refuses to shrink — it will overflow instead."
      appliesTo="flex item"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-slider
          label="Box 1 flex-shrink"
          [value]="shrink1()"
          [min]="0"
          [max]="4"
          (valueChange)="shrink1.set($event)"
        />
        <lc-control-slider
          label="Box 2 flex-shrink"
          [value]="shrink2()"
          [min]="0"
          [max]="4"
          (valueChange)="shrink2.set($event)"
        />
        <lc-control-slider
          label="Box 3 flex-shrink"
          [value]="shrink3()"
          [min]="0"
          [max]="4"
          (valueChange)="shrink3.set($event)"
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
export class FlexShrinkDemoComponent {
  protected readonly shrink1 = signal(1);
  protected readonly shrink2 = signal(1);
  protected readonly shrink3 = signal(1);

  // Wide flex-basis forces the container to be overcrowded so shrink is visible
  protected readonly containerStyle = {
    display: 'flex',
    gap: '8px',
    padding: '12px',
    'align-items': 'center',
    overflow: 'hidden',
  };

  // 3 × 300px = 900px > container width, so items MUST shrink — ratio controls who gives more
  protected readonly boxes = computed(() => [
    { style: { 'flex-basis': '300px', 'flex-shrink': String(this.shrink1()), 'min-height': '64px' } },
    { style: { 'flex-basis': '300px', 'flex-shrink': String(this.shrink2()), 'min-height': '64px' } },
    { style: { 'flex-basis': '300px', 'flex-shrink': String(this.shrink3()), 'min-height': '64px' } },
  ]);

  protected readonly css = computed(
    () =>
      `/* flex-basis: 300px on all items */\n` +
      `.box-1 { flex-shrink: ${this.shrink1()}; } ` +
      `.box-2 { flex-shrink: ${this.shrink2()}; } ` +
      `.box-3 { flex-shrink: ${this.shrink3()}; }`
  );
}
