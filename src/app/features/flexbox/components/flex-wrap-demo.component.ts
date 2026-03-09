import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

const OPTIONS = ['nowrap', 'wrap', 'wrap-reverse'];

@Component({
  selector: 'lc-flex-wrap-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="flex-wrap"
      description="Controls whether children are forced onto one line or can wrap onto multiple lines. 'nowrap' squishes everything; 'wrap' lets items flow to the next row."
      appliesTo="flex container"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="flex-wrap"
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
export class FlexWrapDemoComponent {
  protected readonly options = OPTIONS;

  /** Currently selected flex-wrap value. */
  protected readonly value = signal('nowrap');

  // Items must be wide enough that 6 of them overflow the container, forcing wrapping
  protected readonly boxes = [
    { style: { 'min-width': '160px', 'min-height': '56px' } },
    { style: { 'min-width': '160px', 'min-height': '56px' } },
    { style: { 'min-width': '160px', 'min-height': '56px' } },
    { style: { 'min-width': '160px', 'min-height': '56px' } },
    { style: { 'min-width': '160px', 'min-height': '56px' } },
    { style: { 'min-width': '160px', 'min-height': '56px' } },
  ];

  /** Derives the container style object from the selected value. */
  protected readonly containerStyle = computed(() => ({
    display: 'flex',
    'flex-wrap': this.value(),
    gap: '8px',
    padding: '12px',
  }));

  /** Derives the CSS snippet shown in the code footer. */
  protected readonly css = computed(() => `display: flex; flex-wrap: ${this.value()};`);
}
