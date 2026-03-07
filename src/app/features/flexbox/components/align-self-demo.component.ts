import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

const OPTIONS = ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'];

@Component({
  selector: 'lc-align-self-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="align-self"
      description="Overrides align-items for a single item. Lets one child opt out of the container's cross-axis alignment without affecting its siblings."
      appliesTo="flex item"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="Box 2 align-self"
        [options]="options"
        [value]="value()"
        (valueChange)="value.set($event)"
      />
      <lc-preview-box
        preview
        [containerStyle]="containerStyle"
        [boxes]="boxes()"
      />
    </lc-property-demo>
  `,
})
export class AlignSelfDemoComponent {
  protected readonly options = OPTIONS;
  protected readonly value = signal('auto');

  protected readonly containerStyle = {
    display: 'flex',
    'align-items': 'flex-start',
    gap: '8px',
    padding: '12px',
    'min-height': '160px',
  };

  protected readonly boxes = computed(() => [
    { style: { 'min-height': '56px' } as Record<string, string> },
    { style: { 'align-self': this.value(), 'min-height': '56px' } as Record<string, string> },
    { style: { 'min-height': '56px' } as Record<string, string> },
  ]);

  protected readonly css = computed(() => `.box-2 { align-self: ${this.value()}; }`);
}
