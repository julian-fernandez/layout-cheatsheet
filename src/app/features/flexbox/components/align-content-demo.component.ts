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

  /** Currently selected align-content value. */
  protected readonly value = signal('flex-start');

  // 6 items with a min-width so they wrap into at least two rows,
  // giving align-content space between rows to distribute.
  protected readonly boxes = [
    { style: { 'min-width': '90px', height: '40px' } },
    { style: { 'min-width': '90px', height: '40px' } },
    { style: { 'min-width': '90px', height: '40px' } },
    { style: { 'min-width': '90px', height: '40px' } },
    { style: { 'min-width': '90px', height: '40px' } },
    { style: { 'min-width': '90px', height: '40px' } },
  ];

  /**
   * flex-wrap: wrap is required — align-content has no effect on a single-line container.
   * min-height gives the container extra cross-axis space so spacing values are visible.
   */
  protected readonly containerStyle = computed(() => ({
    display: 'flex',
    'flex-wrap': 'wrap',
    'align-content': this.value(),
    gap: '8px',
    padding: '12px',
    'min-height': '220px',
  }));

  /** Derives the CSS snippet shown in the code footer. */
  protected readonly css = computed(
    () => `display: flex; flex-wrap: wrap; align-content: ${this.value()};`
  );
}
