import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

const OPTIONS = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'];

@Component({
  selector: 'lc-align-content-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="align-content"
      description="Like justify-content, but for the cross axis when there are multiple rows (i.e. when flex-wrap is active). Has no effect on a single-line flex container."
      appliesTo="flex container (multi-line)"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="align-content"
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
export class AlignContentDemoComponent {
  protected readonly options = OPTIONS;
  protected readonly value = signal('flex-start');
  protected readonly boxes = [
    { style: { 'min-width': '90px', height: '40px' } },
    { style: { 'min-width': '90px', height: '40px' } },
    { style: { 'min-width': '90px', height: '40px' } },
    { style: { 'min-width': '90px', height: '40px' } },
    { style: { 'min-width': '90px', height: '40px' } },
    { style: { 'min-width': '90px', height: '40px' } },
  ];

  protected readonly containerStyle = computed(() => ({
    display: 'flex',
    'flex-wrap': 'wrap',
    'align-content': this.value(),
    gap: '8px',
    padding: '12px',
    'min-height': '220px',
  }));

  protected readonly css = computed(
    () => `display: flex; flex-wrap: wrap; align-content: ${this.value()};`
  );
}
