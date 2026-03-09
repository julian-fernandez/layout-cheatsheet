import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

const OPTIONS = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];

@Component({
  selector: 'lc-justify-content-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="justify-content"
      description="Distributes space along the main axis. Controls where items are placed and how leftover space is shared between or around them."
      appliesTo="flex container"
      [cssOutput]="css()"
    >
      <lc-control-toggle
        controls
        label="justify-content"
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
export class JustifyContentDemoComponent {
  protected readonly options = OPTIONS;

  /** Currently selected justify-content value. */
  protected readonly value = signal('flex-start');

  // Only 3 boxes so space-between/space-around/space-evenly differences are clearly visible
  protected readonly boxes = [{}, {}, {}];

  /** Derives the container style applied to the preview flex container. */
  protected readonly containerStyle = computed(() => ({
    display: 'flex',
    'justify-content': this.value(),
    gap: '8px',
    padding: '12px',
    'align-items': 'center',
  }));

  /** Derives the CSS snippet shown in the code footer. */
  protected readonly css = computed(() => `display: flex; justify-content: ${this.value()};`);
}
