import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

const OPTIONS = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'];

@Component({
  selector: 'lc-align-items-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="align-items"
      description="Controls alignment along the cross axis (perpendicular to the main axis). 'stretch' makes items fill the container height; 'center' centres them vertically."
      appliesTo="flex container"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="align-items"
        [options]="options"
        [value]="value()"
        (valueChange)="value.set($event)"
      />
      <lc-preview-box
        preview
        [containerStyle]="containerStyle()"
        [boxes]="boxes"
      />
    </lc-property-demo>
  `,
})
export class AlignItemsDemoComponent {
  protected readonly options = OPTIONS;
  protected readonly value = signal('stretch');

  // min-height (not height) so align-items:stretch can still override the cross-size.
  // With stretch, items fill the container. With other values, min-height becomes the intrinsic size.
  protected readonly boxes: { style: Record<string, string> }[] = [
    { style: { 'min-height': '40px' } },
    { style: { 'min-height': '80px' } },
    { style: { 'min-height': '52px' } },
    { style: { 'min-height': '64px' } },
  ];

  protected readonly containerStyle = computed(() => ({
    display: 'flex',
    'align-items': this.value(),
    gap: '8px',
    padding: '12px',
    'min-height': '160px',
  }));

  protected readonly css = computed(() => `display: flex; align-items: ${this.value()};`);
}
